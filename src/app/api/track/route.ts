import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyOrigin } from "@/lib/csrf";

// Detect device type from user agent
function getDevice(ua: string): string {
  if (/mobile/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

// Simple in-memory rate limiter for track endpoint
const trackRateLimit = new Map<string, number[]>();
const TRACK_MAX = 30; // max 30 requests per minute per IP
const TRACK_WINDOW = 60 * 1000;

function isTrackRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = trackRateLimit.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < TRACK_WINDOW);
  if (recent.length >= TRACK_MAX) return true;
  recent.push(now);
  trackRateLimit.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (isTrackRateLimited(ip)) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const body = await req.json();
    const { visitorId, path, referrer, type } = body;

    if (!visitorId || !path) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validate visitorId format (should be alphanumeric, max 100 chars)
    if (typeof visitorId !== "string" || visitorId.length > 100 || !/^[a-zA-Z0-9]+$/.test(visitorId)) {
      return NextResponse.json({ error: "Invalid visitorId" }, { status: 400 });
    }

    // Validate path format
    if (typeof path !== "string" || path.length > 500 || !path.startsWith("/")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const ua = req.headers.get("user-agent") || "";
    const device = getDevice(ua);

    if (type === "pageview") {
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
    // Only run cleanup periodically to reduce DB load
    if (Math.random() < 0.1) { // 10% chance per request
      const cutoff = new Date(Date.now() - 60_000);
      await prisma.activeVisitor.deleteMany({
        where: { lastSeen: { lt: cutoff } },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
