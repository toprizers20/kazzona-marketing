import fs from "fs";
import path from "path";
import { execFile, spawn } from "child_process";
import { promisify } from "util";
import { prisma } from "@/lib/db";
import { backupLog, restoreLog } from "./logger";

const execFileAsync = promisify(execFile);
const BACKUPS_DIR = path.join(process.cwd(), "ops", "backups");
const MAX_BACKUPS = 20;

function ensureBackupsDir() {
  if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  }
}

function getTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

function parseDatabaseUrl(): { host: string; port: string; user: string; password: string; database: string } {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
  
  const regex = /mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
  const match = url.match(regex);
  if (!match) throw new Error("Invalid DATABASE_URL format. Expected: mysql://user:password@host:port/database");
  
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: match[4],
    database: match[5],
  };
}

export interface BackupResult {
  success: boolean;
  filename?: string;
  filepath?: string;
  sizeBytes?: number;
  integrityOk?: boolean;
  integrityMsg?: string;
  error?: string;
}

export async function createBackup(triggerType: string = "manual"): Promise<BackupResult> {
  ensureBackupsDir();

  const filename = `backup-${getTimestamp()}.sql`;
  const filepath = path.join(BACKUPS_DIR, filename);

  try {
    const db = parseDatabaseUrl();

    // Run mysqldump using execFile to prevent command injection
    // Use MYSQL_PWD env var to avoid password visible in ps output
    const { stdout } = await execFileAsync("mysqldump", [
      "-h", db.host,
      "-P", db.port,
      "-u", db.user,
      db.database,
      "--single-transaction",
      "--routines",
      "--triggers",
    ], { timeout: 120000, maxBuffer: 50 * 1024 * 1024, env: { ...process.env, MYSQL_PWD: db.password } });

    // Write dump output to file
    fs.writeFileSync(filepath, stdout, "utf-8");

    // Get file size
    const stats = fs.statSync(filepath);
    const sizeBytes = stats.size;

    if (sizeBytes === 0) {
      fs.unlinkSync(filepath);
      return { success: false, error: "Backup file is empty" };
    }

    // Verify integrity — check file starts with valid SQL comments
    const { ok: integrityOk, message: integrityMsg } = verifyBackupFile(filepath);

    if (!integrityOk) {
      fs.unlinkSync(filepath);
      backupLog("ERROR", `Backup created but failed integrity check: ${integrityMsg}`, {
        filename,
        triggerType,
      });
      return { success: false, error: `Integrity check failed: ${integrityMsg}` };
    }

    // Save to database
    const log = await prisma.backupLog.create({
      data: {
        filename,
        filepath,
        sizeBytes,
        integrityOk: true,
        integrityMsg,
        triggerType,
        status: "verified",
      },
    });

    backupLog("SUCCESS", `Backup created and verified: ${filename} (${(sizeBytes / 1024 / 1024).toFixed(2)}MB)`, {
      backupId: log.id,
      triggerType,
      sizeBytes,
    });

    // Rotate old backups
    await rotateBackups();

    return { success: true, filename, filepath, sizeBytes, integrityOk: true, integrityMsg };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    backupLog("ERROR", `Backup failed: ${message}`, { triggerType });
    // Clean up empty file if created
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath);
      if (stats.size === 0) fs.unlinkSync(filepath);
    }
    return { success: false, error: message };
  }
}

function verifyBackupFile(filepath: string): { ok: boolean; message: string } {
  try {
    if (!fs.existsSync(filepath)) {
      return { ok: false, message: "File does not exist" };
    }
    const stats = fs.statSync(filepath);
    if (stats.size === 0) {
      return { ok: false, message: "File is empty" };
    }

    // Read first 500 bytes to check for mysqldump header
    const fd = fs.openSync(filepath, "r");
    const buffer = Buffer.alloc(500);
    fs.readSync(fd, buffer, 0, 500, 0);
    fs.closeSync(fd);

    const header = buffer.toString("utf-8", 0, 500);
    
    // mysqldump files typically start with comments like "-- MySQL dump" or "-- Host:"
    if (header.includes("-- MySQL dump") || header.includes("-- Host:") || header.includes("CREATE TABLE") || header.includes("INSERT INTO")) {
      return { ok: true, message: "Valid MySQL dump, integrity OK" };
    }

    return { ok: false, message: "Not a valid MySQL dump file" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, message: `Verification error: ${message}` };
  }
}

export async function verifyBackup(backupId: string): Promise<{ ok: boolean; message: string }> {
  const backup = await prisma.backupLog.findUnique({ where: { id: backupId } });
  if (!backup) return { ok: false, message: "Backup not found" };

  const result = verifyBackupFile(backup.filepath);

  await prisma.backupLog.update({
    where: { id: backupId },
    data: { integrityOk: result.ok, integrityMsg: result.message },
  });

  return result;
}

export async function listBackups(limit: number = MAX_BACKUPS) {
  return prisma.backupLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function rotateBackups() {
  const backups = await prisma.backupLog.findMany({
    orderBy: { createdAt: "desc" },
    where: { status: { not: "deleted" } },
  });

  if (backups.length <= MAX_BACKUPS) return;

  const toDelete = backups.slice(MAX_BACKUPS);

  for (const backup of toDelete) {
    try {
      if (fs.existsSync(backup.filepath)) {
        fs.unlinkSync(backup.filepath);
      }
      await prisma.backupLog.update({
        where: { id: backup.id },
        data: { status: "deleted" },
      });
      backupLog("INFO", `Rotated old backup: ${backup.filename}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      backupLog("WARN", `Failed to delete old backup ${backup.filename}: ${message}`);
    }
  }
}

export async function restoreBackup(filename: string): Promise<{ success: boolean; error?: string }> {
  const backup = await prisma.backupLog.findFirst({
    where: { filename, status: { not: "deleted" } },
  });

  if (!backup) {
    return { success: false, error: "Backup not found" };
  }

  if (!fs.existsSync(backup.filepath)) {
    return { success: false, error: "Backup file missing from disk" };
  }

  // Verify integrity before restore
  const { ok } = verifyBackupFile(backup.filepath);
  if (!ok) {
    return { success: false, error: "Backup file is corrupt, cannot restore" };
  }

  try {
    const db = parseDatabaseUrl();

    // Create a pre-restore backup
    const preRestoreFilename = `pre-restore-${getTimestamp()}.sql`;
    const preRestorePath = path.join(BACKUPS_DIR, preRestoreFilename);
    const { stdout: preRestoreDump } = await execFileAsync("mysqldump", [
      "-h", db.host,
      "-P", db.port,
      "-u", db.user,
      db.database,
      "--single-transaction",
      "--routines",
      "--triggers",
    ], { timeout: 120000, maxBuffer: 50 * 1024 * 1024, env: { ...process.env, MYSQL_PWD: db.password } });
    fs.writeFileSync(preRestorePath, preRestoreDump, "utf-8");

    // Restore the backup — use spawn with stdin pipe to avoid shell injection
    // Use MYSQL_PWD env var to avoid password visible in ps output
    await new Promise<void>((resolve, reject) => {
      const child = spawn("mysql", [
        "-h", db.host,
        "-P", db.port,
        "-u", db.user,
        db.database,
      ], { timeout: 120000, env: { ...process.env, MYSQL_PWD: db.password } });

      child.stdin.write(fs.readFileSync(backup.filepath, "utf-8"));
      child.stdin.end();

      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`mysql exited with code ${code}`));
      });
      child.on("error", reject);
    });

    restoreLog("SUCCESS", `Restored from backup: ${filename}`, {
      preRestoreBackup: preRestoreFilename,
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    restoreLog("ERROR", `Restore failed: ${message}`, { filename });
    return { success: false, error: message };
  }
}

export async function getBackupStats() {
  const total = await prisma.backupLog.count({ where: { status: { not: "deleted" } } });
  const lastBackup = await prisma.backupLog.findFirst({
    where: { status: { not: "deleted" } },
    orderBy: { createdAt: "desc" },
  });
  const lastDeploy = await prisma.deployLog.findFirst({
    orderBy: { startedAt: "desc" },
  });

  return {
    totalBackups: total,
    lastBackupTime: lastBackup?.createdAt || null,
    lastBackupFile: lastBackup?.filename || null,
    lastDeployStatus: lastDeploy?.status || null,
    lastDeployTime: lastDeploy?.startedAt || null,
  };
}
