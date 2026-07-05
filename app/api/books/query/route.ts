// @ts-nocheck — book-query module not yet implemented
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest) {
  return NextResponse.json({ ok: false, error: "not_implemented" }, { status: 501 });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "not_implemented" }, { status: 501 });
}
