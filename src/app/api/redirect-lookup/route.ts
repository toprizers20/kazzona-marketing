import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fromPath = searchParams.get("from");

    if (!fromPath) {
      return NextResponse.json({ error: "Missing 'from' parameter" }, { status: 400 });
    }

    const redirect = await prisma.redirect.findUnique({
      where: { fromPath },
    });

    if (redirect) {
      return NextResponse.json({
        toPath: redirect.toPath,
        statusCode: redirect.statusCode,
      });
    }

    return NextResponse.json({ found: false });
  } catch (error) {
    console.error("Error in redirect-lookup API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
