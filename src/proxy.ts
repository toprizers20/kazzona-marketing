import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
const key = secretKey ? new TextEncoder().encode(secretKey) : null;

async function verifyToken(token: string): Promise<boolean> {
  if (!key) return false;
  try {
    await jwtVerify(token, key, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("admin_token")?.value;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/sign-in");
  const isCronRoute = pathname.startsWith("/api/cron");
  const isAutomationRoute = pathname.startsWith("/api/automations");
  const isPublicApi = pathname.startsWith("/api/redirect-lookup") || pathname.startsWith("/api/track");

  // Allow public API routes without auth
  if (isPublicApi) {
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

  // Protect admin API routes — verify valid JWT
  if (isCronRoute || isAutomationRoute) {
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
    try {
      const baseUrl = request.nextUrl.origin;
      const lookupUrl = new URL(`/api/redirect-lookup?from=${encodeURIComponent(pathname)}`, baseUrl);
      
      const res = await fetch(lookupUrl.toString(), {
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.toPath) {
          const targetUrl = data.toPath.startsWith("http")
            ? data.toPath
            : new URL(data.toPath, request.url).toString();
          
          return NextResponse.redirect(targetUrl, data.statusCode || 301);
        }
      }
    } catch {
      // Redirect lookup may fail on some hosts - silently skip
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
