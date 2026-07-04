import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-client";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const { count: leadsCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo);

    const { count: auditCount } = await supabase
      .from("audit")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo);

    return NextResponse.json({
      ok: true,
      weekLeads: leadsCount,
      weekAuditEntries: auditCount,
      at: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
