import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { restoreBackup } from "@/lib/ops/backup";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { filename } = await req.json();
    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    const result = await restoreBackup(filename);
    if (result.success) {
      return NextResponse.json({ success: true, message: `Restored from ${filename}` });
    }
    return NextResponse.json({ error: result.error }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
