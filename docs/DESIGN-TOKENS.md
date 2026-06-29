# BAZ — Design Tokens

The visual language of the site, extracted from the hero (`components/sections/Hero.tsx`),
`tailwind.config.ts`, and `app/globals.css`. Use these values when adding new sections so
they sit visually inside the same system instead of inventing new ones.

> Source of truth: `docs/BRAND-BRIEF.md` (voice), this file (visual system).

---

## Typography

| Role | Font | Size | Tracking | Line height |
|---|---|---|---|---|
| Display `h1` (hero) | Fraunces (display) | `clamp(3.5rem, 7vw, 6rem)` | `-0.04em` | `0.95` |
| Display XL | Fraunces | `clamp(2.75rem, 5.5vw, 4.5rem)` | `-0.035em` | `1.0` |
| Display L (`h2` hero teaser) | Fraunces | `clamp(2rem, 4vw, 3rem)` | `-0.03em` | `1.05` |
| Display M | Fraunces | `clamp(1.5rem, 2.5vw, 2rem)` | `-0.02em` | `1.15` |
| Body lead | Inter | `clamp(1.125rem, 2vw, 1.5rem)` | normal | `leading-relaxed` |
| Body | Inter | `15–16px` | normal | normal |
| Eyebrow | JetBrains Mono | `11px` uppercase | `0.18em` | normal |
| Meta | JetBrains Mono | `10–12px` uppercase | `0.15–0.18em` | normal |

Fonts are self-hosted in `public/fonts/` via `next/font/local`. CSS variables: `--font-inter`,
`--font-fraunces`, `--font-mono`. Loaded in `app/layout.tsx`.

## Colors

| Token | Value | Use |
|---|---|---|
| `--c-paper` | `#f5f1ea` | Section background (paper sections) |
| `--c-paper-50` | `#faf7f1` | Lightest card surface |
| `--c-paper-100` | `#f0ebe0` | Card surface, soft divider |
| `--c-paper-200/300` | tints | Hover surface, accents on dark |
| `--c-ink-900` | `#0e0e0e` | Headings, dark sections, primary CTA bg |
| `--c-ink-800` | `#1a1a1a` | Hover on dark sections |
| `--c-ink-600/500/400` | mid-greys | Body copy, meta text, dividers |
| `--accent` | `#ff3b2f` | Eyebrow dot, primary CTAs, gradient text |
| `--accent-600` | `#e0281c` | CTA hover |
| `--accent-700` | `#b81f15` | Deeper hover |
| `--warning` | yellow | Status badge bg (paper section) |
| `--success` | green | Bullet markers, status |

Tailwind aliases: `bg-paper`, `text-ink-900`, `text-paper-300`, `border-paper/10`, etc.

## Spacing

- Section padding: `py-20 md:py-32` (vertical) inside `container mx-auto`.
- Hero specific: `pt-16 pb-20 md:pt-24 md:pb-32`.
- Inter-block gaps (hero convention): `mt-6` (eyebrow→headline), `mt-10` (headline→CTA row),
  `mt-12` (CTA→trust strip), `mt-16 md:mt-20` (trust→stat grid), `mt-20` (stat→demo).
- Copy widths: `max-w-5xl` for hero column, `max-w-3xl` for lead paragraph.
- Section grids: `grid lg:grid-cols-12 gap-10` (12-col with 10-unit gap).

## Section tones

Three reusable values via `<Section tone="...">`:

| Tone | Background | Heading color | Notes |
|---|---|---|---|
| `paper` | `#f5f1ea` | `text-ink-900` | Default. Most sections. |
| `white` | `#ffffff` | `text-ink-900` | Used for visual breathing between paper sections. |
| `ink` | `#0e0e0e` | `text-paper` | Reserved for KPI bands, CTAs, framework callouts. Pair with `text-paper-300/400`. |

## Components

- `<Button variant="secondary|outline|ghost">` — all use h-14 px-7 on the hero. Rounded-full.
- `<Magnetic strength={0.3}>` — wrap the primary CTA only. Pulls toward cursor.
- `<Eyebrow tone="light">` — eyebrow on dark sections.
- `<SectionHeading>`, `<SectionLede>` — share the paper/ink tone with the parent section.
- `<Reveal>` / `.reveal` class — fade-up on scroll, wired through `ScrollReveal` in `app/layout.tsx`.
- `<Cursor />` — global custom cursor; pairs with `data-cursor="cta"` on hover regions.

## CTAs

Primary pattern (in order of visual weight):

1. **Primary** — `bg-accent text-white hover:bg-accent-600 shadow-soft hover:shadow-lift hover:-translate-y-0.5`
2. **Outline** — `border-ink-200 hover:border-ink-900 hover:bg-paper`
3. **Ghost** — `hover:bg-ink-100` (no border)

All buttons: rounded-full, h-14, px-7, `font-medium`, `transition-all duration-200`.

## Decorative layers

- `bg-grid` — fine grid pattern with `radial-gradient(black → transparent)` mask.
- `bg-mesh` — soft gradient mesh.
- `bg-grain` — paper texture (used on hero root).

Layer recipe: `bg-grid opacity-50` over `bg-mesh opacity-90` over `bg-paper` root.

## Stat grid (recurring pattern)

```jsx
<div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100">
  {stats.map((s) => (
    <div key={s.l} className="bg-paper p-6 md:p-8">
      <p className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em]">{s.v}</p>
      <p className="mt-2 font-mono uppercase tracking-[0.18em] text-[11px] text-ink-500">{s.l}</p>
    </div>
  ))}
</div>
```

The hairline-divider trick: 1px gap on a colored bg, each cell gets `bg-paper`.

On dark sections, swap to `gap-px bg-paper/10` + `bg-ink-900` cells + `text-paper-300/400` labels.

## Eyebrow pattern

```jsx
<p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-6 reveal inline-flex items-center gap-2">
  <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
  Now booking Q3 — 2 senior-partner spots left
</p>
```

## Motion

- Scroll reveal: `.reveal` class → `ScrollReveal` (top-level wrapper in `app/layout.tsx`).
- Magnetic CTA: `<Magnetic strength={0.3}>` only on the primary button.
- Pulse dot: `animate-pulse-dot` on status indicators.
- Custom cursor: `<Cursor />` in `app/layout.tsx`, respect `prefers-reduced-motion`.

## Dark section palette

When using `tone="ink"`, swap all paper tokens to ink equivalents:

| Light value | Dark equivalent |
|---|---|
| `bg-paper` | `bg-ink-900` |
| `text-ink-900` | `text-paper` |
| `text-ink-600` | `text-paper-300` |
| `text-ink-500` | `text-paper-300` |
| `text-ink-400` | `text-paper-400` |
| `bg-ink-100` divider | `bg-paper/10` divider |
| `border-ink-100` | `border-paper/10` |

---

Keep this file in sync with `tailwind.config.ts` and `app/globals.css`. If you add a new token
to the build, document it here.