// @ts-nocheck — book-store module not yet implemented
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: false, error: "not_implemented" }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ ok: false, error: "not_implemented" }, { status: 501 });
}
