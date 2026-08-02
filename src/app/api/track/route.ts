import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Detect device type from user agent
function getDevice(ua: string): string {
  if (/mobile/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, path, referrer, type } = body;

    if (!visitorId || !path) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ua = req.headers.get("user-agent") || "";
    const device = getDevice(ua);

    if (type === "pageview") {
      // Record a permanent page view
      await prisma.pageView.create({
        data: {
          visitorId,
          path,
          referrer: referrer || null,
          userAgent: ua.slice(0, 300),
          device,
        },
      });
    }

    // Always upsert the active visitor (works for both pageview and heartbeat)
    await prisma.activeVisitor.upsert({
      where: { visitorId },
      update: { path, lastSeen: new Date() },
      create: { visitorId, path, lastSeen: new Date() },
    });

    // Cleanup: remove visitors not seen in the last 60 seconds
    const cutoff = new Date(Date.now() - 60_000);
    await prisma.activeVisitor.deleteMany({
      where: { lastSeen: { lt: cutoff } },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
