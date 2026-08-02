"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Clock, CheckCircle, XCircle, Play, Settings2, CalendarIcon, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { rescheduleTask, triggerAutopilotInstant } from "@/app/actions/autopilot";

interface Task {
  id: string;
  topic: string;
  type: string;
  keyword: string | null;
  instructions: string | null;
  targetDate: string;
  status: string;
}

export default function ScheduledTasksClient({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState("");
  const [triggerLoading, setTriggerLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleReschedule = async (taskId: string) => {
    if (!dateValue) return;
    setMessage(null);
    const res = await rescheduleTask(taskId, dateValue);
    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setMessage({ type: "success", text: "Task rescheduled successfully!" });
      setEditingTaskId(null);
      setDateValue("");
      router.refresh();
    }
  };

  const handleTriggerLive = async (taskId: string) => {
    setTriggerLoading(taskId);
    setMessage(null);
    const res = await triggerAutopilotInstant(taskId);
    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setMessage({ type: "success", text: `Blog "${res.topic}" published successfully!` });
      router.refresh();
    }
    setTriggerLoading(null);
  };

  return (
    <Card className="bg-card border-border/40">
      <CardHeader>
        <CardTitle>Scheduled Tasks</CardTitle>
        <CardDescription>Your upcoming and completed content generation tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div className={`p-3 rounded-xl text-sm flex items-start gap-3 mb-4 border transition-all ${message.type === 'error' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{message.text}</span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-secondary/20 uppercase border-b border-border/40">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-md">Topic</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Keyword</th>
                <th className="px-4 py-3 font-medium">Instructions</th>
                <th className="px-4 py-3 font-medium">Scheduled For</th>
                <th className="px-4 py-3 font-medium rounded-tr-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No tasks scheduled yet. Import data above to get started.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-4 py-3 font-medium">{task.topic}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.type === 'PAGE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {task.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{task.keyword || '-'}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs truncate max-w-[150px]" title={task.instructions || ''}>
                      {task.instructions || '-'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                      {format(new Date(task.targetDate), "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="px-4 py-3">
                      {task.status === 'PENDING' && (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-amber-500">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                          <button
                            onClick={() => handleTriggerLive(task.id)}
                            disabled={triggerLoading === task.id}
                            className="flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <Play className={`w-2.5 h-2.5 ${triggerLoading === task.id ? 'animate-spin' : ''}`} />
                            {triggerLoading === task.id ? '...' : 'Live'}
                          </button>
                          <button
                            onClick={() => {
                              setEditingTaskId(editingTaskId === task.id ? null : task.id);
                              setDateValue(new Date(task.targetDate).toISOString().slice(0, 16));
                            }}
                            className="flex items-center gap-1 px-2 py-1 border border-border/40 hover:bg-secondary/20 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-muted-foreground"
                            title="Reschedule"
                          >
                            <CalendarIcon className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                      {task.status === 'PROCESSING' && (
                        <span className="flex items-center gap-1 text-xs text-blue-500"><Settings2 className="w-3 h-3 animate-spin" /> Processing</span>
                      )}
                      {task.status === 'COMPLETED' && <span className="flex items-center gap-1 text-xs text-emerald-500"><CheckCircle className="w-3 h-3" /> Done</span>}
                      {task.status === 'FAILED' && <span className="flex items-center gap-1 text-xs text-destructive"><XCircle className="w-3 h-3" /> Failed</span>}
                      
                      {/* Inline date picker */}
                      {editingTaskId === task.id && task.status === 'PENDING' && (
                        <div className="mt-2 flex items-center gap-2 animate-in fade-in duration-200">
                          <input
                            type="datetime-local"
                            value={dateValue}
                            onChange={(e) => setDateValue(e.target.value)}
                            className="bg-secondary/15 border border-border/40 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleReschedule(task.id)}
                            className="text-[10px] h-7 px-2"
                          >
                            Save
                          </Button>
                          <button
                            onClick={() => { setEditingTaskId(null); setDateValue(""); }}
                            className="text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
  );
}
