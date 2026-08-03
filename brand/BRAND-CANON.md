# BAZ — Brand Canon (the one source of truth)

> **Status:** CANONICAL. This file supersedes every other brand description across
> `baz/`, `marketing-hub/`, `baz-html-sites/`, `brand-aether/`, and `baz-agent-system/`.
> Where any other file conflicts with this one, **this file wins.** Edit here, then
> propagate. Last updated: 2026-07-30.
>
> **Provenance:** the cyan decision was previously cited to
> `~/Desktop/BAZventures-Public-Site-Canonical.md §1` — that file no longer exists
> (dead citation). This canon replaces it as the durable home of the decision.

---

## 1. The one company

**BAZ** — the senior-partner marketing agency founded by Brahim ZERBOUT.
Boutique, senior-only, no junior pods, direct partner access. Geography: MENA, EU, US.
Pricing: project + retainer, never SaaS subscriptions.

There is **one company**. The other names that appeared across sessions are
**roles, not companies**, and are folded in as follows:

| Name | Reality | Role under BAZ |
|---|---|---|
| **BAZ** | The company | The agency — the one buyer-facing brand |
| **Marketing Hub / Kraken** | Internal tool | The delivery weapon BAZ uses to ship the 45-day system. **Internal, not marketed** this quarter (per `decision.md`) |
| **ÆTHER** | Design system | The internal design-system / token layer (Midnight Terminal). **Not a separate buyer-facing brand.** Demoted from "company" to "platform" |
| **Zerbout Digital** | Algerian market site | A BAZ **MENA vertical** — a market-specific front door, same company, same canon. Not a separate brand |
| **AetherGen** | Generator | Internal tooling inside the ÆTHER platform. **Parked** until the un-park trigger is met |

**One company. One accent. One canon.**

---

## 2. The one accent decision (resolves the cyan/gold drift)

| Role | Token | Value | Rule |
|---|---|---|---|
| **Functional signal (the accent)** | `--brand` / `--accent` | **Cyan `#22D3EE`** | The ONE hue for all signal/accent work: links, focus rings, nav underline, selection, eyebrows, key metrics, CTAs |
| **Signature mark** | favicon only | Gold gradient `#F7E3A8 → #C29B5B → #8C6A30` | **Favicon / signature lockup ONLY.** Never a CTA, never text accent, never a surface fill |
| **Depth (secondary)** | `--brand2` | Monochrome grey `oklch(0.7 0 0)` | Canonical indigo `#818CF8` is **reserved, not active** on the public site |
| **Success** | `--success` | `#10B981` | Metrics only, sparingly |
| **Base / canvas** | `--ink`, `--background` | Midnight `#020617` family (`oklch(0.04 0 0)`) | Dark mode only. 8-layer luminance, near-monochrome |

**The rule:** cyan is the one signal hue. Gold is the favicon mark only.
This is already enforced in the `baz/` flagship by `tests/e2e/stitch-theme.spec.ts`
(`--seed-hue: 187`, no gold/violet leaks). The drift lives in `marketing-hub/` and
`brand-aether/`, which name their theme "Midnight Terminal" but use gold `#C29B5B`
as the accent. **That is the bug.** The fix is a one-direction sweep:

### Propagation order (do this, in sequence)
1. `baz/` flagship — **already correct. No change.** (This is the reference implementation.)
2. `marketing-hub/src/lib/themes.ts` — the theme labeled `"Midnight Terminal"` (id `hub`): set `brand: "#22D3EE"`, demote gold to favicon-only. Rename the gold-accent variant if a gold theme is still wanted for a *specific* context (it is NOT the default).
3. `marketing-hub/src/lib/roi-brand.ts`, `documents/templates.ts`, `agencyTypes.ts`, `db/index.ts` — replace `#C29B5B` accent usage with `#22D3EE`; keep gold only in favicon/OG-mark paths.
4. `baz-html-sites/brand-aether/brand/BRAND_GUIDE.md` — the `hub` theme row: accent → `#22D3EE`; rewrite §3 so gold is "signature mark only," matching this canon.
5. `baz-html-sites/agency-site/`, `sales-hub/` — align to cyan signal + gold favicon.
6. `baz-agent-system/BAZ-Agent-System-Prompt.md` — **already correct** (cyan `#22D3EE`). Regenerate mirror after this canon lands.

**Retired palette (never reintroduce):** violet `#8b5cf6` / `#6C3FE0` · flat gold `#C8A55A` / `#E7C274` / `#f9a01f` (as accent) · orange `#F2572B` · "Stitch Gold" direction (superseded).

---

## 3. Identity

- **Name:** BAZ (with the BAZventures public fork — Midnight Terminal + BAZventures).
- **One-liner:** *BAZ is the senior-partner marketing agency for teams that want growth as a forecast, not a hope.*
- **Founder line:** *The operator you call when marketing needs to behave like a strategy team that actually ships.*
- **Domains:** primary `baz` (canonical) · `zerbout.digital` (MENA vertical) · `aether.digital` (platform, internal).

## 4. Typography & form

- **Fonts:** Inter (body/display), JetBrains Mono (metrics/tags/code). No serif display.
- **Corners:** square by default. `rounded-full` only for pills/badges/avatars.
- **Motion:** ≤200ms, fade-in-up only, reduced-motion aware. Fibonacci ms (89/144/233/377/610/987).
- **Spacing:** Fibonacci (1/2/3/5/8/13/21/34/55/89/144).

## 5. Voice

Senior, precise, confident. Short, load-bearing sentences. Technical only when it
increases force. Operator-grade, not academic. Never hype, never buzzword salad,
never "we help businesses grow." Lexicon: plan, ship, architect, diagnose,
instrument, route, close, embed, hold the line.

## 6. Enforcement

- CI: `tests/e2e/stitch-theme.spec.ts` in `baz/` enforces `--seed-hue: 187`, no gold/violet leaks. **Port this test to `marketing-hub/`.**
- Any new site/repo: import the design tokens from `baz/brand/design-tokens.yml` — do not redefine the accent.
- If a change fails the theme test, the change is off-brand. **Fix the change, not the test.**

---

## Change log
- 2026-07-30 — Canon created. Resolves the cyan-vs-gold drift: **cyan `#22D3EE` is the one signal hue; gold `#C29B5B` is favicon-mark only.** Folds BAZ / Marketing Hub / ÆTHER / Zerbout Digital / AetherGen into one company with role assignments. Replaces the dead `BAZventures-Public-Site-Canonical.md` citation.