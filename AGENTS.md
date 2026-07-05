# BAZventures — Next.js + Supabase + Vercel

**Brand:** BAZventures · **Product:** the Hub · **Founder:** Brahim ZERBOUT  
**Design system source of truth:** `DESIGN-SYSTEM.md` (read it first).

## Project Setup
- GitHub repo: `baz-marketing-site` (remote: `origin`)
- Next.js 14 App Router + TypeScript + Tailwind CSS
- Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions)
- Vercel (Analytics, Speed Insights, OG Images, Cron, Edge Runtime)
- CI/CD via GitHub Actions (test → deploy preview → deploy production)

## Design — Black & White Color System
- **B&W by default.** Color is a single expert-editable layer: `app/color-layer.css` (imported **last** in `app/layout.tsx` → always wins). Set `--seed-hue`/`--seed-sat` there to recolor the whole site (e.g. cyan `187/90%`, gold `42/85%`). One file, two numbers.
- **Dark mode only** — `ThemeProvider` forces `dark` (`forcedTheme="dark"`, `enableSystem={false}`). Background/text are seed-driven neutrals (currently greyscale).
- **4-layer CSS stack:** `globals.css` → `aether-theme.css` → `aether-monochrome.css` → `color-layer.css` (last wins). Full map in `DESIGN-SYSTEM.md`.
- **Fonts:** Outfit (display), Poppins (body), JetBrains Mono (code/metrics).
- **Square corners everywhere** (`* { border-radius: 0 }`); `rounded-full` only for pills/badges.
- **Tokens, not hexes:** never hardcode color in components — use semantic Tailwind classes (`text-foreground`, `bg-background`, `text-brand`, `bg-accent`, `border-border`) → tokens → `color-layer.css`.

## Brand Assets (B&W)
- **Favicon:** `public/favicon.svg` — B&W mark (dark squircle, light "B").
- **Logo (live):** a **text wordmark** rendered in `components/layout/Header.tsx` + `Footer.tsx` — a `bg-foreground` "B" square + "BAZventures" in Outfit. B&W, token-driven, auto-recolors via `--brand` when the seed is set.
- **Legacy logo SVGs** in `public/logo/` (`baz-mark*.svg`, `baz-wordmark*.svg`) are retained for the `/brandbook` reference page but are **not** used by the live header/footer.
- **OG images:** `/og`, `/stance-og`, `/case-studies-og`, `/methodology-og` — neutral palette, "BAZventures" wordmark.
- **No gold/accent color** anywhere on the public site until the expert sets the seed in `color-layer.css`.

## Key Scripts
- `npm run dev` — local dev (port 3000)
- `npm run build` — production build
- `npm test` — Playwright E2E tests
- `npm run supabase:types` — regenerate TS types from Supabase
- `npm run supabase:migrate` — push migrations to Supabase
- `npm run deploy` — deploy to Vercel

## Supabase
- Project: `uyqgmdrzyapbbvmaumvk.supabase.co`
- Migrations: `supabase/migrations/`
- Edge Functions: `supabase/functions/`
- Types: `lib/database.types.ts`
- Client: `lib/supabase-client.ts` (SSR + Admin + Anonymous)
- Realtime: `lib/realtime.ts` (client-side hooks)

## Vercel
- Project: `baz-marketing-site-y6bq` (team: brahimamirzerbout-9700s-projects)
- Analytics + Speed Insights in layout
- Dynamic OG images at `/og`
- Cron jobs: sitemap (daily), audit (weekly)
- Edge runtime: `/api/services`, `/api/health`

## CI/CD (GitHub Actions)
- `.github/workflows/deploy.yml`
- PR → typecheck + lint + deploy preview + E2E tests
- Push to main → deploy production + Supabase migrations + health check
