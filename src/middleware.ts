import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
const key = secretKey ? new TextEncoder().encode(secretKey) : null;

// In-memory cache for redirect lookups (avoids internal fetch on every page load)
const redirectCache = new Map<string, { toPath: string; statusCode: number; expiresAt: number }>();
const REDIRECT_CACHE_TTL = 60 * 1000; // 60 seconds

async function verifyToken(token: string): Promise<boolean> {
  if (!key) return false;
  try {
    await jwtVerify(token, key, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

async function lookupRedirect(fromPath: string): Promise<{ toPath: string; statusCode: number } | null> {
  // Check cache first
  const cached = redirectCache.get(fromPath);
  if (cached && Date.now() < cached.expiresAt) {
    return { toPath: cached.toPath, statusCode: cached.statusCode };
  }

  try {
    // Direct DB query instead of internal fetch
    const { prisma } = await import("@/lib/db");
    const redirect = await prisma.redirect.findUnique({
      where: { fromPath },
      select: { toPath: true, statusCode: true },
    });

    if (redirect) {
      redirectCache.set(fromPath, {
        toPath: redirect.toPath,
        statusCode: redirect.statusCode,
        expiresAt: Date.now() + REDIRECT_CACHE_TTL,
      });
      return { toPath: redirect.toPath, statusCode: redirect.statusCode };
    }

    // Cache negative result to avoid repeated DB hits for non-existent paths
    redirectCache.set(fromPath, { toPath: "", statusCode: 301, expiresAt: Date.now() + 10000 });
    return null;
  } catch {
    return null;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("admin_token")?.value;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/sign-in");
  const isCronRoute = pathname.startsWith("/api/cron");
  const isAutomationRoute = pathname.startsWith("/api/automations");
  const isAnalyticsLive = pathname.startsWith("/api/analytics/live");
  const isPublicApi = pathname.startsWith("/api/redirect-lookup") || pathname.startsWith("/api/track");

  // Allow public API routes without auth
  if (isPublicApi) {
    return NextResponse.next();
  }

  // Cron routes: allow through — they verify CRON_SECRET internally
  if (isCronRoute) {
    return NextResponse.next();
  }

  // Protect dashboard routes — verify valid JWT
  if (isDashboardRoute) {
    if (!adminToken || !(await verifyToken(adminToken))) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Prevent logged-in users from seeing the sign-in page
  if (isAuthRoute && adminToken) {
    const valid = await verifyToken(adminToken);
    if (valid) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Protect admin API routes (automations, analytics live) — verify valid JWT
  if (isAutomationRoute || isAnalyticsLive) {
    if (!adminToken || !(await verifyToken(adminToken))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Run redirect check only for non-static, non-dashboard, non-auth, non-api routes
  if (
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/sign-in") &&
    !pathname.includes(".")
  ) {
    const redirect = await lookupRedirect(pathname);
    if (redirect && redirect.toPath) {
      // Only allow internal redirects (paths starting with /), block external URLs
      if (!redirect.toPath.startsWith("/") || redirect.toPath.startsWith("//")) {
        return NextResponse.next();
      }

      const targetUrl = new URL(redirect.toPath, request.url).toString();
      return NextResponse.redirect(targetUrl, redirect.statusCode || 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
