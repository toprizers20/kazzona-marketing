import { NextResponse } from "next/server";
import { logout } from "@/lib/auth";

export async function POST(request: Request) {
  await logout();
  return NextResponse.redirect(new URL("/sign-in", request.url), { status: 302 });
}
