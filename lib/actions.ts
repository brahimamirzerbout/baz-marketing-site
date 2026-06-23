'use server';

import { validateLead } from './validate';

export type LeadResult =
  | { ok: true; id: string; score?: number }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Server action for the contact form. Validates input, then forwards to:
 *  - the BAZ meta-ecosystem API (/api/leads) when BAZ_API_URL is set, OR
 *  - a generic LEAD_INTAKE_URL webhook when set, OR
 *  - logs locally and returns success (dev/demo default).
 *
 * This lets the same form code drive the standalone Next site, a wired
 * BAZ ecosystem deployment, or a 3rd-party CRM webhook.
 */
export async function submitLead(raw: unknown): Promise<LeadResult> {
  const parsed = validateLead(raw);
  if (!parsed.ok) {
    return { ok: false, error: 'validation_failed', fieldErrors: parsed.errors };
  }

  const lead = parsed.data;
  // Honeypot: silently succeed without forwarding.
  if (lead.hp && lead.hp.length > 0) {
    return { ok: true, id: 'silenced' };
  }

  const id = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  // Strip honeypot before forwarding
  const { hp: _hp, ...forwardable } = lead;

  // 1) BAZ meta-ecosystem backend (preferred when configured)
  const baz = process.env.BAZ_API_URL;
  if (baz) {
    try {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      if (process.env.BAZ_API_TOKEN) headers['authorization'] = `Bearer ${process.env.BAZ_API_TOKEN}`;

      const r = await fetch(`${baz.replace(/\/$/, '')}/api/leads`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: lead.email,
          name: lead.name,
          company: lead.company,
          website: lead.website,
          budget: lead.budget,
          message: lead.message,
          source: lead.source || 'marketing_site',
        }),
      });
      if (r.ok) {
        const j = await r.json().catch(() => ({}));
        return { ok: true, id: j.id ?? id, score: j.score };
      }
    } catch {
      // fall through to next strategy
    }
  }

  // 2) Generic webhook
  const intake = process.env.LEAD_INTAKE_URL;
  const token = process.env.LEAD_INTAKE_TOKEN;
  if (intake) {
    try {
      const r = await fetch(intake, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id, receivedAt: new Date().toISOString(), ...forwardable }),
      });
      if (!r.ok) return { ok: false, error: `upstream_${r.status}` };
      return { ok: true, id };
    } catch {
      return { ok: false, error: 'network_error' };
    }
  }

  // 3) Default: log + return success so dev/demo works
  console.log('[baz:lead]', { id, ...forwardable });
  return { ok: true, id };
}
