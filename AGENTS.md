# BAZ Marketing Agency — Next.js + Supabase + Vercel

## Project Setup
- GitHub repo: `baz-marketing-site` (remote: `origin`)
- Next.js 14 App Router + TypeScript + Tailwind CSS
- Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions)
- Vercel (Analytics, Speed Insights, OG Images, Cron, Edge Runtime)
- CI/CD via GitHub Actions (test → deploy preview → deploy production)

## Design — Stitch Gold System
- Brand accent: Gold `#E7C274` / `hsl(42, 85%, 55%)`
- Dark mode only — background `#16130E`, text `#E9E1D8`
- Fonts: Outfit (display), Poppins (body), JetBrains Mono (code)
- Square corners everywhere (only `rounded-full` for pills/badges)

## Brand Assets (Stitch Gold)
- **Favicon**: `public/favicon.svg` — gold squircle (`#C8A55A`), dark "B"
- **Logo marks** (in `public/logo/`):
  - `baz-mark.svg` — gold squircle, dark "B" (for dark backgrounds)
  - `baz-mark-inverse.svg` — dark squircle, gold "B" (for light backgrounds)
  - `baz-wordmark.svg` — gold mark + gold BAZ text (for dark backgrounds)
  - `baz-wordmark-reverse.svg` — gold mark + light BAZ text (for dark backgrounds, higher contrast)
- **Header/Footer**: Use `baz-wordmark-reverse.svg` — gold mark with white text on ink
- **Ghost watermark**: "BAZ" at 4% opacity behind hero/contact sections
- **Patterns**: `public/patterns/mesh-gradient.svg` — gold radial mesh instead of violet
- **OG image**: `public/og/default.svg` — gold accent, Outfit/Poppins, ink background

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
