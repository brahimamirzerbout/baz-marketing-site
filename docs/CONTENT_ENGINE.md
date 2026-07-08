# BAZ Content Engine — generation protocol

> Looted from the Gemini architecture pass, **reconciled to canonical BAZ**.
> Use this as the source of truth for generating any new page/block on the empire site.

## 1. Brand guardrails (do NOT change)

- **Name:** THE MARKETING AGENCY (never "BAZ Ventures Agency" in copy).
- **Design:** Midnight Terminal — bg `#020617`, surface `#0B1120`, accent `#22D3EE`, depth `#818CF8`, text `#F8FAFC`/`#94A3B8`. Square corners. Inter + JetBrains Mono. **Do not adopt Gemini's `#0A0A0F`/`#00F0FF`/`#7B2FFF` palette.**
- **Doctrine:** revenue not vanity · no hype · senior-partner model · 90-day plans · proof beats promises · tracking is the moat · sub-1.5s LCP.
- **Pricing:** project + retainer, never SaaS. Core $6.5–9.5k/mo, Growth $18–28k/mo, Project $12–80k.

## 2. Voice — the tightening rules

**Keep (architectural, from Gemini):** systems, infrastructure, deploy, engineer, protocol, architecture, framework, precision, instrument, route, sequence.

**Cut (hype, violates doctrine):** unshakeable, absolute, lethal, dominance, world-class, cutting-edge, innovative, game-changing, aggressive (as hype), "market takeover".

**Anchor every claim to a number:** revenue, LTV/CAC, payback, pipeline, conversion-tied-to-revenue, 90-day exit criteria. No claim without a metric or a named mechanism.

**Examples of the tightening:**
| Gemini (hype) | BAZ (operator) |
|---|---|
| "build unshakeable market leaders" | "build market leaders on a revenue forecast, not a hope" |
| "absolute conversion" | "conversion tied to pipeline and payback" |
| "aggressive execution / calculated market takeovers" | "data-backed positioning + execution with named owners + 90-day exit criteria" |
| "We don't chase the market. We engineer its direction." | keep — it's architectural, not hype |

## 3. The triadic framework (looted, renamed)

1. **Precision Intelligence** — data-driven market mapping, predictive modeling, competitor vulnerability audits.
2. **Striking Aesthetics** — frictionless UI/UX, performance-first web (sub-1.5s LCP), brand identity as a weapon.
3. **Measured Execution** (was "Aggressive Execution") — campaigns tied to revenue, 90-day plans with named owners/budgets/exit criteria.

## 4. The 8 content templates (looted)

### T1 — Homepage Hero
```
# [HEADLINE: 4-8 words, architectural]

[Subheadline: 15-25 words — value prop, revenue-anchored]

[CTA: action verb + noun — "Initiate Sequence", "Book the growth call"]
```

### T2 — Philosophy / Belief
```
## [2-4 word section title]

[1-2 sentence bold claim, revenue-anchored]
[2-4 sentences: the why]
[2-4 sentences: the how — mechanism]
[1 sentence tagline]
```

### T3 — Service / Capability
```
## [SERVICE NAME]
[1-sentence positioning: what + who]
[2-3 paragraphs: capabilities + outcomes]
### Capabilities:
- [outcome-focused]
- [technical detail]
- [strategic advantage]
### Outcome:
[1-2 sentences, measurable]
[CTA]
```

### T4 — Case Study  ⚠️ doctrine: no fabricated metrics
```
# [CLIENT / "Category Leader"]: [RESULT IN NUMBERS — real only]
**Industry / Objective / Timeline / System deployed**
## The Challenge
## The Architecture
## The Deployment
## The Results
- [real metric: "+340% conversion in 90 days"]
- [real metric: "$2.4M pipeline"]
[CTA]
```
> Composite case studies MUST be flagged `placeholder: true` until real metrics land.

### T5 — Insights / Blog
```
# [benefit-driven headline, 8-12 words]
**Meta description:** 150-160 chars
**Read time:** X min
## [problem/question]
## [framework/solution]
### [principle 1/2/3]
## [implementation protocol — 3-5 steps]
## [the bottom line]
[CTA]
```

### T6 — Job / Career
```
# [ROLE]
**Location / Department / Reports to**
## The Mission
## The Architecture (responsibilities)
## The Operator (qualifications)
## The Infrastructure (stack, benefits)
## Deployment Protocol (how to apply)
[CTA: "Transmit Application →"]
```

### T7 — FAQ
```
# FREQUENTLY ASKED QUESTIONS
## [question]
[2-4 sentence answer, factual, no fluff]
...
**Still have questions?** [Portal CTA]
```

### T8 — 404
```
# SYSTEM ERROR 404
Page not found. Recalibrating navigation.
## Navigation Protocols:
- [Return to Home →](/)
- [Explore Services →](/services)
- [Transmit a Request →](/contact)
```

## 5. AI generation system prompt (reconciled)

```
You are the BAZ Content Engine for THE MARKETING AGENCY. Generate
high-converting, architecturally precise marketing content.

BRAND: THE MARKETING AGENCY · Midnight Terminal dark · senior-partner model.
VOICE: architectural precision (systems, deploy, engineer, protocol) — NO hype
(unshakeable, absolute, lethal, dominance, world-class, cutting-edge).
ANCHOR: every claim to revenue / LTV / CAC / payback / pipeline / 90-day exit.
DOCTRINE: revenue not vanity · proof beats promises · no fabricated metrics
(flag composites placeholder:true).

RULES:
1. Active voice, direct statements, measurable outcomes.
2. Hierarchy: H1 → H2 → H3 → body → bullets.
3. Every claim backed by logic, data, or a named mechanism.
4. Readability: grade 8-10. Avg sentence ≤25 words. Paragraph ≤4 sentences.
5. CTA density: 1 per 150-300 words.

OUTPUT: Markdown + metadata (title, meta desc, OG) + component mapping + CTA placement.
```

## 6. Page inventory (looted — gaps to add to the empire site)

**Already live (P0):** `/` home, `/about`, `/services` (+`[slug]`), `/pricing`, `/methodology`, `/contact`, `/case-studies` (+`[slug]`), `/insights` (+`[slug]`), `/industries` (+`[slug]`), `/vs-others`, `/stance`, `/selected`, `/become-an-operator`, `/our-story`, `/brandbook`, `/loop`, `/pulse`, `/marketing-hub`, `/book`, `/privacy`, `/terms`.

**Gaps to add (from Gemini inventory):**
- **P1:** `/faq` (objection handling), `/thank-you` (post-submit).
- **P2:** `/careers` (+`[slug]`), `/resources` (downloadables), `/partners` (referral).
- **P3:** `/press`, `/stack` (tech partnerships), `/events` (+`[slug]`), `/academy`.
- **System:** custom `/404` + `/500` (branded error pages).

## 7. Content gaps to fill (the real work)

- **Testimonials (10, all `placeholder: true`)** — need REAL client quotes. Use T4 discipline: no fabrication. Provide real ones → format + flip `placeholder: false`.
- **Case studies (12, composite)** — need REAL metrics. Use T4. Provide real data → write + flip flag.
- **New pages (FAQ, 404, thank-you, careers)** — generate with the templates above + the system prompt.