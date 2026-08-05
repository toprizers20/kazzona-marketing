import crypto from "crypto";

// CSRF token generation and verification
// Uses a signed token approach: timestamp + signature

const CSRF_SECRET = process.env.JWT_SECRET;
if (!CSRF_SECRET) {
  console.warn("JWT_SECRET not set — CSRF protection is degraded. Set JWT_SECRET in your environment.");
}

export function generateCsrfToken(): string {
  if (!CSRF_SECRET) return "";
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", CSRF_SECRET)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifyCsrfToken(token: string): boolean {
  if (!CSRF_SECRET || !token) return false;
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;

    // Check token is not too old (1 hour max)
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > 60 * 60 * 1000) return false;

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", CSRF_SECRET)
      .update(timestamp)
      .digest("hex");

    // Ensure both buffers are the same length before timingSafeEqual
    const sigBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expectedSignature, "hex");
    if (sigBuf.length !== expectedBuf.length) return false;

    return crypto.timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}

// Verify Origin header matches expected origin
export function verifyOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  
  if (!origin && !host) return false;
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    host ? `https://${host}` : null,
    host ? `http://${host}` : null,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter(Boolean) as string[];

  if (origin) {
    return allowedOrigins.some((allowed) => origin.startsWith(allowed));
  }
  
  // If no Origin header, check Referer
  const referer = request.headers.get("referer");
  if (referer) {
    return allowedOrigins.some((allowed) => referer.startsWith(allowed));
  }

  return false;
}
