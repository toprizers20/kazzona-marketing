import { NextResponse } from "next/server";
import { createBackup } from "@/lib/ops/backup";

// GET /api/cron/backup — scheduled backup (call every 5 hours via external cron)
// Hostinger cron or external scheduler should hit this endpoint
export async function GET() {
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
