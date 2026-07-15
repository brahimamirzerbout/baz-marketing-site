import { NextRequest, NextResponse } from "next/server";
import { generateRoadmap, type RoadmapAnswers, type Bottleneck, type Stage, type Industry } from "@/lib/roadmap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BOTTLENECKS: Bottleneck[] = ["lead_flow", "conversion", "aov", "retention", "offer", "tracking", "not_sure"];
const STAGES: Stage[] = ["pre_launch", "early", "growth", "scale"];
const INDUSTRIES: Industry[] = ["b2b_saas", "dtc_ecommerce", "fintech", "hospitality", "ai_devtools", "professional_services", "other"];

/**
 * POST /api/roadmap — generate a personalized 90-day scaling roadmap.
 * Lead capture is handled separately by the page via /api/leads so the
 * battle-tested + scored lead pipeline is reused end-to-end.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown> | null = null;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body) return NextResponse.json({ ok: false, error: "empty_body" }, { status: 400 });

  const industry = String(body.industry ?? "") as Industry;
  const stage = String(body.stage ?? "") as Stage;
  const bottleneck = String(body.bottleneck ?? "") as Bottleneck;
  if (!INDUSTRIES.includes(industry)) return NextResponse.json({ ok: false, error: "invalid_industry" }, { status: 400 });
  if (!STAGES.includes(stage)) return NextResponse.json({ ok: false, error: "invalid_stage" }, { status: 400 });
  if (!BOTTLENECKS.includes(bottleneck)) return NextResponse.json({ ok: false, error: "invalid_bottleneck" }, { status: 400 });

  const answers: RoadmapAnswers = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim().toLowerCase(),
    company: body.company ? String(body.company) : undefined,
    website: body.website ? String(body.website) : undefined,
    industry,
    stage,
    monthlyRevenue: body.monthlyRevenue ? String(body.monthlyRevenue) : undefined,
    bottleneck,
    goal: String(body.goal ?? "").trim() || "Grow revenue predictably",
  };

  try {
    const roadmap = await generateRoadmap(answers);
    return NextResponse.json({ ok: true, roadmap });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "generation_failed" }, { status: 500 });
  }
}