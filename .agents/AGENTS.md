# BAZventures — Agent Context

> Source of truth for the design system: **`DESIGN-SYSTEM.md`** (repo root).
> This file is quick orientation for any agent working in this repo.

## What this project is
- **Brand:** BAZventures (marketing agency). **Product:** the Hub (CRM/ops). **Founder:** Brahim ZERBOUT.
- Next.js 14 App Router + TypeScript + Tailwind v3 + Supabase + Vercel.
- Live: `github.com/brahimamirzerbout/baz-marketing-site` → Vercel project `baz-marketing-site-y6bq`.
- Public site is **Midnight Terminal**: monochrome base + cyan `#22D3EE` functional signal + gold signature mark. The functional signal is ON (seed `187/90`) in one file.

## Design system (current live state)
- **Midnight Terminal.** Color = one file: `app/color-layer.css` (imported **last** in `app/layout.tsx` → always wins). Seed `--seed-hue 187 / --seed-sat 90%` = cyan functional signal ON; base ink ramp is monochrome; gold is the signature mark only (`public/favicon.svg`). State colors have their own hue/sat knobs in the same file.
- **Dark mode only** — `components/ui/ThemeProvider.tsx` uses `forcedTheme="dark"`, `enableSystem={false}`, `themes={["dark"]}`. Light tokens exist (`:root:not(.dark)`) but are dormant; see `DESIGN-SYSTEM.md` §6 before enabling light.
- **Fonts:** Inter (display + body) · JetBrains Mono (code/metrics/tags).
  - NOTE: an earlier "Outfit + Poppins" note was stale — the live font is **Inter** (loaded via `next/font/google` in `app/layout.tsx`, enforced by `tests/e2e/stitch-theme.spec.ts`). Do not reintroduce Fraunces/serif display fonts.
- **Corners:** square (`* { border-radius: 0 }` in `globals.css`); `rounded-full` only for pills/badges/avatars.
  - NOTE: an earlier direction used Fibonacci radii — **superseded**. Do not reintroduce them.
- **6-layer CSS stack:** `globals.css` → `aether-theme.css` → `aether-monochrome.css` → `aether.css` → `contrast-layer.css` → `color-layer.css` (last wins).
- **Logo:** a text wordmark "BAZventures" rendered in `components/layout/Header.tsx` + `Footer.tsx` (a `bg-foreground` "B" square + wordmark). Legacy SVGs in `public/logo/` are kept for `/brandbook` only.
- **Rule:** tokens, not hexes. Use semantic Tailwind classes (`text-foreground`, `bg-background`, `text-brand`, `bg-accent`, `border-border`, `text-success`, …) → tokens → `color-layer.css`. Never hardcode color in components.

## Backend / data
- Database: better-sqlite3 (local) → Supabase (production). Types: `lib/database.types.ts`. Client: `lib/supabase-client.ts`.
- AI: Gemini (primary).
- Auth: JWT + cookies, no sessions.

## What NOT to do
- Do NOT hardcode color hexes in components — use tokens.
- Do NOT use Fraunces / Playfair / serif display fonts — the live font is **Inter** (+ JetBrains Mono). (The earlier "Outfit + Poppins / do not use Inter" note was stale and contradicted the e2e.)
- Do NOT use Fibonacci radii — corners are square (only `rounded-full` for pills).
- Do NOT re-enable gold `#C8A55A` / `#E7C274` / orange `#F2572B` ad-hoc — all color flows through `color-layer.css`.
- Do NOT switch to Tailwind v4 `@theme` syntax (the project is on v3).
- Do NOT enable light mode piecemeal — the dark UI kit (glass, M2/M3 overlays) is deep; plan it per `DESIGN-SYSTEM.md` §6.
- Do NOT fabricate metrics — composite proof is flagged `[replace with real]` until real data lands.
- Do NOT rename the product "the Hub" or the social handles (`@bazagency`, `/baz-agency`, `baz.agency`) — founder confirmed those stay as-is.

## Key files
- `DESIGN-SYSTEM.md` — design system map (read this first).
- `AGENTS.md` — project setup, scripts, Supabase/Vercel/CI details.
- `app/color-layer.css` — the color control layer (expert edits here).
- `tailwind.config.ts` — tokens → Tailwind classes, type scale, square radii.
- `lib/site.ts` — brand name (BAZventures), product (the Hub), socials.
- `components/ui/ThemeProvider.tsx` — dark-only theme config.