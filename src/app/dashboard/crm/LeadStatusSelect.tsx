"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/app/actions/crm";
import { Loader2 } from "lucide-react";

export function LeadStatusSelect({ leadId, initialStatus }: { leadId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    
    try {
      const result = await updateLeadStatus(leadId, newStatus);
      if (result.success) {
        setStatus(newStatus);
      } else {
        console.error(result.error);
        e.target.value = status; // revert
      }
    } catch (err) {
      console.error(err);
      e.target.value = status; // revert
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "NEW": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "IN_PROGRESS": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "CONVERTED": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "CLOSED": return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
      default: return "";
    }
  };

  return (
    <div className="relative flex items-center">
      <select
        value={status}
        onChange={handleChange}
        disabled={isUpdating}
        className={`appearance-none text-xs font-bold px-3 py-1 rounded-full border outline-none cursor-pointer disabled:opacity-50 transition-colors ${getStatusColor(status)}`}
      >
        <option value="NEW" className="bg-background text-foreground">NEW</option>
        <option value="IN_PROGRESS" className="bg-background text-foreground">IN_PROGRESS</option>
        <option value="CONVERTED" className="bg-background text-foreground">CONVERTED</option>
        <option value="CLOSED" className="bg-background text-foreground">CLOSED</option>
      </select>
      {isUpdating && <Loader2 className="w-3 h-3 absolute -right-5 animate-spin text-muted-foreground" />}
    </div>
  );
}
