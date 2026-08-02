"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Database,
  RefreshCw,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackupEntry {
  id: string;
  filename: string;
  sizeBytes: number;
  integrityOk: boolean;
  integrityMsg: string | null;
  triggerType: string;
  status: string;
  createdAt: string;
}

interface BackupStats {
  totalBackups: number;
  lastBackupTime: string | null;
  lastBackupFile: string | null;
  lastDeployStatus: string | null;
  lastDeployTime: string | null;
}

export default function OpsDashboardClient() {
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [backups, setBackups] = useState<BackupEntry[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [backupLoading, setBackupLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"backups" | "logs">("backups");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [backupRes, logRes] = await Promise.all([
        fetch("/api/ops/backup"),
        fetch("/api/ops/logs?type=backup&limit=50"),
      ]);
      const backupData = await backupRes.json();
      const logData = await logRes.json();

      if (backupRes.ok) {
        setStats(backupData.stats);
        setBackups(backupData.backups);
      }
      if (logRes.ok) {
        setLogs(logData.logs.reverse());
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to fetch data" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBackup = async () => {
    setBackupLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/ops/backup", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: `Backup created: ${data.filename}` });
        fetchData();
      } else {
        setMessage({ type: "error", text: data.error || "Backup failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
    setBackupLoading(false);
  };

  const handleRestore = async (filename: string) => {
    setRestoreLoading(filename);
    setMessage(null);
    try {
      const res = await fetch("/api/ops/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: `Restored from ${filename}. Server restart may be needed.` });
        fetchData();
      } else {
        setMessage({ type: "error", text: data.error || "Restore failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
    setRestoreLoading(null);
    setConfirmRestore(null);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const triggerLabel: Record<string, string> = {
    manual: "Manual",
    scheduled: "Scheduled",
    "pre-deploy": "Pre-Deploy",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-heading font-bold">Ops Dashboard</h1>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="w-4 h-4 inline mr-2" /> : <XCircle className="w-4 h-4 inline mr-2" />}
          {message.text}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/40">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Database className="w-4 h-4" /> Total Backups
          </div>
          <div className="text-2xl font-bold">{stats?.totalBackups ?? "—"}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/40">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Clock className="w-4 h-4" /> Last Backup
          </div>
          <div className="text-sm font-medium">
            {stats?.lastBackupTime ? formatDate(stats.lastBackupTime) : "Never"}
          </div>
          {stats?.lastBackupFile && (
            <div className="text-xs text-muted-foreground mt-1 truncate">{stats.lastBackupFile}</div>
          )}
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/40">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Upload className="w-4 h-4" /> Last Deploy
          </div>
          <div className="text-sm font-medium">
            {stats?.lastDeployTime ? formatDate(stats.lastDeployTime) : "Never"}
          </div>
          {stats?.lastDeployStatus && (
            <div className={`text-xs mt-1 font-semibold ${
              stats.lastDeployStatus === "success" ? "text-emerald-500" :
              stats.lastDeployStatus === "failed" ? "text-destructive" : "text-muted-foreground"
            }`}>
              {stats.lastDeployStatus}
            </div>
          )}
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/40 flex flex-col justify-center">
          <Button
            onClick={handleCreateBackup}
            disabled={backupLoading}
            className="w-full"
          >
            {backupLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {backupLoading ? "Creating..." : "Create Backup Now"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/40 pb-2">
        <button
          onClick={() => setActiveTab("backups")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "backups" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Database className="w-4 h-4 inline mr-1" /> Backups
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "logs" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4 inline mr-1" /> Logs
        </button>
      </div>

      {/* Backups Table */}
      {activeTab === "backups" && (
        <div className="bg-card border border-border/40 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              <RefreshCw className="w-5 h-5 animate-spin inline mr-2" /> Loading...
            </div>
          ) : backups.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No backups yet</div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-3 font-medium text-muted-foreground">Filename</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Size</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Trigger</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Created</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backups.map((b) => (
                      <tr key={b.id} className="border-b border-border/20 hover:bg-secondary/30">
                        <td className="p-3 font-mono text-xs">{b.filename}</td>
                        <td className="p-3">{formatSize(b.sizeBytes)}</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            b.triggerType === "scheduled" ? "bg-blue-500/10 text-blue-500" :
                            b.triggerType === "pre-deploy" ? "bg-amber-500/10 text-amber-500" :
                            "bg-secondary text-muted-foreground"
                          }`}>
                            {triggerLabel[b.triggerType] || b.triggerType}
                          </span>
                        </td>
                        <td className="p-3">
                          {b.integrityOk ? (
                            <span className="text-xs text-emerald-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="text-xs text-destructive flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Failed
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">{formatDate(b.createdAt)}</td>
                        <td className="p-3 text-right">
                          {confirmRestore === b.id ? (
                            <div className="flex items-center gap-2 justify-end">
                              <span className="text-xs text-muted-foreground">Restore?</span>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRestore(b.id)}
                                disabled={restoreLoading === b.id}
                              >
                                {restoreLoading === b.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Yes"}
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setConfirmRestore(null)}>
                                No
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setConfirmRestore(b.id)}
                              disabled={b.status === "deleted"}
                            >
                              <RefreshCw className="w-3 h-3 mr-1" /> Restore
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-border/20">
                {backups.map((b) => (
                  <div key={b.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-mono text-xs truncate min-w-0">{b.filename}</div>
                      <div className="shrink-0">
                        {b.integrityOk ? (
                          <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-xs text-destructive flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Failed
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatSize(b.sizeBytes)}</span>
                      <span>·</span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        b.triggerType === "scheduled" ? "bg-blue-500/10 text-blue-500" :
                        b.triggerType === "pre-deploy" ? "bg-amber-500/10 text-amber-500" :
                        "bg-secondary text-muted-foreground"
                      }`}>
                        {triggerLabel[b.triggerType] || b.triggerType}
                      </span>
                      <span>·</span>
                      <span>{formatDate(b.createdAt)}</span>
                    </div>
                    <div className="flex justify-end">
                      {confirmRestore === b.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Restore?</span>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRestore(b.id)}
                            disabled={restoreLoading === b.id}
                          >
                            {restoreLoading === b.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Yes"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setConfirmRestore(null)}>
                            No
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmRestore(b.id)}
                          disabled={b.status === "deleted"}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" /> Restore
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Logs */}
      {activeTab === "logs" && (
        <div className="bg-card border border-border/40 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Backup Logs</h3>
            <Button size="sm" variant="outline" onClick={fetchData}>
              <RefreshCw className="w-3 h-3 mr-1" /> Refresh
            </Button>
          </div>
          <div className="bg-background rounded-lg p-4 max-h-[500px] overflow-y-auto font-mono text-xs space-y-1">
            {logs.length === 0 ? (
              <div className="text-muted-foreground">No logs yet</div>
            ) : (
              logs.map((line, i) => (
                <div key={i} className={`${
                  line.includes("[ERROR]") ? "text-destructive" :
                  line.includes("[SUCCESS]") ? "text-emerald-500" :
                  line.includes("[WARN]") ? "text-amber-500" :
                  "text-muted-foreground"
                }`}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
