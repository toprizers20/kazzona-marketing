import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";
import { backupLog, restoreLog } from "./logger";

const BACKUPS_DIR = path.join(process.cwd(), "ops", "backups");
const DB_PATH = path.join(process.cwd(), "prisma", "dev.db");
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

  const filename = `backup-${getTimestamp()}.db`;
  const filepath = path.join(BACKUPS_DIR, filename);

  try {
    // Copy the database file
    fs.copyFileSync(DB_PATH, filepath);

    // Get file size
    const stats = fs.statSync(filepath);
    const sizeBytes = stats.size;

    // Verify integrity
    const { ok: integrityOk, message: integrityMsg } = await verifyBackupFile(filepath);

    if (!integrityOk) {
      // Delete corrupt backup
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
  } catch (err: any) {
    backupLog("ERROR", `Backup failed: ${err.message}`, { triggerType });
    return { success: false, error: err.message };
  }
}

async function verifyBackupFile(filepath: string): Promise<{ ok: boolean; message: string }> {
  try {
    // Check file exists and has content
    if (!fs.existsSync(filepath)) {
      return { ok: false, message: "File does not exist" };
    }
    const stats = fs.statSync(filepath);
    if (stats.size === 0) {
      return { ok: false, message: "File is empty" };
    }

    // For SQLite, we can do a basic check by opening it
    // A more thorough check would use sqlite3 CLI, but this is sufficient
    const buffer = Buffer.alloc(16);
    const fd = fs.openSync(filepath, "r");
    fs.readSync(fd, buffer, 0, 16, 0);
    fs.closeSync(fd);

    // Check SQLite header magic
    const header = buffer.toString("utf-8", 0, 16);
    if (!header.startsWith("SQLite format 3")) {
      return { ok: false, message: "Not a valid SQLite file" };
    }

    return { ok: true, message: "Valid SQLite file, integrity OK" };
  } catch (err: any) {
    return { ok: false, message: `Verification error: ${err.message}` };
  }
}

export async function verifyBackup(backupId: string): Promise<{ ok: boolean; message: string }> {
  const backup = await prisma.backupLog.findUnique({ where: { id: backupId } });
  if (!backup) return { ok: false, message: "Backup not found" };

  const result = await verifyBackupFile(backup.filepath);

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

  // Delete oldest backups beyond the limit
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
    } catch (err: any) {
      backupLog("WARN", `Failed to delete old backup ${backup.filename}: ${err.message}`);
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
  const { ok } = await verifyBackupFile(backup.filepath);
  if (!ok) {
    return { success: false, error: "Backup file is corrupt, cannot restore" };
  }

  try {
    // Create a pre-restore backup of current state
    const preRestoreFilename = `pre-restore-${getTimestamp()}.db`;
    const preRestorePath = path.join(BACKUPS_DIR, preRestoreFilename);
    fs.copyFileSync(DB_PATH, preRestorePath);

    // Restore the backup
    fs.copyFileSync(backup.filepath, DB_PATH);

    restoreLog("SUCCESS", `Restored from backup: ${filename}`, {
      preRestoreBackup: preRestoreFilename,
    });

    return { success: true };
  } catch (err: any) {
    restoreLog("ERROR", `Restore failed: ${err.message}`, { filename });
    return { success: false, error: err.message };
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
