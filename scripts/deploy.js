#!/usr/bin/env node

/**
 * Safe deployment script with backup + rollback
 *
 * Workflow:
 *   1. Verify on development branch
 *   2. Create pre-deploy backup
 *   3. Push development
 *   4. Merge to main
 *   5. Build verification
 *   6. Push main (triggers Hostinger)
 *   7. Health check
 *   8. Auto-rollback on failure
 *   9. Switch back to development
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const LOGS_DIR = path.join(process.cwd(), "ops", "logs");
const BACKUPS_DIR = path.join(process.cwd(), "ops", "backups");
const SITE_URL = process.env.SITE_URL || "https://kazzona.com";

function ensureDirs() {
  [LOGS_DIR, BACKUPS_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

function writeLog(level, message) {
  ensureDirs();
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [DEPLOY] [${level}] ${message}\n`;
  fs.appendFileSync(path.join(LOGS_DIR, "deploy.log"), line, "utf-8");
  console.log(`[${level}] ${message}`);
}

function run(command) {
  writeLog("INFO", `Running: ${command}`);
  return execSync(command, { stdio: "inherit", encoding: "utf-8" });
}

function runSilent(command) {
  try {
    return execSync(command, { encoding: "utf-8" }).trim();
  } catch {
    return null;
  }
}

function createPreDeployBackup() {
  ensureDirs();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `pre-deploy-${timestamp}.db`;
  const filepath = path.join(BACKUPS_DIR, filename);
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");

  if (!fs.existsSync(dbPath)) {
    writeLog("WARN", "Database file not found, skipping pre-deploy backup");
    return null;
  }

  fs.copyFileSync(dbPath, filepath);
  const size = fs.statSync(filepath).size;
  writeLog("SUCCESS", `Pre-deploy backup created: ${filename} (${(size / 1024 / 1024).toFixed(2)}MB)`);
  return filename;
}

function checkHealth() {
  return new Promise((resolve) => {
    const client = SITE_URL.startsWith("https") ? https : http;
    const req = client.get(SITE_URL, { timeout: 15000 }, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ ok: res.statusCode === 200 && body.length > 100, status: res.statusCode }));
    });
    req.on("error", () => resolve({ ok: false, status: 0 }));
    req.on("timeout", () => { req.destroy(); resolve({ ok: false, status: 0 }); });
  });
}

function rollback(fromBranch, backupFilename) {
  writeLog("WARN", "Initiating rollback...");

  try {
    // Revert the merge on main
    runSilent("git checkout main");
    runSilent("git revert --no-edit HEAD");
    runSilent("git push origin main");
    writeLog("SUCCESS", "Code rolled back on main");

    // Restore database if backup exists
    if (backupFilename) {
      const backupPath = path.join(BACKUPS_DIR, backupFilename);
      const dbPath = path.join(process.cwd(), "prisma", "dev.db");
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, dbPath);
        writeLog("SUCCESS", "Database restored from pre-deploy backup");
      }
    }

    // Switch back to development
    runSilent("git checkout development");
    writeLog("SUCCESS", "Rollback complete, back on development branch");
  } catch (err) {
    writeLog("ERROR", `Rollback failed: ${err.message}`);
  }
}

async function main() {
  console.log("\n🚀 Starting Safe Deployment Pipeline...\n");

  // 1. Verify branch
  const currentBranch = runSilent("git branch --show-current");
  if (currentBranch !== "development") {
    writeLog("ERROR", `Must be on 'development' branch. Currently on: ${currentBranch}`);
    process.exit(1);
  }

  // 2. Check clean working directory
  const rawStatus = runSilent("git status --porcelain");
  const ignored = [".env", "prisma/dev.db", "ops/"];
  const remaining = rawStatus
    .split("\n")
    .filter(Boolean)
    .filter((line) => !ignored.some((item) => line.includes(item)));

  if (remaining.length > 0) {
    writeLog("ERROR", "Uncommitted changes found:");
    remaining.forEach((line) => console.log(`  ${line}`));
    process.exit(1);
  }

  // 3. Pre-deploy backup
  writeLog("INFO", "Step 1: Creating pre-deploy backup...");
  const backupFilename = createPreDeployBackup();

  // 4. Merge to main
  writeLog("INFO", "Step 2: Merging development → main...");
  run("git checkout main");
  run("git merge development --no-edit");

  // 5. Build verification
  writeLog("INFO", "Step 3: Running build verification...");
  try {
    run("npm run build");
    writeLog("SUCCESS", "Build passed");
  } catch (err) {
    writeLog("ERROR", "Build failed, rolling back...");
    rollback("development", backupFilename);
    process.exit(1);
  }

  // 6. Push main (if remote configured)
  writeLog("INFO", "Step 4: Pushing main (triggers Hostinger)...");
  try {
    run("git push origin main");
  } catch {
    writeLog("WARN", "No remote configured. Skipping push.");
  }

  // 8. Health check (wait 30s for deployment)
  writeLog("INFO", "Step 6: Waiting 30s for deployment, then running health check...");
  await new Promise((resolve) => setTimeout(resolve, 30000));

  const health = await checkHealth();
  if (!health.ok) {
    writeLog("ERROR", `Health check failed (HTTP ${health.status}), rolling back...`);
    rollback("development", backupFilename);
    process.exit(1);
  }

  writeLog("SUCCESS", `Health check passed (HTTP ${health.status})`);

  // 9. Switch back
  runSilent("git checkout development");
  writeLog("SUCCESS", "✅ Deployment complete! Production is live.");

  console.log("\n✅ Deployment successful! Hostinger is now serving from main.\n");
}

main().catch((err) => {
  writeLog("ERROR", `Deploy pipeline error: ${err.message}`);
  try { runSilent("git checkout development"); } catch {}
  process.exit(1);
});
