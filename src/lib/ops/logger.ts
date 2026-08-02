import fs from "fs";
import path from "path";

const LOGS_DIR = path.join(process.cwd(), "ops", "logs");

type LogLevel = "INFO" | "WARN" | "ERROR" | "SUCCESS";
type LogCategory = "BACKUP" | "DEPLOY" | "RESTORE" | "SYSTEM";

function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

function formatTimestamp(): string {
  return new Date().toISOString();
}

function formatLogLine(category: LogCategory, level: LogLevel, message: string, meta?: Record<string, any>): string {
  const timestamp = formatTimestamp();
  const metaStr = meta ? ` | ${JSON.stringify(meta)}` : "";
  return `[${timestamp}] [${category}] [${level}] ${message}${metaStr}`;
}

export function writeLog(
  logFile: string,
  category: LogCategory,
  level: LogLevel,
  message: string,
  meta?: Record<string, any>
) {
  ensureLogsDir();
  const line = formatLogLine(category, level, message, meta);
  const logPath = path.join(LOGS_DIR, logFile);
  fs.appendFileSync(logPath, line + "\n", "utf-8");
}

export function readLogs(logFile: string, limit: number = 100): string[] {
  const logPath = path.join(LOGS_DIR, logFile);
  if (!fs.existsSync(logPath)) return [];
  const content = fs.readFileSync(logPath, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines.slice(-limit);
}

export function backupLog(level: LogLevel, message: string, meta?: Record<string, any>) {
  writeLog("backup.log", "BACKUP", level, message, meta);
}

export function deployLog(level: LogLevel, message: string, meta?: Record<string, any>) {
  writeLog("deploy.log", "DEPLOY", level, message, meta);
}

export function restoreLog(level: LogLevel, message: string, meta?: Record<string, any>) {
  writeLog("backup.log", "RESTORE", level, message, meta);
}

export function systemLog(level: LogLevel, message: string, meta?: Record<string, any>) {
  writeLog("deploy.log", "SYSTEM", level, message, meta);
}
