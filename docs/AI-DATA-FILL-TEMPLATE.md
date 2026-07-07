# BAZventures — Data-Fill Template (handoff to AI)

> Self-contained. Copy this whole file to the AI doing the fill. No repo access required.

## Task
Fill the data-bearing sections of the BAZventures site with **REAL, signed-client data**. Replace every `[COMPOSITE]` / placeholder value below. Do not invent. If a field cannot be verified, write `[NEEDS DATA]` and leave it for the orchestrator.

## Guardrails (non-negotiable — these are the site owner's own doctrine)
- **Real metrics only.** No fabricated numbers, names, or quotes. Unverified → `[NEEDS DATA]`. Never guess a number to fill a gap.
- **Case studies:** set `placeholder: false` ONLY when the client has signed off on public release. Otherwise keep `placeholder: true` (the UI shows a "Demo" badge — that is the honest state until sign-off).
- **Testimonials:** real quote + real attributor (name + role) + documented client consent. **GDPR consent required for EU clients.** If no consent, omit the `testimonial` object entirely.
- **Attribution context:** where the schema has `s` / `ctx` / `sub` fields, give time window + method (e.g., "rolling 12-month, server-side attribution").
- **Preserve field names and types** so each file still compiles (TypeScript). Do not rename keys. Do not change the array lengths the UI expects (e.g., `metrics` = exactly 3).
- **Tone:** operator-grade, mechanism-first, revenue-not-vanity. Short, load-bearing sentences. Match the existing register ("X, not Y" patterns; "ship", "architect", "hold the line"). No hype, no buzzwords.

## Provenance note
The copy style is sourced from the BAZ canonical brief + the marketer synthesis (Godin / Halbert / Schwartz / Kennedy / Hormozi / Brunson / Deiss / Wiebe / Ogilvy / Hopkins) — **not** from external citation links. Do not attach third-party links as sourcing for any claim.

---

## SECTION 1 — Case studies → `content/case-studies.ts`
**12 composites, all currently `placeholder: true`.** Replace with signed-client stories.

Schema (TypeScript):
```ts
{
  slug: string;              // kebab-case, unique, stable (URLs depend on it)
  client: string;            // real client name OR [NEEDS DATA]
  industry: string;          // e.g. "B2B SaaS"
  services: string[];        // MUST match service names in content/services.ts
  cover: string;             // CSS color — keep existing palette tokens
  problem: string;           // 1–2 sentences: what they were stuck on
  strategy: string;          // 1–2 sentences: what BAZ did differently (mechanism, not adjectives)
  result: string;            // 1–2 sentences: what changed, with the metrics inline
  metrics: { label: string; value: string }[];  // EXACTLY 3 headline metrics
  duration: string;          // e.g. "90 days"
  testimonial?: { quote: string; author: string; role: string }; // ONLY with consent
  placeholder?: boolean;     // false ONLY when signed off
}
```
Current composites to replace (slug · industry · current metrics · duration):
1. `viralvista-growth-engine` · DTC Beauty · ROAS 1.8→4.6 · +212% rev · ↓58% CPA · 90 days — [COMPOSITE]
2. `northwind-fintech-seo` · FinTech · 0→480K organic · 340+ top-3 SERPs · 3.2× inbound · 14 mo — [COMPOSITE]
3. `engageera-saas-launch` · B2B SaaS · Trial→Paid 0.6%→2.4% · +318% MRR · ↓23d cycle · 6 mo — [COMPOSITE]
4. `saffron-hospitality-multi-location` · Hospitality · +71% direct bookings · ↓44% CPA · 4.2s→1.1s LCP · 8 mo — [COMPOSITE]
5. `meridian-devtools-ai-search` · AI/DevTools · 0→28 AI citations · +330% branded search · +110% demos · 5 mo — [COMPOSITE]
6. `buzzbeacon-content-engine` · Podcast Network · 1,400+ page-1 · +38% ad RPM · 94% indexed · 7 mo — [COMPOSITE]
7. `tessera-fintech-video-podcast` · FinTech · 4.2M views · 312K downloads · +$6.4M pipeline · 12 mo — [COMPOSITE]
8. `lumenwear-influencer-engine` · DTC Apparel · $11 EMV/$1 · ROAS 2.1→5.4 · ↓42% CPA · 6 mo — [COMPOSITE]
9. `kantara-b2b-abm` · B2B SaaS · +$24M pipeline · 18%→31% win rate · ↓4.2mo cycle · 9 mo — [COMPOSITE]
10. `soukly-marketplace-affiliate` · Marketplace · 24% partner GMV · $84→$31 supply CAC · +38% partner LTV · 14 mo — [COMPOSITE]
11. `pivot-labs-mena-entry` · B2B SaaS · $4.8M MENA ARR yr1 · 3 tier-1 logos · 38% partner pipeline · 12 mo — [COMPOSITE]
12. `mosaic-research-positioning` · CPG · +$80M TAM · +18% pricing · $52M Series A · 4 mo — [COMPOSITE]

→ For each: provide real client (or `[NEEDS DATA]`), real problem/strategy/result, 3 verified metrics with attribution, duration, and testimonial ONLY if consented. Set `placeholder: false` only at sign-off.

## SECTION 2 — KPI band → `components/sections/KpiBand.tsx`
3 hardcoded KPIs (currently "representative client work, replace with audited figures"). Each needs `{ v, l, s, ctx }`:
- `v` = headline number
- `l` = label
- `s` = one-line context
- `ctx` = attribution context
Current:
1. `$24M+` · Paid spend managed · "Across Google, Meta, TikTok, LinkedIn — audited every quarter" · "40+ engagements, 2023–2026" — [COMPOSITE]
2. `+214%` · Avg organic lift · 12 mo · "Across content engine clients" · "measured via server-side attribution" — [COMPOSITE]
3. `94%` · Client renewal rate · "Because senior people ship the work" · "rolling 12-month, 60+ clients" — [COMPOSITE]
→ Replace each with an audited figure + real context. Keep exactly 3.

## SECTION 3 — Hero outcome strip → `components/sections/Hero.tsx`
4 hardcoded metrics in the hero grid `{ v, l, sub }`:
Current: `$200K+` pipeline/90d ("or month 4 free") · `4×` coverage ("≥ 3× target") · `60s` loop ("score → route → close") · `100%` senior ("no juniors, ever")
→ Replace `$200K+` and `4×` with real medians **if verified**. Keep `60s` and `100%` — these are operational/model facts, not composites.

## SECTION 4 — Performance feature → `components/sections/PerformanceFeature.tsx`
- 3 KPI blocks `{ value, label, sub }`: `$24M+` spend · `+62%` ROAS · `40+` variants/mo — [COMPOSITE]
- 3 proof cards `{ client, industry, metric, detail }`: ViralVista ROAS 1.8→4.6 · Lumenwear 2.1→5.4 · Soukly CAC ↓63% — [COMPOSITE]
→ Replace with audited figures + real client cards (cards must match the case-study sign-off state).

## SECTION 5 — Team bios → `content/team.ts`
6 entries: **Brahim ZERBOUT (real)** + 5 role-definitions (SEO & Content, Paid & Lifecycle, Brand & Creative, Analytics, Web).
The about page now reads "Four operators. Six roles. Bios illustrative until filled" — so role-definitions are the **honest default**.
→ For each of the 5: provide real name + role + bio when the partner joins. Until then, leave as a role-definition (already honest). **Do not invent partner names.**

## SECTION 6 — Site stats → `lib/site.ts` (env-overridable)
Keys + current defaults (shown in the hero band + about StatRow):
- `NEXT_PUBLIC_BRANDS_SCALED` = `60+`
- `NEXT_PUBLIC_COUNTRIES_SERVED` = `MENA · EU · US`
- `NEXT_PUBLIC_SENIOR_ONLY` = `100%`
- `NEXT_PUBLIC_TEAM_SIZE` = `4`
- `NEXT_PUBLIC_PAYBACK_MEDIAN` = `<6mo`
→ Set each via env with the audited figure. These drive the homepage stat band + about-page StatRow.

---

## Output format
Return each filled section as a TypeScript code block matching the exact file format above. Mark any unverified field `[NEEDS DATA]`. Do not set `placeholder: false` without sign-off. Do not ship until every `[NEEDS DATA]` is resolved and every composite is either replaced with real data or honestly flagged `placeholder: true`.

## Done-state definition
The fill is complete when: (1) every case study is a real signed-client story OR explicitly retained as `placeholder: true`; (2) KPI band + hero strip + PerformanceFeature hold audited numbers (no `[NEEDS DATA]`); (3) team bios are either real partners or honestly labeled role-definitions; (4) `tsc --noEmit` passes on all edited files. Until then, `/book` stays internal — composites on a live booking page break the senior-partner credibility claim.