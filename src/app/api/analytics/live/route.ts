import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { startOfDay, subDays } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const cutoff = new Date(Date.now() - 60_000);
    const today = startOfDay(now);
    const yesterday = startOfDay(subDays(now, 1));
    const hoursAgo24 = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Live visitors (seen in last 60s)
    const activeVisitors = await prisma.activeVisitor.findMany({
      where: { lastSeen: { gte: cutoff } },
    });

    // Active pages breakdown
    const pageBreakdown: Record<string, number> = {};
    for (const v of activeVisitors) {
      pageBreakdown[v.path] = (pageBreakdown[v.path] || 0) + 1;
    }
    const activePages = Object.entries(pageBreakdown)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count);

    // Today's total page views
    const todayViews = await prisma.pageView.count({
      where: { createdAt: { gte: today } },
    });

    // Yesterday's total page views
    const yesterdayViews = await prisma.pageView.count({
      where: { createdAt: { gte: yesterday, lt: today } },
    });

    // Today's unique visitors (single query with groupBy)
    const todayUniqueResult = await prisma.pageView.groupBy({
      by: ["visitorId"],
      where: { createdAt: { gte: today } },
    });
    const todayUnique = todayUniqueResult.length;

    // Top pages today
    const topPagesRaw = await prisma.pageView.groupBy({
      by: ["path"],
      _count: { id: true },
      where: { createdAt: { gte: today } },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });
    const topPages = topPagesRaw.map((p) => ({
      path: p.path,
      views: p._count.id,
    }));

    // Top referrers today
    const topReferrersRaw = await prisma.pageView.groupBy({
      by: ["referrer"],
      _count: { id: true },
      where: { createdAt: { gte: today }, referrer: { not: null } },
      orderBy: { _count: { id: "desc" } },
      take: 8,
    });
    const topReferrers = topReferrersRaw
      .filter((r) => r.referrer && r.referrer.length > 0)
      .map((r) => ({ referrer: r.referrer!, views: r._count.id }));

    // Device breakdown today
    const devicesRaw = await prisma.pageView.groupBy({
      by: ["device"],
      _count: { id: true },
      where: { createdAt: { gte: today } },
    });
    const devices = devicesRaw.map((d) => ({
      device: d.device || "unknown",
      count: d._count.id,
    }));

    // Hourly trend (last 24 hours) - single query with groupBy
    const hourlyRaw = await prisma.pageView.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: hoursAgo24 } },
      _count: { id: true },
    });

    // Build hourly buckets (24 hours)
    const hourlyMap: Record<string, number> = {};
    for (const entry of hourlyRaw) {
      const d = new Date(entry.createdAt);
      const label = `${String(d.getHours()).padStart(2, "0")}:00`;
      hourlyMap[label] = (hourlyMap[label] || 0) + entry._count.id;
    }
    const hourlyData: { hour: string; views: number }[] = [];
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60 * 60 * 1000);
      const label = `${String(d.getHours()).padStart(2, "0")}:00`;
      hourlyData.push({ hour: label, views: hourlyMap[label] || 0 });
    }

    // All-time totals
    const totalViews = await prisma.pageView.count();
    const totalUniqueResult = await prisma.pageView.groupBy({
      by: ["visitorId"],
    });
    const totalUnique = totalUniqueResult.length;

    return NextResponse.json({
      liveCount: activeVisitors.length,
      activePages,
      todayViews,
      yesterdayViews,
      todayUnique,
      topPages,
      topReferrers,
      devices,
      hourlyData,
      totalViews,
      totalUnique,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
