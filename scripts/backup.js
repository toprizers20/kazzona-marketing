#!/usr/bin/env node

// Standalone backup script
// Usage: node scripts/backup.js [--scheduled|--pre-deploy|--manual]
//
// Can be run via:
//   CLI: node scripts/backup.js
//   Cron: node scripts/backup.js --scheduled
//   API: GET /api/cron/backup

const fs = require("fs");
const path = require("path");

const BACKUPS_DIR = path.join(process.cwd(), "ops", "backups");
const LOGS_DIR = path.join(process.cwd(), "ops", "logs");
const DB_PATH = path.join(process.cwd(), "prisma", "dev.db");
const MAX_BACKUPS = 20;

const triggerType = process.argv[2] || "manual";

function ensureDirs() {
  [BACKUPS_DIR, LOGS_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

function writeLog(level, message, meta) {
  ensureDirs();
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` | ${JSON.stringify(meta)}` : "";
  const line = `[${timestamp}] [BACKUP] [${level}] ${message}${metaStr}\n`;
  const logFile = path.join(LOGS_DIR, "backup.log");
  fs.appendFileSync(logFile, line, "utf-8");
  console.log(`[${level}] ${message}`);
}

function verifySQLiteFile(filepath) {
  try {
    if (!fs.existsSync(filepath)) return { ok: false, message: "File does not exist" };
    const stats = fs.statSync(filepath);
    if (stats.size === 0) return { ok: false, message: "File is empty" };

    const buffer = Buffer.alloc(16);
    const fd = fs.openSync(filepath, "r");
    fs.readSync(fd, buffer, 0, 16, 0);
    fs.closeSync(fd);

    const header = buffer.toString("utf-8", 0, 16);
    if (!header.startsWith("SQLite format 3")) {
      return { ok: false, message: "Not a valid SQLite file" };
    }

    return { ok: true, message: "Valid SQLite file" };
  } catch (err) {
    return { ok: false, message: `Verification error: ${err.message}` };
  }
}

function rotateBackups() {
  const files = fs.readdirSync(BACKUPS_DIR)
    .filter((f) => f.startsWith("backup-") && f.endsWith(".db"))
    .sort()
    .reverse();

  if (files.length <= MAX_BACKUPS) return;

  const toDelete = files.slice(MAX_BACKUPS);
  toDelete.forEach((file) => {
    const filepath = path.join(BACKUPS_DIR, file);
    fs.unlinkSync(filepath);
    writeLog("INFO", `Rotated old backup: ${file}`);
  });
}

function main() {
  ensureDirs();

  if (!fs.existsSync(DB_PATH)) {
    writeLog("ERROR", `Database file not found: ${DB_PATH}`);
    process.exit(1);
  }

  const filename = `backup-${getTimestamp()}.db`;
  const filepath = path.join(BACKUPS_DIR, filename);

  // Copy database
  fs.copyFileSync(DB_PATH, filepath);

  const stats = fs.statSync(filepath);
  const sizeBytes = stats.size;

  // Verify integrity
  const { ok, message } = verifySQLiteFile(filepath);

  if (!ok) {
    fs.unlinkSync(filepath);
    writeLog("ERROR", `Backup failed integrity check: ${message}`, { filename, triggerType });
    process.exit(1);
  }

  writeLog("SUCCESS", `Backup created: ${filename} (${formatSize(sizeBytes)})`, {
    filename,
    triggerType,
    sizeBytes,
    integrity: message,
  });

  // Rotate old backups
  rotateBackups();

  console.log(`\n✅ Backup complete: ${filename} (${formatSize(sizeBytes)})`);
}

main();
