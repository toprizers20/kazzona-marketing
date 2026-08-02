import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Activity, FileText, Zap, Globe, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDistanceToNow, startOfDay } from "date-fns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const today = startOfDay(new Date());

  const [totalLeads, newLeads, totalPosts, totalPages, todayPosts, todayPages, recentLeads, recentPosts, recentPages] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.post.count(),
    prisma.page.count(),
    prisma.post.count({ where: { createdAt: { gte: today } } }),
    prisma.page.count({ where: { createdAt: { gte: today } } }),
    prisma.lead.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
    prisma.post.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
    prisma.page.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
  ]);

  const allRecentContent = [
    ...recentPosts.map(p => ({ ...p, type: 'Blog' })),
    ...recentPages.map(p => ({ ...p, type: 'Page' }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-primary/10 via-background to-background p-8 rounded-3xl border border-border/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
           <TrendingUp className="w-64 h-64 translate-x-1/4 -translate-y-1/4" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-4">
             Agency OS v2.0
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Welcome back, Admin</h2>
          <p className="text-lg text-muted-foreground">Here is the heartbeat of your digital agency today.</p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
           <Link href="/dashboard/content/create" className={buttonVariants({ variant: "default", className: "rounded-full shadow-lg shadow-primary/20" })}>
              Create New Content <ArrowRight className="ml-2 w-4 h-4" />
           </Link>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border/40 shadow-sm hover:border-primary/50 transition-all hover:-translate-y-1 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-secondary/20 group-hover:bg-primary/5 transition-colors">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inquiries</CardTitle>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
               <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">{totalLeads}</div>
            <p className="text-sm font-medium text-emerald-500 mt-2 flex items-center gap-1.5 bg-emerald-500/10 w-max px-2 py-0.5 rounded-full">
              <Activity className="w-3 h-3" /> {newLeads} pending
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border/40 shadow-sm hover:border-primary/50 transition-all hover:-translate-y-1 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-secondary/20 group-hover:bg-primary/5 transition-colors">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published Blogs</CardTitle>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
               <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">{totalPosts}</div>
            <p className="text-sm font-medium text-blue-500 mt-2 flex items-center gap-1.5 bg-blue-500/10 w-max px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" /> {todayPosts} published today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/40 shadow-sm hover:border-primary/50 transition-all hover:-translate-y-1 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-secondary/20 group-hover:bg-primary/5 transition-colors">
            <CardTitle className="text-sm font-medium text-muted-foreground">Live Landing Pages</CardTitle>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
               <Globe className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">{totalPages}</div>
            <p className="text-sm font-medium text-fuchsia-500 mt-2 flex items-center gap-1.5 bg-fuchsia-500/10 w-max px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" /> {todayPages} created today
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary to-orange-600 text-primary-foreground border-transparent shadow-xl shadow-primary/20 rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">AI Automation Engine</CardTitle>
            <Zap className="h-4 w-4 text-primary-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">Active</div>
            <Link href="/dashboard/automations" className="text-sm font-bold bg-white/20 text-white mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-white/30 transition-colors w-full">
              Manage Schedule <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 bg-card border-border/40 rounded-3xl overflow-hidden shadow-sm">
          <CardHeader className="bg-secondary/20 border-b border-border/40 p-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Clock className="w-6 h-6 text-primary" />
              Content Stream
            </CardTitle>
            <CardDescription>The latest pages and blogs created across the platform.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {allRecentContent.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                   <FileText className="w-12 h-12 mb-4 opacity-20" />
                   <p>No content generated yet.</p>
                   <Link href="/dashboard/content/create" className="text-primary font-bold mt-2 hover:underline">Create your first piece</Link>
                </div>
              ) : (
                allRecentContent.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-6 border-b border-border/40 last:border-0 hover:bg-secondary/10 transition-colors group">
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.type === 'Blog' ? 'bg-blue-500/10 text-blue-500' : 'bg-fuchsia-500/10 text-fuchsia-500'}`}>
                          {item.type === 'Blog' ? <FileText className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                       </div>
                       <div className="flex flex-col gap-1">
                         <span className="font-bold text-base group-hover:text-primary transition-colors">{item.title}</span>
                         <div className="flex items-center gap-2 text-xs">
                           <span className="text-muted-foreground">/{item.type === 'Blog' ? 'blog/' : ''}{item.slug}</span>
                         </div>
                       </div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap bg-secondary/50 px-3 py-1 rounded-full">
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                ))
              )}
            </div>
            {allRecentContent.length > 0 && (
               <div className="p-4 border-t border-border/40 bg-secondary/10 text-center">
                  <Link href="/dashboard/content" className="text-sm font-bold text-primary hover:underline">View All Content</Link>
               </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3 bg-card border-border/40 rounded-3xl overflow-hidden shadow-sm">
          <CardHeader className="bg-secondary/20 border-b border-border/40 p-6">
            <CardTitle className="flex items-center gap-3 text-xl">
               <Users className="w-6 h-6 text-primary" />
               Lead Inbox
            </CardTitle>
            <CardDescription>Recent inquiries from potential clients.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             <div className="flex flex-col">
               {recentLeads.length === 0 ? (
                 <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                    <Users className="w-12 h-12 mb-4 opacity-20" />
                    <p>No recent leads found.</p>
                 </div>
               ) : (
                 recentLeads.map((lead) => (
                   <div key={lead.id} className="flex items-start gap-4 p-6 border-b border-border/40 last:border-0 hover:bg-secondary/10 transition-colors group">
                     <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 text-primary flex items-center justify-center font-black text-xl shrink-0">
                       {lead.name.charAt(0).toUpperCase()}
                     </div>
                     <div className="flex flex-col flex-1 overflow-hidden">
                       <span className="font-bold text-base truncate">{lead.name}</span>
                       <span className="text-sm text-primary font-medium truncate mb-1">{lead.service}</span>
                       <span className="text-xs text-muted-foreground line-clamp-1">{lead.message}</span>
                     </div>
                     <div className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-secondary/50 px-2 py-1 rounded-md">
                       {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: false })}
                     </div>
                   </div>
                 ))
               )}
             </div>
             {recentLeads.length > 0 && (
               <div className="p-4 border-t border-border/40 bg-secondary/10 text-center">
                  <Link href="/dashboard/crm" className="text-sm font-bold text-primary hover:underline">Open CRM</Link>
               </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
