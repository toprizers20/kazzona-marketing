import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createBackup, listBackups, getBackupStats } from "@/lib/ops/backup";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [backups, stats] = await Promise.all([listBackups(), getBackupStats()]);
    return NextResponse.json({ backups, stats });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await createBackup("manual");
    if (result.success) {
      return NextResponse.json(result);
    }
    return NextResponse.json({ error: result.error }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
