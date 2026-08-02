import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readLogs } from "@/lib/ops/logger";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "backup";
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    const logFile = type === "deploy" ? "deploy.log" : "backup.log";
    const logs = readLogs(logFile, limit);

    return NextResponse.json({ logs, type });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
