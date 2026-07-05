# BAZventures — Design System

The public site is **black & white by design**. Color is a single, deliberate layer an expert adds later — never a crutch. This document is the map of the foundation: the token architecture, the shade ramps, the type scale, the mode stance, and the one file that controls color.

> **Brand:** BAZventures · **Product:** the Hub · **Founder:** Brahim ZERBOUT
> **Mode:** dark-only (pure darkness — see §6) · **Corners:** square (only `rounded-full` for pills) · **Fonts:** Outfit / Poppins / JetBrains Mono

---

## 1. The one thing to know first
**Color is controlled by a single file: `app/color-layer.css`.** It is imported **last** in `app/layout.tsx`, so it always wins. To re-add color, change two numbers there:

```css
--seed-hue: 187;  --seed-sat: 90%;   /* electric cyan  */
--seed-hue: 42;   --seed-sat: 85%;   /* stitch gold    */
```

The seed recolors **everything** coherently: the primary ramp, the neutral ramp, borders, the Aether dark-surface ramp, the text ramp, and the branding gradients/glow. Functional **state** colors (success/warning/danger/info) have their own hue/sat knobs in the same file. One file, two numbers for the brand — zero rework elsewhere.

---

## 2. The 4-layer CSS architecture
Imported in this order in `app/layout.tsx` (last wins on equal specificity):

| # | File | Role |
|---|---|---|
| 1 | `app/globals.css` | Semantic Tailwind-compat tokens (`--brand`, `--accent`, `--background`, `--foreground`, …), type vars, global reset (`* { border-radius: 0 }`), base element styles, `.text-gradient`. |
| 2 | `app/aether-theme.css` | "The Beauty of Darkness" — the Aether darkness ramp, text ramp, spacing/typography/radius/blur/shadow/z/motion (all Fibonacci), glass panels, M2/M3 utilities, print rules. **Hardcoded `hue 42` in its `:root`** — overridden by layer 4. |
| 3 | `app/aether-monochrome.css` | The Æther algorithmic token system: the **seed** (`--seed-hue/sat/lum`), the derived `--color-primary-*` and `--color-neutral-*` ramps, semantic aliases (`--fg/--bg/--border/…`), plus a `:root:not(.dark)` light block (disabled — see §6). |
| 4 | `app/color-layer.css` | **The control layer (imported last → wins).** Locks the seed to greyscale, drives the Aether ramp + gradients + glow from the seed, neutralizes state colors, and exposes the expert knobs. |

**Rule:** never hardcode color in components. Use the Tailwind semantic classes (`text-foreground`, `bg-background`, `text-brand`, `bg-accent`, `border-border`, `text-success`, …) which resolve to these tokens. The only file that should define color values is `color-layer.css`.

---

## 3. The seed system
One seed (`--seed-hue`, `--seed-sat`, `--seed-lum`) derives the entire palette via HSL math. Change the seed → rebrand the world. Currently `0 / 0% / 50%` = pure greyscale.

- `--color-primary` and `--color-primary-5…90` — lightness ramp from the seed (sat follows `--seed-sat`).
- `--color-neutral-0…100` — seed-tinted grays at very low saturation (the structural palette).
- `--aether-l0…l7` — 8 darkness layers (l0 = the void, l7 = active), hue from `--seed-hue`, low sat.
- `--aether-text-primary/secondary/tertiary/ghost` — 4-level text hierarchy on darkness.
- `--aether-gradient-*` + `--aether-shadow-glow` — branding gradients/glow, seed-driven (neutral now).

In B&W mode the whole stack is a coherent grayscale. The expert sets hue/sat and every layer warms/cools together.

---

## 4. Shade ramps (current B&W values)
All resolve to neutral grays today (seed `0/0`):

| Ramp | Range | Used for |
|---|---|---|
| `--color-neutral-*` | 0 (99%) → 100 (4%) | page bg, surfaces, borders, text |
| `--color-primary-*` | 5 (95%) → 90 (12%) | brand fills, accents, focus rings |
| `--aether-l0…l7` | 3.9% → 42% | dark surface elevation (void → active) |
| `--aether-text-*` | 98% / 65% / 45% / 30% | text hierarchy on darkness |
| `--g0…--g100` | legacy grayscale aliases | backward-compat (see §9) |

**Known gap (§9):** `--g55…--g100` are hardcoded hex (`#adb5bd` → `#ffffff`), not seed-driven. They're light-mode grays, dormant in dark mode. Seed-drive them when light mode is enabled.

---

## 5. Typography
**Fonts** (loaded in `app/layout.tsx` via `next/font`):
- **Outfit** — display/headings (`font-display`)
- **Poppins** — body/UI (`font-sans`)
- **JetBrains Mono** — code, metrics, tags, labels (`font-mono`)

**Scales in `tailwind.config.ts`** (three coexist — see §9 for consolidation):
- `display-2xl / xl / lg / md` — fluid `clamp()` headings (**preferred for new work**)
- `hero` / `section` — fluid H1/H2
- `fib-micro…fib-xxl` — legacy fixed-px Fibonacci scale (being phased out)
- Aether also defines `--aether-text-*` px sizes (Fibonacci) in `aether-theme.css`

**Rule:** headlines bold + tight tracking (`tracking-[-0.02em]`), body clean/legible, mono for numbers/tags/system cues. Authority, not trend-chasing.

---

## 6. Light & dark mode
**The site is dark-only by design.** `components/ui/ThemeProvider.tsx` sets `forcedTheme="dark"`, `enableSystem={false}`, `themes={["dark"]}`. `app/layout.tsx` hardcodes `className="… dark"` + `data-theme="dark"` + a pre-paint script. `aether-theme.css` is "Pure dark mode. No light mode. Only darkness."

**Light tokens already exist** but are dormant: `aether-monochrome.css` has a `:root:not(.dark)` block that reverses the palette. To enable a real light mode later:
1. In `ThemeProvider.tsx`: drop `forcedTheme`, set `enableSystem={true}`, add `"light"` to `themes`.
2. Remove the forced `dark` class + pre-paint script in `layout.tsx`.
3. Audit the dark-only utilities in `aether-theme.css` (glass panels, M2 "white on dark" overlays, gradient-void) — they assume darkness and will need light equivalents.
4. Seed-drive `--g55…--g100` so the light ramp follows the brand.

This is an expert task — the dark UI kit is deep. Don't enable light mode piecemeal.

---

## 7. Non-negotiable rules
- **No hardcoded color in components.** Use semantic Tailwind classes → tokens → `color-layer.css`.
- **Square corners everywhere** (`* { border-radius: 0 }`); `rounded-full` only for pills/badges/avatars.
- **B&W by default.** Any new accent must flow through `--brand`/`--accent` (seed-driven) or the state knobs — never a literal hex.
- **No fabricated metrics.** Composite proof points are flagged `[replace with real]` until real data replaces them.
- **Functional state colors (emerald/amber/red) are kept in the internal Hub/admin/console** — they're affordances, not branding. Don't neutralize them there.

---

## 8. File map
```
app/layout.tsx              # imports the 4 CSS layers in order; forces dark; fonts
app/globals.css             # layer 1 — semantic tokens, reset, base styles
app/aether-theme.css        # layer 2 — darkness kit (ramp, glass, M2/M3, motion)
app/aether-monochrome.css   # layer 3 — seed system + ramps + (dormant) light block
app/color-layer.css         # layer 4 — THE control layer (expert edits here)
tailwind.config.ts          # tokens→Tailwind classes, type scale, square radii
components/ui/ThemeProvider.tsx  # next-themes, dark-only
lib/site.ts                 # brand: name=BAZventures, product=the Hub, socials
brand/                      # documented brand (colors.md, typography.md, voice.md, tokens.json)
public/favicon.svg          # B&W mark (dark squircle, light B)
```

---

## 9. Known gaps — recommended next steps for the expert
1. **Vestigial aether UI kit** (`components/ui/aether-index.tsx`, `components/primitives/*`, `components/structure/*`, `components/DesignSystemChecklist.tsx`) — currently has **zero importers** (dead code) and was the main source of hardcoded gold. Decide: revive under the seed system, or remove.
2. **Consolidate the type scale** — pick one fluid scale (`display-*` + `hero`/`section`) and retire `fib-*` + `--aether-text-*` px sizes after auditing usage.
3. **Seed-drive `--g55…--g100`** (hardcoded light grays) so the light ramp follows the brand when light mode is enabled.
4. **`/brandbook`** still shows the old orange/gold swatch palette — regenerate it from the final chosen palette.
5. **Internal Hub/admin** still says "BAZ" in places and keeps functional status colors — a separate product-names + palette pass (out of scope of the public rebrand).
6. **Social handles/URL** (`@bazagency`, `/baz-agency`, `baz.agency`) intentionally left as-is per founder decision — not a code concern.

---

*Diagnose first, architect the system, ship it, hold the line on what moves revenue.*