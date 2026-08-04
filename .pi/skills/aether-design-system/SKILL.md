---
name: aether-design-system
description: Enforces the BAZ Midnight Terminal design system (monochrome base + cyan #22D3EE functional signal + gold signature mark) when modifying BAZ frontend code. Square corners (rounded-full only for pills/badges), Inter + JetBrains Mono, Fibonacci spacings/durations. Reference app/color-layer.css for the seed.
---

# Midnight Terminal Design System

The BAZ brand is **monochrome + functional colors + signature gold where appropriate**.
This is the ONLY design system for BAZ frontend code. The old violet `#8b5cf6` /
`hsl(270,85%,72%)` Æther accent is RETIRED — never reintroduce it.

## When to Use
- Any edit to `app/globals.css`, `app/aether-theme.css`, `app/aether-monochrome.css`, `app/color-layer.css`, or `tailwind.config.ts`
- Any new component, page, or layout file
- Any modification to existing components in `components/`
- Any color, spacing, radius, or typography choice

## Source of Truth (CSS cascade — later wins)
1. `app/globals.css` — Stitch token mapping (`--brand`, semantic tokens, `.text-gradient`, `.nav-link`)
2. `app/aether-theme.css` — surface layers, type scale, component styles
3. `app/aether-monochrome.css` — monochrome silk background
4. `app/aether.css` — Æther (Lovable) utilities
5. `app/contrast-layer.css` — revertible contrast layer
6. `app/color-layer.css` — **imported LAST → always wins. The brand seed lives here.**

## Brand tokens (canonical — do not drift)
| Role | Token | Value |
|---|---|---|
| Canvas / base | `--ink`, `--background` | midnight near-black `oklch(0.04 0 0)` (`#020617` family) |
| Surfaces / text / borders | `--ink-0`…`--ink-1000`, `--panel`, `--muted-foreground`, `--border` | **monochrome** greyscale ramp (oklch, 0 chroma) |
| Functional signal | `--brand` | **cyan `#22D3EE`** (links, focus ring, nav underline, selection, eyebrow, key metrics) |
| Depth (secondary) | `--brand2` | monochrome grey `oklch(0.7 0 0)` (canonical indigo `#818CF8` reserved, not active) |
| Success | `--success` | green `#10B981` (metrics only, sparingly) |
| Primary CTA | `--primary` | white-on-ink (`bg-white text-ink`) — the dominant button |
| Signature mark | favicon `public/favicon.svg` | gold metallic gradient `#F7E3A8→#C29B5B→#8C6A30` on midnight — **the only place gold appears** |

The whole public site follows **one seed** in `color-layer.css`:
`--seed-hue: 187; --seed-sat: 90%;` → cyan functional signal. Surfaces stay
monochrome (the ink ramp is greyscale oklch, independent of the seed).

## Key Rules
1. **Colors**: use CSS var tokens (`--brand`, `--ink`, `--ink-700`) or Tailwind classes (`text-brand`, `bg-ink-900`, `ring-brand`). Never hardcode hex values in components. The only hardcoded brand hexes live in `color-layer.css` and `favicon.svg`.
2. **Functional signal = cyan only.** One hue for all signal/accent work: `#22D3EE`. Do not add a second accent hue. Gold is the signature MARK only (favicon), never a CTA or text accent.
3. **Typography**: Inter (body/display), JetBrains Mono (code/metrics/tags). Sizes from the Fibonacci sequence: 8, 10, 13, 16, 21, 34, 55, 89, 144. **No Fraunces, no serif display fonts** — Inter only.
4. **Radius**: square corners by default (`* { border-radius: 0 }`). `rounded-full` ONLY for pills/badges/avatars. No `rounded-full` on buttons or cards. No Fibonacci radii on the public site (the lib `RADIUS` constants exist for IDE components only).
5. **Shadows**: dark, neutral (`oklch(0 0 0 / α)`). No colored glows except a whisper of cyan (`--aether-shadow-glow`) for active/focus states.
6. **Animation**: ≤200ms, fade-in-up only, reduced-motion aware. Fibonacci ms durations (89, 144, 233, 377, 610, 987).
7. **Spacing**: Fibonacci scale (1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144).
8. **Dark mode only.** `data-theme="dark"` / `.dark` on `<html>`. No light mode. 8 luminance layers, all near-monochrome.

## What NOT to do (the retired palette)
- ❌ Never use violet `#8b5cf6` or `hsl(270,85%,72%)` — RETIRED.
- ❌ Never use flat gold `#C8A55A`, `#D4AF37`, `#E7C274`, `#f9a01f` as an accent/CTA. Gold is the favicon signature mark only.
- ❌ Never use orange `#F2572B` / `#ff5b1f`.
- ❌ Never use Fraunces / Playfair Display / serif display fonts.
- ❌ Never use `rounded-full` on buttons or cards (square corners).
- ❌ Never hardcode hex values in components — use tokens.
- ❌ Never use Tailwind v4 `@theme` syntax (we're on v3).
- ❌ Never reintroduce a second accent hue. One signal hue: cyan `#22D3EE`.

## Guardrail
`tests/e2e/stitch-theme.spec.ts` enforces this system in CI:
`--seed-hue: 187`, `--seed-sat: 90%`, midnight background, Inter font, BAZventures
wordmark, and **no gold/violet leaks** (`#8b5cf6`, `#C8A55A`, `#E7C274`, `#ff5b1f`,
`#F2572B` all forbidden in the rendered DOM and favicon). If a change fails this
test, the change is off-brand — fix the change, not the test.