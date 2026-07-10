# BAZ Marketing Site — Audit Report
**Date:** 2026-07-09  
**Source of truth:** `.kilo/plans/1783600489582-baz-marketing-site-audit.md` + direct code inspection  
**Scope:** Read-only audit. Findings only; no source changes.

---

## Executive Summary

The site has two parallel auth mechanisms (custom `baz_session` cookie + Supabase), an in-memory rate limiter ineffective on Vercel serverless, a stale/unused JSONL lead store conflicting with the SQLite canonical store, and inspector route lists that do not match the actual app tree. Several protected pages have no server-side auth gate. `better-sqlite3` is present but gracefully falls back. The design system has hardcoded hex colors in a few components that violate the token rule. Both `framer-motion` and `motion` are listed in `package.json`, but only `framer-motion` is used.

---

## 1. Auth & Middleware (5 findings)

### 1.1 [HIGH] Middleware accepts forged / expired session cookies
- **File:** `middleware.ts:14-15`
- **Issue:** Middleware checks only whether `baz_session` cookie exists. It does not validate the token via `readSessionFromCookies()` or check `user.role`. A forged or expired token passes the gate.
- **Impact:** Any attacker who can set a `baz_session` cookie bypasses the path protection. The real per-page auth checks should exist, but they are missing on several routes (see §1.2).
- **Fix:** In middleware, call `readSessionFromCookies()` and validate `user.role` before returning `NextResponse.next()`.

### 1.2 [HIGH] Protected pages lack server-side auth guards
- **Files inspected vs. expected `readSessionFromCookies()` call:**
  - `/admin/leads` → **present** ✓
  - `/admin/monitors` → **missing** ✗
  - `/admin/analytics` → **missing** ✗
  - `/admin/integrations` → **missing** ✗
  - `/admin/canva` → **client component**, no server guard ✗
  - `/admin` index → **missing**, but only renders nav tiles (low risk)
  - `/console` → **present** ✓
  - `/dashboard` → **missing** ✗
  - `/portal` → **present** ✓
  - `/portal/client` → public redirect to external Hub
- **Impact:** `/dashboard` exposes all lead data server-side without auth. `/admin/monitors` leaks build health, API health, lead counts, AI spend, and Core Web Vitals.
- **Fix:** Add `readSessionFromCookies()` + role checks to every protected server component.

### 1.3 [MEDIUM] Supabase RLS grants any authenticated user full access
- **File:** `supabase/migrations/00002_rls_policies.sql`, `00004_rls_policies_clean.sql`
- **Issue:** Policies like `USING (true)` allow **any** Supabase-authenticated user to SELECT/UPDATE/DELETE across `leads`, `customers`, `projects`, `invoices`, `feedback`, `ai_jobs`, `audit`, etc. There is no role mapping between the custom `user.role` (`owner|admin|member|client`) and Supabase auth.
- **Impact:** If a Supabase user is created for any reason, they get full read/write on every protected table.
- **Fix:** Map Supabase auth users to custom roles, or restrict Supabase roles to service-tier access only.

### 1.4 [MEDIUM] `/api/auth/me` hardcodes `role: "member"` for Supabase sessions
- **File:** `app/api/auth/me/route.ts:40`
- **Issue:** When a user authenticates via Supabase, the API returns `role: "member"` without consulting the local `users` table.
- **Impact:** Clients relying on this endpoint for RBAC see the wrong role.

### 1.5 [LOW] `baz_user` cookie is client-readable
- **File:** `lib/auth.ts:96-102`
- **Issue:** `COOKIE_USER` (`baz_user`) is set with `httpOnly: false`.
- **Impact:** Client-side JS can read user name, email, role, and team. This is noted as intentional but still exposes PII to the browser.

---

## 2. Rate Limiting (2 findings)

### 2.1 [HIGH] In-memory rate limiter is prod-unsafe on Vercel
- **File:** `lib/rate-limit.ts:8-16`
- **Issue:** `buckets` is a JS `Map` in module scope. On Vercel serverless, each invocation may run on a fresh instance with its own empty `Map`. Limits are effectively per-instance and unenforced at the product level.
- **Impact:** Abusers can exhaust `/api/leads`, `/api/score`, auth routes, etc.
- **Fix:** Use Vercel KV, Upstash Redis, or a similar shared store. Alternatively, move rate limiting to the Edge runtime with a durable store.

### 2.2 [MEDIUM] IP headers are spoofable, no user-id fallback
- **File:** `lib/rate-limit.ts:28-31`
- **Issue:** Trusts `x-forwarded-for` and `x-real-ip` as the rate-limit key. These headers are trivially spoofable by clients unless stripped by a trusted proxy.
- **Impact:** Attacker can rotate source IPs to bypass limits. Authenticated users should key on `user.id`.
- **Fix:** When `req` has an authenticated session, key the bucket on `user.id` instead of IP. If no session, fall back to IP only if it is trusted.

---

## 3. API Routes (3 findings)

### 3.1 [MEDIUM] `/api/score` is POST-only but inspector GETs it → 405
- **File:** `app/api/score/route.ts`, `scripts/quality-inspect.mjs:68`
- **Issue:** The route exports only `POST`. The inspector does an HTTP GET, which returns `405 Method Not Allowed`. The inspector treats non-2xx/non-401 as failures.
- **Impact:** Stale inspector produces false-positive failures and may mask real outages.
- **Fix:** Either add a GET status handler (`{ok:true, method:"POST"}`) or update the inspector to skip POST-only routes.

### 3.2 [LOW] `/api/ai` is a public LLM proxy
- **File:** `app/api/ai/route.ts`
- **Issue:** The endpoint accepts any `prompt` from unauthenticated clients and forwards it to OpenAI, Anthropic, Gemini, or Ollama. Keys live in env and are not leaked to the client bundle. Prompt length is capped at 8000 chars.
- **Impact:** Low risk given the prompt cap and hardcoded provider URLs. However, any client can consume paid LLM quota. `llmStatus()` exposes which keys are configured.
- **Fix:** Add rate limiting or require auth for `/api/ai` if it is not intended as a public proxy.

### 3.3 [LOW] Gemini API key is passed in URL query string
- **File:** `lib/llm.ts:265`
- **Issue:** `callGemini` constructs a URL with `?key=${cfg.key}`. Secrets in URLs may appear in server logs, CDN logs, and proxy traces.
- **Impact:** Key leakage via logs.
- **Fix:** Pass the key in the `x-goog-api-key` header.

---

## 4. Data Layer (5 findings)

### 4.1 [MEDIUM] Dual lead stores cause data divergence
- **Sources:**
  - **Canonical:** `/api/leads` POST + `lib/actions.ts` → SQLite `leads` table via `getDb()`
  - **Dashboard:** `app/dashboard/page.tsx` → `lib/leads-store.ts` → `data/leads.jsonl`
- **Issue:** New leads go to SQLite, but `/dashboard` reads the legacy JSONL file. Nothing writes to JSONL anymore.
- **Impact:** `/dashboard` shows empty or stale data regardless of real lead volume.
- **Fix:** Migrate `/dashboard` to read from the same `getDb()` source used by `/api/leads` and `/admin/leads`.

### 4.2 [MEDIUM] `better-sqlite3` native module is Vercel-incompatible
- **File:** `lib/db.ts:73-91`, `lib/db/pg-worker.js`
- **Issue:** `better-sqlite3` is a native C++ addon. Vercel serverless does not provide a prebuilt binary. The code falls back to an in-memory JSON store (data lost on cold start) or to a Supabase PostgreSQL worker thread.
- **Impact:** In production the DB is either ephemeral (in-memory) or relies on `SUPABASE_DB_URL`. The fallback is acceptable but means data loss if neither sqlite nor Supabase is reachable.
- **Fix:** Prefer Supabase PostgreSQL in production and remove the in-memory fallback once Vercel compatibility is verified.

### 4.3 [MEDIUM] `data/baz.db` is in the working tree
- **File:** `data/baz.db` (binary), `data/baz.db-wal`, `data/baz.db-shm`
- **Issue:** `.gitignore` ignores `data/*.db*`, but it is unknown whether the file is already tracked. A binary database with production data should not exist in the git tree.
- **Impact:** Accidental commit of production data. Large binary in repo bloats history.
- **Fix:** Run `git ls-files data/baz.db`; if tracked, purge with `git filter-repo` or BFG and remove the file. Ensure `.gitignore` covers the whole `data/` directory.

### 4.4 [LOW] Supabase worker thread uses `Atomics.wait` with 30s timeout
- **File:** `lib/db/supabase.ts:50-55`
- **Issue:** `Atomics.wait` sleeps 1s chunks until the worker responds. In Vercel Edge Runtime or strict thread environments this can hang.
- **Impact:** Low, but worth noting for Vercel compatibility audits.

### 4.5 [LOW] Owner bootstrap uses default passwords from env
- **File:** `lib/db.ts:252-253`
- **Issue:** `OWNER_EMAIL` / `OWNER_PASSWORD` default to `owner@baz.agency` / `changeme-on-first-login` even when the envs are unset.
- **Impact:** If someone deploys without setting these envs and the DB is fresh, the owner account is guessable.
- **Fix:** Make `OWNER_PASSWORD` mandatory; refuse bootstrap if unset.

---

## 5. Inspector Accuracy (3 findings)

### 5.1 [MEDIUM] Inspector page list is stale and lists non-existent routes
- **File:** `scripts/quality-inspect.mjs:37-44`
- **Issue:** Lists `/hub`, `/hub/cockpit`, `/hub/triangle`, `/hub/nova` — none exist at `app/hub/`. Lists `/marketing-hub`, `/loop`, `/pulse` which do exist.
- **Impact:** Inspector reports false failures for missing pages.

### 5.2 [MEDIUM] Inspector API list is incomplete
- **File:** `scripts/quality-inspect.mjs:61-64`
- **Issue:** Lists only 9 APIs. Actual `app/api/` tree has 21 route files including `apps`, `books`, `books/query`, `books/[id]`, `cron/audit`, `cron/sitemap`, `data`, `lead-portal/[id]`, `supabase-demo`, `services`, `health`, `auth/login`, `auth/register`, `auth/logout`, `auth/me`, `leads`, `leads/[id]`, `score`, `search`, `feedback`, `ai`, `agents`.
- **Impact:** Inspector claims "All 9 API routes respond" while 12 are untested.

### 5.3 [MEDIUM] Inspector stats diverge from reality
- **Claim:** 60 pages, 66 components (per planner handover).
- **Actual tree (incomplete but larger):**
  - 88 component `.tsx` / `.jsx` files
  - 51 app route files (pages + API routes)
- **Impact:** Inspector output provides misleading coverage numbers.

---

## 6. Code Duplication & Dead Code (3 findings)

### 6.1 [MEDIUM] Both `framer-motion` and `motion` in `package.json`; only `framer-motion` is imported
- **File:** `package.json:35,41`, `components/`, `app/`
- **Issue:** `motion` is listed as a dependency but a full code search found zero `from 'motion'` imports.
- **Impact:** ~50KB+ dead bundle weight.
- **Fix:** Remove `motion` from `package.json`.

### 6.2 [LOW] Duplicate/excluded testimonial file
- **File:** `content/_NEW_TESTIMONIALS.ts`
- **Issue:** `.gitignore` line 58 explicitly excludes `content/_NEW_TESTIMONIALS.ts`. It exists as an empty drop-in. `content/testimonials.ts` contains 9 placeholders.
- **Impact:** The empty file is untracked and harmless but signals an incomplete content workflow.

### 6.3 [LOW] Vestigial `components/ui/aether-index.tsx` and `components/DesignSystemChecklist.tsx`
- **Issue:** DESIGN-SYSTEM.md §9 notes these have zero importers. `aether-index.tsx` imports `framer-motion` and contains hardcoded gold colors.
- **Fix:** Delete or revive under the seed system.

---

## 7. Design System & CSS (4 findings)

### 7.1 [MEDIUM] Hardcoded hex colors violate token rule
- **Components:**
  - `components/analytics/AnalyticsTools.tsx:351,419,434,442,454,469` — `#0e0e10`, `#ececea`, `#ff3b2f`, `#7e7e79`
  - `app/api/auth/register/route.ts:36` — `'#4f7cff'` for new user `color`
- **Fix:** Replace with Tailwind semantic classes (`text-brand`, `bg-background`, etc.) or CSS variable references.

### 7.2 [LOW] `color-layer.css` is not the last import in `layout.tsx`
- **File:** `app/layout.tsx:18-23`
- **Issue:** Comment on line 21 says "imported LAST so it wins", but `aether.css` and `contrast-layer.css` are imported after it.
- **Impact:** `contrast-layer.css` overrides `color-layer.css`. Whether this is intentional is unclear.

### 7.3 [LOW] Hardcoded light-mode grays in `aether-monochrome.css`
- **File:** `app/aether-monochrome.css:56-61,183-188`
- **Issue:** `--g55: #adb5bd` through `--g100: #ffffff` are hardcoded hex values.
- **Impact:** Per DESIGN-SYSTEM.md §9, these are dormant in dark-only mode but will break light-mode branding if it is ever enabled.

### 7.4 [LOW] State colors hardcoded in `globals.css`
- **File:** `app/globals.css:24,41,45-47`
- **Issue:** `--wa: #25D366` (WhatsApp), `--destructive: #FFB4AB`, `--success: #22C55E`, `--warning: #F59E0B`, `--info: #3B82F6`.
- **Assessment:** Acceptable per DESIGN-SYSTEM.md §7 (functional state colors allowed).

---

## 8. Component Accessibility — Primitives (4 findings)

### 8.1 [MEDIUM] `Modal` — missing dialog semantics
- **File:** `components/primitives/Modal.tsx`
- **Issues:**
  - No `role="dialog"` or `aria-modal="true"`
  - No `aria-labelledby` or `aria-describedby`
  - No focus trap
  - No ESC key handler
  - Close button `✕` has no `aria-label`
  - Uses `onClick` backdrop close without keyboard equivalent

### 8.2 [MEDIUM] `Toast` — missing live region
- **File:** `components/primitives/Toast.tsx`
- **Issues:**
  - No `role="status"` or `role="alert"` / `aria-live`
  - Dismiss button has no accessible name
  - Auto-dismiss timer has no pause-on-hover / pause-on-focus

### 8.3 [MEDIUM] `Tooltip` — missing ARIA wiring
- **File:** `components/primitives/Tooltip.tsx`
- **Issues:**
  - No `role="tooltip"`
  - No `aria-describedby` on the trigger element
  - Hover-only; no touch/keyboard equivalent

### 8.4 [MEDIUM] `ContextMenu` — missing menu semantics & keyboard navigation
- **File:** `components/primitives/ContextMenu.tsx`
- **Issues:**
  - No `role="menu"` on menu, no `role="menuitem"` on items
  - No keyboard navigation (arrow keys, Enter, Escape)
  - No focus management / focus trap
  - `e.stopPropagation()` in `handleContext` blocks browser menu but may break assistive tech

### 8.5 [LOW] All primitives violate square-corners rule
- **Files:** `Modal.tsx:36`, `Toast.tsx:47`, `Tooltip.tsx:55`, `ContextMenu.tsx:58`
- **Issue:** AGENTS.md mandates `border-radius: 0` with `rounded-full` only for pills/badges. The primitives use `rounded-[3px]`, `rounded-[8px]`, `rounded-[13px]`, `rounded-[21px]`.

### 8.6 [LOW] No `prefers-reduced-motion` support
- **Issue:** All primitives animate via `framer-motion` transitions without checking `window.matchMedia('(prefers-reduced-motion: reduce)')`.

---

## 9. Transport & Secrets (2 findings)

### 9.1 [LOW] Session `secure` cookie flag is dev-conditional
- **File:** `lib/auth.ts:91`
- **Issue:** `secure: process.env.NODE_ENV === "production"`. In local dev over HTTP, the httpOnly session cookie is sent unencrypted.
- **Impact:** Low (local dev only), but acceptable given standard Next.js patterns.

### 9.2 [LOW] No client-side secret exposure detected
- `SUPABASE_SECRET_KEY` is referenced only in `lib/supabase-client.ts` (server-side). It does not appear in any client bundle.
- LLM keys (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.) are read in `lib/llm.ts` server-side only.
- `.env.local` is gitignored. `.env.example` contains placeholder values only.

---

## 10. LLM / AI (2 findings)

### 10.1 [LOW] Background scoring silently swallows errors
- **File:** `app/api/leads/route.ts:130,168`
- **Issue:** `scoreLeadInBackground(...).catch(() => {})` and inner `try/catch` ignore parse / network errors.
- **Impact:** Operators cannot debug failed scoring.

### 10.2 [LOW] Ollama server URL is unchecked
- **File:** `lib/llm.ts:98`
- **Issue:** `OLLAMA_HOST` from env becomes the fetch target. If an attacker controls it, SSRF could occur.
- **Impact:** Low (env-controlled via Vercel dashboard).

---

## 11. Miscellaneous (4 findings)

### 11.1 [LOW] Root-level `data/baz.db` binary exists
- **Path:** `data/baz.db` (+ `-wal` / `-shm` files)
- **Issue:** Binary SQLite files are in the working tree.
- **Fix:** Confirm they are ignored (`git check-ignore`); if not, purge.

### 11.2 [LOW] Testimonials file has 9 placeholders
- **File:** `content/testimonials.ts`
- **Issue:** Every entry has `placeholder: true`. Inspector already flags this.

### 11.3 [LOW] Observer/admin DB note in `/dashboard` footer is wrong
- **File:** `app/dashboard/page.tsx:374-376`
- **Issue:** Footer says `Stored at data/leads.jsonl`. This store is no longer written to.
- **Fix:** Update footer or migrate the page to the canonical SQLite source.

### 11.4 [LOW] Owner fallback credentials risk
- **File:** `lib/db.ts:252-253`
- **Issue:** Default `OWNER_EMAIL=owner@baz.agency` and `OWNER_PASSWORD=changeme-on-first-login` are seeded if envs are missing.
- **Fix:** Reject bootstrap when `OWNER_PASSWORD` is absent.

---

## Findings by Priority

### HIGH — Address before next deploy
| # | Finding | File(s) |
|---|---------|---------|
| 1.1 | Middleware accepts forged/expired `baz_session` cookies | `middleware.ts:14-15` |
| 1.2 | `/dashboard`, `/admin/monitors`, `/admin/analytics`, `/admin/integrations`, `/admin/canva` lack server-side auth | `app/dashboard/page.tsx`, `app/admin/monitors/page.tsx`, `app/admin/analytics/page.tsx`, `app/admin/integrations/page.tsx` |
| 2.1 | In-memory rate limiter resets per Vercel instance | `lib/rate-limit.ts:8-16` |
| 3.3 | Supabase RLS `USING (true)` grants any authenticated Supabase user full access | `supabase/migrations/00002_rls_policies.sql`, `00004_rls_policies_clean.sql` |

### MEDIUM — Address in next sprint
| # | Finding | File(s) |
|---|---------|---------|
| 1.3 | `/api/auth/me` hardcodes `role: "member"` for Supabase sessions | `app/api/auth/me/route.ts:40` |
| 4.1 | Dual lead stores: `/dashboard` reads legacy JSONL, new leads go to SQLite | `lib/leads-store.ts`, `app/dashboard/page.tsx`, `app/api/leads/route.ts` |
| 5.1 | Inspector lists `/hub` etc. which do not exist | `scripts/quality-inspect.mjs:37-44` |
| 5.2 | Inspector API list is incomplete | `scripts/quality-inspect.mjs:61-64` |
| 6.1 | `motion` package listed but never imported | `package.json:41` |
| 7.1 | Hardcoded hex in `AnalyticsTools` && register route | `components/analytics/AnalyticsTools.tsx`, `app/api/auth/register/route.ts` |
| 8.1-8.4 | Modal / Toast / Tooltip / ContextMenu lack ARIA + keyboard | `components/primitives/*.tsx` |

### LOW — Technical debt
| # | Finding | File(s) |
|---|---------|---------|
| 7.2 | `color-layer.css` is NOT the last import despite comment | `app/layout.tsx:18-23` |
| 7.3 | Hardcoded light-mode grays `--g55…--g100` | `app/aether-monochrome.css` |
| 8.5 | Primitives use rounded corners | `components/primitives/*.tsx` |
| 8.6 | No `prefers-reduced-motion` check | `components/primitives/*.tsx` |
| 9.1 | `secure` cookie conditional on NODE_ENV | `lib/auth.ts:91` |
| 10.1 | Background scoring swallows errors | `app/api/leads/route.ts:130,168` |
| 11.2 | 9 placeholder testimonials | `content/testimonials.ts` |
| 11.4 | Owner bootstrap fallback credentials | `lib/db.ts:252-253` |

---

*Audit complete. No source files were modified.*
