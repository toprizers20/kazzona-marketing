import { NextResponse } from "next/server";
import { createBackup } from "@/lib/ops/backup";

// GET /api/cron/backup — scheduled backup (call every 5 hours via external cron)
// Hostinger cron or external scheduler should hit this endpoint with CRON_SECRET
export async function GET(req: Request) {
  // Verify CRON_SECRET for external scheduler auth
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await createBackup("scheduled");
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Backup created: ${result.filename}`,
        sizeBytes: result.sizeBytes,
      });
    }
    return NextResponse.json({ error: result.error }, { status: 500 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
