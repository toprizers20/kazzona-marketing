import { prisma } from "@/lib/db";
import { LeadStatusSelect } from "./LeadStatusSelect";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function CRMPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Lead CRM</h2>
        <p className="text-muted-foreground">Manage incoming inquiries and contact requests.</p>
      </div>

      <div className="bg-card border border-border/40 rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-secondary/20 uppercase border-b border-border/40">
              <tr>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No leads found. When someone fills out the contact form, they will appear here.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/10 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{lead.name}</div>
                      <div className="text-muted-foreground text-xs">{lead.email}</div>
                      {lead.company && <div className="text-muted-foreground text-xs">{lead.company}</div>}
                    </td>
                    <td className="px-6 py-4 font-medium text-primary">
                      {lead.service}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                      {format(new Date(lead.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <LeadStatusSelect leadId={lead.id} initialStatus={lead.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-block max-w-[200px] truncate text-muted-foreground text-xs" title={lead.message}>
                        {lead.message}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center text-muted-foreground">
              No leads found. When someone fills out the contact form, they will appear here.
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {leads.map((lead) => (
                <div key={lead.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{lead.name}</div>
                      <div className="text-muted-foreground text-xs truncate">{lead.email}</div>
                      {lead.company && <div className="text-muted-foreground text-xs truncate">{lead.company}</div>}
                    </div>
                    <LeadStatusSelect leadId={lead.id} initialStatus={lead.status} />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-primary">{lead.service}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{format(new Date(lead.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  {lead.message && (
                    <p className="text-xs text-muted-foreground line-clamp-2" title={lead.message}>
                      {lead.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
