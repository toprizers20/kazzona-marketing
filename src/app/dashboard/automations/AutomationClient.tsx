"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Upload, AlertCircle, Play, Settings2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { getAutopilotConfig, updateAutopilotConfig, triggerAutopilotInstant, AutopilotConfig } from "@/app/actions/autopilot";
import { format } from "date-fns";

export default function AutomationClient() {
  const router = useRouter();
  const [config, setConfig] = useState<AutopilotConfig | null>(null);
  
  // CSV state
  const [csvData, setCsvData] = useState("");
  const [csvLoading, setCsvLoading] = useState(false);
  
  // Action states
  const [saveLoading, setSaveLoading] = useState(false);
  const [triggerLoading, setTriggerLoading] = useState(false);
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);
  const [customFreqMode, setCustomFreqMode] = useState(false);
  const [logs, setLogs] = useState<{time: string, text: string, type: "info"|"success"|"error"}[]>([]);

  // Load configuration on mount
  useEffect(() => {
    async function loadConfig() {
      const cfg = await getAutopilotConfig();
      setConfig(cfg);
    }
    loadConfig();
  }, []);

  // Background daemon for Autopilot execution
  useEffect(() => {
    if (!config || !config.enabled) return;

    let isProcessing = false;
    const interval = setInterval(async () => {
      if (isProcessing) return; // Prevent overlapping runs
      isProcessing = true;
      try {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-10), { time, text: "Triggering blog generation...", type: "info" }]);
        
        const res = await triggerAutopilotInstant();
        const cfg = await getAutopilotConfig();
        setConfig(cfg);
        
        const finishTime = new Date().toLocaleTimeString();
        if (res?.success) {
          setLogs(prev => [...prev.slice(-10), { time: finishTime, text: `Successfully generated: ${res.topic}`, type: "success" }]);
        } else {
          setLogs(prev => [...prev.slice(-10), { time: finishTime, text: `Error: ${res?.error || "Generation failed"}`, type: "error" }]);
        }
        
        router.refresh();
      } catch (err: any) {
        setLogs(prev => [...prev.slice(-10), { time: new Date().toLocaleTimeString(), text: `Critical Error: ${err.message}`, type: "error" }]);
      } finally {
        isProcessing = false;
      }
    }, config.intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [config?.enabled, config?.intervalSeconds, router]);

  const handleImport = async () => {
    if (!csvData.trim()) return;
    setCsvLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/automations/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: "success", text: `Successfully imported ${data.count} tasks!` });
        setCsvData("");
        router.refresh();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to import tasks" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setCsvLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const csvText = XLSX.utils.sheet_to_csv(firstSheet);
      setCsvData(csvText);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          setCsvData(text);
        }
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  const downloadAutomationTemplate = () => {
    const wsData = [
      ["Topic", "Keyword", "Instructions", "Type", "Timing"],
      ["Best Digital Marketing Agency in Delhi", "digital marketing|delhi", "Focus on local SEO benefits", "BLOG", "17:00:00 : 01:07:2026"],
      ["Top 10 SEO Tips for 2026", "SEO tips 2026", "Add 5 practical tips for beginners", "BLOG", "10:30:00 : 02:07:2026"],
      ["Web Development Services", "web development|india", "Highlight React and Next.js expertise", "PAGE", ""],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Schedule");
    XLSX.writeFile(wb, "Kazzona_Automation_Schedule_Template.xlsx");
  };

  const handleToggleAutopilot = async (enabled: boolean) => {
    if (!config) return;
    setSaveLoading(true);
    setMessage(null);
    const res = await updateAutopilotConfig({ enabled });
    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setConfig(res.config || null);
      setMessage({ type: "success", text: `Autopilot ${enabled ? 'enabled' : 'disabled'} successfully!` });
    }
    setSaveLoading(false);
  };

  const handleUpdateFrequency = async (seconds: number) => {
    if (!config) return;
    setSaveLoading(true);
    setMessage(null);
    const res = await updateAutopilotConfig({ intervalSeconds: seconds });
    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setConfig(res.config || null);
      setMessage({ type: "success", text: `Autopilot frequency updated successfully!` });
    }
    setSaveLoading(false);
  };

  const handleTriggerInstant = async () => {
    setTriggerLoading(true);
    setMessage(null);
    const res = await triggerAutopilotInstant();
    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setMessage({ type: "success", text: `Successfully generated blog post: "${res.topic}"!` });
      // Reload config to get updated history
      const cfg = await getAutopilotConfig();
      setConfig(cfg);
      router.refresh();
    }
    setTriggerLoading(false);
  };

  if (!config) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="animate-pulse text-muted-foreground">Loading configurations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-start gap-3 transition-all duration-300 ${message.type === 'error' ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Autopilot config card */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              Autopilot Poster Settings
            </CardTitle>
            <CardDescription>Configure AI Autopilot niche blog posting settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Start / Stop Button & Logs */}
            <div className="p-4 bg-secondary/10 border border-border/30 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-500" />
                    Background Generation Daemon
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Start this to keep generating blogs continuously every X minutes without freezing your screen.</p>
                </div>
                <button
                  onClick={() => handleToggleAutopilot(!config.enabled)}
                  disabled={saveLoading}
                  className={`px-6 py-2 rounded-lg font-bold shadow-lg transition-all ${
                    config.enabled
                      ? "bg-destructive/10 text-destructive hover:bg-destructive/20 shadow-destructive/20"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
                  }`}
                >
                  {saveLoading ? "Loading..." : config.enabled ? "Stop Daemon" : "Start Daemon"}
                </button>
              </div>

              {/* Running Logs UI */}
              <div className="bg-black/80 rounded-lg p-4 font-mono text-xs overflow-hidden h-40 flex flex-col justify-end relative shadow-inner">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-center">Daemon is idle. Waiting to start...</p>
                ) : (
                  <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex flex-col justify-end min-h-full">
                    {logs.map((log, i) => (
                      <div key={i} className={`flex items-start gap-2 ${log.type === "error" ? "text-red-400" : log.type === "success" ? "text-emerald-400" : "text-gray-300"}`}>
                        <span className="text-gray-500 shrink-0">[{log.time}]</span>
                        <span>{log.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                {config.enabled && (
                  <div className="absolute top-2 right-3 flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] text-emerald-500 font-bold tracking-wider uppercase">Running</span>
                  </div>
                )}
              </div>
            </div>

            {/* Frequency Dropdown */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Posting Frequency</label>
              <div className="flex flex-col gap-2">
                <select
                  value={
                    customFreqMode
                      ? "custom"
                      : [5, 60, 3600, 43200, 86400, 172800, 432000].includes(config.intervalSeconds)
                        ? config.intervalSeconds
                        : "custom"
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "custom") {
                      setCustomFreqMode(true);
                    } else {
                      setCustomFreqMode(false);
                      handleUpdateFrequency(Number(val));
                    }
                  }}
                  disabled={saveLoading || config.enabled}
                  className="w-full bg-secondary/15 border border-border/40 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer disabled:opacity-50"
                >
                  <option value={5}>5 Seconds (Demo / Testing)</option>
                  <option value={60}>1 Minute (Testing)</option>
                  <option value={3600}>Every 1 Hour</option>
                  <option value={43200}>Every 12 Hours</option>
                  <option value={86400}>Every 24 Hours</option>
                  <option value={172800}>Every 2 Days</option>
                  <option value={432000}>Every 5 Days</option>
                  <option value="custom">Custom (Minutes)</option>
                </select>
                {customFreqMode && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      defaultValue={Math.round(config.intervalSeconds / 60)}
                      className="flex-1 bg-secondary/15 border border-border/40 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter minutes (e.g. 500)"
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                        const mins = Number(input?.value);
                        if (mins > 0) handleUpdateFrequency(mins * 60);
                      }}
                      disabled={saveLoading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {saveLoading ? "..." : "Set"}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Trigger instant generation */}
            <div className="pt-2">
              <Button 
                onClick={handleTriggerInstant} 
                disabled={triggerLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 py-5"
              >
                <Play className={`w-4 h-4 ${triggerLoading ? 'animate-spin' : ''}`} />
                {triggerLoading ? "Generating Niche Blog..." : "Instant Autopilot Generate Now"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CSV / Excel Scheduler */}
        <Card className="bg-card border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Import CSV / Excel Schedule
            </CardTitle>
            <CardDescription>Select a CSV or Excel file from your computer or paste records below (Topic, Keyword, Instructions, Type, Timing).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <input 
                type="file" 
                accept=".csv,.xlsx,.xls" 
                id="csv-upload" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
              <label htmlFor="csv-upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-primary/30 hover:bg-primary/10 text-primary transition-colors">
                <Upload className="w-4 h-4" />
                Select File from PC
              </label>
              <button
                onClick={downloadAutomationTemplate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-border/40 hover:bg-secondary/20 text-muted-foreground transition-colors"
              >
                Download Demo Template
              </button>
              <span className="text-xs text-muted-foreground">Or paste records below</span>
            </div>
            
            <Textarea 
              placeholder={"Topic, Keyword, Instructions, Type, Timing\nDigital Marketing Agency, agency|delhi, focus on local SEO, BLOG, 17:00:00 : 01:07:2026\nTop 10 SEO Tips, SEO tips 2026, add 5 tips for beginners, BLOG, 10:30:00 : 02:07:2026"}
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="font-mono text-xs h-32 bg-secondary/10"
            />
            <p className="text-[10px] text-muted-foreground">
              Time format: <code className="bg-secondary/30 px-1 py-0.5 rounded">HH:mm:ss : DD:MM:YYYY</code> — If timing is blank, blogs auto-schedule 1 hour apart.
            </p>
            <Button 
              onClick={handleImport} 
              disabled={csvLoading || !csvData.trim()}
              className="w-full bg-secondary/20 hover:bg-secondary/35 text-foreground border border-border/40"
            >
              {csvLoading ? "Importing Tasks..." : "Upload Schedule"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Autopilot History logs */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Autopilot Execution History
          </CardTitle>
          <CardDescription>Recent articles automatically generated by the background daemon.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-secondary/20 uppercase border-b border-border/40">
                <tr>
                  <th className="px-4 py-3 font-medium">Generated Content</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Primary Keyword</th>
                  <th className="px-4 py-3 font-medium">Secondary Keywords</th>
                  <th className="px-4 py-3 font-medium">Run Timestamp</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {config.history.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No autopilot runs executed yet. Toggle autopilot or trigger a run above to start logs.
                    </td>
                  </tr>
                ) : (
                  config.history.map((run, idx) => (
                    <tr key={idx} className="hover:bg-secondary/10 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        {run.slug ? (
                          <Link href={`/blog/${run.slug}`} target="_blank" className="hover:text-primary transition-colors hover:underline">
                            {run.topic}
                          </Link>
                        ) : (
                          <span>{run.topic}</span>
                        )}
                        {run.error && <p className="text-xs text-destructive mt-1 font-mono">{run.error}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          {run.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs font-mono max-w-[150px] truncate" title={run.primaryKeyword || "-"}>
                        {run.primaryKeyword || "-"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate" title={run.secondaryKeyword || "-"}>
                        {run.secondaryKeyword || "-"}
                      </td>
                      <td suppressHydrationWarning className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                        {format(new Date(run.timestamp), "MMM d, yyyy h:mm:ss a")}
                      </td>
                      <td className="px-4 py-3">
                        {run.status === 'COMPLETED' ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Success
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-destructive font-medium">
                            <XCircle className="w-3.5 h-3.5" /> Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
