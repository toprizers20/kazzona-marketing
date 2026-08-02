"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Globe,
  Users,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ExternalLink,
  Radio,
} from "lucide-react";

interface AnalyticsData {
  liveCount: number;
  activePages: { path: string; count: number }[];
  todayViews: number;
  yesterdayViews: number;
  todayUnique: number;
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  devices: { device: string; count: number }[];
  hourlyData: { hour: string; views: number }[];
  totalViews: number;
  totalUnique: number;
}

const deviceIcons: Record<string, React.ReactNode> = {
  desktop: <Monitor className="w-4 h-4" />,
  mobile: <Smartphone className="w-4 h-4" />,
  tablet: <Tablet className="w-4 h-4" />,
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/analytics/live");
        if (res.ok) {
          const parsed = await res.json();
          if (active) {
            setData(parsed);
            setConnected(true);
          }
        } else {
          if (active) setConnected(false);
        }
      } catch {
        if (active) setConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const viewsChange =
    data && data.yesterdayViews > 0
      ? Math.round(((data.todayViews - data.yesterdayViews) / data.yesterdayViews) * 100)
      : 0;

  const maxHourly = data ? Math.max(...data.hourlyData.map((h) => h.views), 1) : 1;

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Live Analytics</h2>
          <p className="text-muted-foreground">
            Real-time traffic data from your website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`relative flex h-2.5 w-2.5 ${connected ? "" : "opacity-30"}`}
          >
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${connected ? "bg-emerald-400" : "bg-red-400"}`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${connected ? "bg-emerald-500" : "bg-red-500"}`}
            />
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {connected ? "Live" : "Connecting..."}
          </span>
        </div>
      </div>

      {/* Live Visitors Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 p-6 md:p-8">
        <div className="absolute right-6 top-6 opacity-10">
          <Radio className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <Activity className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                Right Now
              </p>
              <p className="text-5xl font-black text-foreground">
                {data?.liveCount ?? "—"}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground md:ml-auto">
            <p className="font-medium">active visitors on your site</p>
            <p className="text-xs mt-1 opacity-70">Updates every 5 seconds</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Today&apos;s Views
            </span>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-black">{data?.todayViews ?? "—"}</p>
          {data && viewsChange !== 0 && (
            <p
              className={`text-xs font-bold mt-2 flex items-center gap-1 ${viewsChange > 0 ? "text-emerald-500" : "text-red-500"}`}
            >
              {viewsChange > 0 ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {Math.abs(viewsChange)}% vs yesterday
            </p>
          )}
        </div>

        <div className="bg-card border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Unique Visitors
            </span>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-black">{data?.todayUnique ?? "—"}</p>
          <p className="text-xs text-muted-foreground mt-2">Today</p>
        </div>

        <div className="bg-card border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              All-Time Views
            </span>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-black">{data?.totalViews ?? "—"}</p>
          <p className="text-xs text-muted-foreground mt-2">Since launch</p>
        </div>

        <div className="bg-card border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Total Unique
            </span>
            <Globe className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-black">{data?.totalUnique ?? "—"}</p>
          <p className="text-xs text-muted-foreground mt-2">All time</p>
        </div>
      </div>

      {/* Hourly Traffic Chart */}
      <div className="bg-card border border-border/40 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-1">Hourly Traffic</h3>
        <p className="text-sm text-muted-foreground mb-6">Page views per hour — last 24h</p>
        <div className="flex items-end gap-1 h-40">
          {data?.hourlyData.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {h.views}
              </span>
              <div
                className="w-full rounded-t-md bg-primary/20 group-hover:bg-primary/40 transition-colors relative min-h-[2px]"
                style={{
                  height: `${Math.max((h.views / maxHourly) * 100, 2)}%`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-t-md bg-primary/60"
                  style={{
                    height: `${Math.max((h.views / maxHourly) * 100, 5)}%`,
                  }}
                />
              </div>
              {i % 3 === 0 && (
                <span className="text-[9px] text-muted-foreground mt-1 -rotate-45 origin-top-left">
                  {h.hour}
                </span>
              )}
            </div>
          )) ?? (
            <div className="flex-1 text-center text-muted-foreground text-sm py-12">
              Loading chart data...
            </div>
          )}
        </div>
      </div>

      {/* Three Column Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Active Pages (Live) */}
        <div className="bg-card border border-border/40 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border/40 bg-secondary/20">
            <h3 className="font-bold flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Active Pages Now
            </h3>
          </div>
          <div className="divide-y divide-border/40 max-h-80 overflow-y-auto custom-scrollbar">
            {data?.activePages && data.activePages.length > 0 ? (
              data.activePages.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-3 hover:bg-secondary/10 transition-colors"
                >
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {p.path}
                  </span>
                  <span className="text-sm font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {p.count}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No active visitors right now
              </div>
            )}
          </div>
        </div>

        {/* Top Pages Today */}
        <div className="bg-card border border-border/40 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border/40 bg-secondary/20">
            <h3 className="font-bold">Top Pages Today</h3>
          </div>
          <div className="divide-y divide-border/40 max-h-80 overflow-y-auto custom-scrollbar">
            {data?.topPages && data.topPages.length > 0 ? (
              data.topPages.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-3 hover:bg-secondary/10 transition-colors"
                >
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {p.path}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">
                    {p.views} views
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No page views today yet
              </div>
            )}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-card border border-border/40 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border/40 bg-secondary/20">
            <h3 className="font-bold">Devices</h3>
          </div>
          <div className="p-5 space-y-4">
            {data?.devices && data.devices.length > 0 ? (
              data.devices.map((d, i) => {
                const total = data.devices.reduce(
                  (sum, x) => sum + x.count,
                  0
                );
                const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium capitalize">
                        {deviceIcons[d.device] || (
                          <Monitor className="w-4 h-4" />
                        )}
                        {d.device}
                      </span>
                      <span className="font-bold">{pct}%</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-muted-foreground text-sm">
                No device data yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Referrers */}
      <div className="bg-card border border-border/40 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40 bg-secondary/20">
          <h3 className="font-bold flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-primary" />
            Top Referrers Today
          </h3>
        </div>
        <div className="divide-y divide-border/40">
          {data?.topReferrers && data.topReferrers.length > 0 ? (
            data.topReferrers.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-3 hover:bg-secondary/10 transition-colors"
              >
                <span className="text-sm font-medium truncate max-w-[400px]">
                  {r.referrer}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  {r.views}
                </span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No referrer data today
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
