/**
 * POST /api/data/import — Import leads/data from CSV or JSON
 *
 * Body: { format: "csv" | "json", data: string }
 * Or multipart form with file field
 */

import { NextRequest, NextResponse } from "next/server";
import { importLeadsFromCSV } from "@/lib/data/pipeline";
import { readSessionFromCookies } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const guard = await rateLimit(req, { key: "data-import", limit: 5, windowMs: 60_000 });
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: rateLimitHeaders(guard) },
    );
  }

  // Auth check
  const { user } = await readSessionFromCookies();
  if (!user || (user.role !== "owner" && user.role !== "admin")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") || "";

  try {
    let csvText: string;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
      }
      csvText = await file.text();
    } else {
      const body = await req.json();
      csvText = body.data || "";
      if (!csvText) {
        return NextResponse.json({ ok: false, error: "No data provided" }, { status: 400 });
      }
    }

    const result = importLeadsFromCSV(csvText);

    // Audit log
    const db = getDb();
    db.prepare("INSERT INTO audit (actor, action, target, meta) VALUES (?, ?, ?, ?)").run(
      user.id,
      "import_leads",
      "leads",
      JSON.stringify({ imported: result.imported, skipped: result.skipped, errors: result.errors.length }),
    );

    return NextResponse.json({
      ok: true,
      imported: result.imported,
      skipped: result.skipped,
      errors: result.errors,
    });
  } catch (err) {
    console.error("[data:import]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}