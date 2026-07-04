import { NextResponse } from "next/server";

export async function GET() {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://baz.agency";
    const res = await fetch(`${origin}/sitemap.xml`);
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "sitemap fetch failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, rebuilt: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
