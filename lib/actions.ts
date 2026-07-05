"use server";

import { validateLead } from "./validate";
import { routeComplete } from "./llm-router";
import { scoreLead } from "./scoring";

export type LeadResult =
  | { ok: true; id: string; score?: number }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Server action for the contact form. Validates input, persists to the
 * primary database, then fans out to:
 *   1. BAZventures meta-ecosystem backend (optional)
 *   2. Generic webhook (Slack, HubSpot, etc.) — with retry
 *   3. LLM scoring via router (falls back to deterministic)
 *
 * All three writes are independent — a failure in one doesn't block the others.
 * The DB write is the source of truth; everything else can be retried.
 */
export async function submitLead(raw: unknown): Promise<LeadResult> {
  const parsed = validateLead(raw);
  if (!parsed.ok) {
    return { ok: false, error: "validation_failed", fieldErrors: parsed.errors };
  }

  const lead = parsed.data;
  if (lead.hp && lead.hp.length > 0) {
    return { ok: true, id: "silenced" };
  }

  const { hp: _hp, ...forwardable } = lead;

  let id: string | null = null;
  try {
    const { getDb, id: makeId, audit } = await import("./db");
    const db = getDb();
    id = makeId("l");
    db.prepare(
      `INSERT INTO leads (id, name, email, company, website, phone, budget, message, source, service)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      id,
      lead.name,
      lead.email.toLowerCase(),
      (lead.company ?? "").slice(0, 200),
      (lead.website ?? "").slice(0, 500),
      "",
      (lead.budget ?? "").slice(0, 64),
      lead.message,
      (lead.source || "marketing_site").slice(0, 64),
      (lead.service || "").slice(0, 96),
    );
    audit(null, "lead.create", id, {
      source: lead.source || "marketing_site",
      service: lead.service || "",
    });
  } catch (e) {
    console.error("[baz:lead] db insert failed:", e);
  }

  await postToBazApi(id, forwardable);
  await postToWebhook(id, forwardable);

  if (id && process.env.LEAD_SCORING !== "off") {
    scoreLeadInBackground(id, lead.message, lead.service || "").catch(() => {});
  }

  if (id) {
    return { ok: true, id };
  }
  return { ok: false, error: "db_unavailable" };
}

async function postToBazApi(id: string | null, data: Record<string, unknown>) {
  const baz = process.env.BAZ_API_URL;
  if (!baz || !id) return;
  try {
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (process.env.BAZ_API_TOKEN) {
      headers["authorization"] = `Bearer ${process.env.BAZ_API_TOKEN}`;
    }
    await fetchWithTimeout(`${baz.replace(/\/$/, "")}/api/leads`, {
      method: "POST",
      headers,
      body: JSON.stringify({ id, ...data }),
    }, 5000);
  } catch {
    /* non-fatal */
  }
}

async function postToWebhook(id: string | null, data: Record<string, unknown>) {
  const intake = process.env.LEAD_INTAKE_URL;
  const token = process.env.LEAD_INTAKE_TOKEN;
  if (!intake || !id) return;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetchWithTimeout(intake, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id, receivedAt: new Date().toISOString(), ...data }),
      }, 5000);
      if (r.ok) return;
      console.warn(`[baz:lead] webhook returned ${r.status} (attempt ${attempt}/3)`);
    } catch (e) {
      console.warn(`[baz:lead] webhook error (attempt ${attempt}/3):`, e);
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 1000));
  }
}

async function fetchWithTimeout(url: string, opts: RequestInit, ms: number): Promise<Response> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ac.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Score a lead in the background. Tries LLM router first, falls back to
 * deterministic scoring. Updates the lead's score and intent columns.
 */
async function scoreLeadInBackground(leadId: string, message: string, service: string) {
  let score = 0;
  let intent = "";
  let llmOk = false;

  try {
    const result = await routeComplete({
      prompt: `Score this lead message (the lead is interested in: ${service || "unspecified"}):\n\n${message.slice(0, 2000)}`,
      system: `You are BAZventures LeadGen Agent. Score the lead 0-100 and return JSON: {"score": <int>, "intent": "<buy_now|researching|comparison_shopping|tire_kicker>"}`,
      maxTokens: 300,
      temperature: 0.2,
    });

    if (result.ok && result.text) {
      const parsed = JSON.parse(result.text.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
      score = Math.max(0, Math.min(100, parseInt(parsed.score, 10) || 0));
      intent = String(parsed.intent || "").slice(0, 32);
      llmOk = true;
    }
  } catch {
    /* fall through to deterministic */
  }

  if (!llmOk) {
    const det = scoreLead({ message, service });
    score = det.score;
    intent = det.intent;
  }

  if (score > 0 || intent) {
    try {
      const { getDb } = await import("./db");
      const db = getDb();
      db.prepare("UPDATE leads SET score = ?, intent = ? WHERE id = ?").run(score, intent, leadId);
    } catch {
      /* silent */
    }
  }
}
