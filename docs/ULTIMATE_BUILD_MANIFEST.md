# BAZ ULTIMATE BUILD — Asset Manifest & Integration Plan

> Harvested from 7 marketing builds. Every asset catalogued, rated, and
> assigned a target in the ultimate merge.

---

## 📦 ASSET INVENTORY BY BUILD

### 1. BAZ (main) — `localhost:3000` — SCORE: 8/10
**The foundation. Most complete marketing site.**

| Asset | Quality | Target |
|---|---|---|
| 18-service catalog (`content/services.ts`) | ✅ Excellent | KEEP as content source |
| 12 case studies (`content/case-studies.ts`) | ✅ Good structure | KEEP, replace with real data |
| 8 testimonials with metrics | ✅ Good | KEEP, replace with real data |
| 12 blog posts | ✅ Good quality | KEEP |
| 6 industries | ✅ Complete | KEEP |
| 3 pricing tiers | ✅ Complete | KEEP |
| Hero with 4 ICP variants | ✅ Smart | KEEP, upgrade animations |
| Live agent demo (4 agents) | ✅ Great UX | KEEP, wire to Nova engine |
| Lead pipeline + scoring | ✅ Solid | KEEP, consolidate paths |
| Auth system (cookie sessions) | ✅ Working | KEEP |
| SEO infra (sitemap, robots, OG, JSON-LD) | ✅ Complete | KEEP, extend |
| Design tokens (paper/ink/accent-red) | ✅ Documented | MERGE with gold system |
| 40+ section/marketing components | ✅ Good | UPGRADE with shadcn |
| Custom cursor + magnetic CTAs | ✅ Nice | KEEP |
| Dynamic OG image generation | ✅ Smart | KEEP, extend to all pages |
| SQLite DB with 12 tables | ✅ Working | KEEP, merge schema with Hub |

### 2. Marketing Hub — `localhost:3001` — SCORE: 9.5/10
**The real product. 110+ pages, 180+ API routes, 30+ lib modules.**

| Asset | Quality | Target |
|---|---|---|
| **beUI animation library** (15 components) | ✅ Premium | PORT to baz/ |
| → animated-number.tsx | ✅ Count-up on scroll | Replace baz/ static stats |
| → number-ticker.tsx | ✅ Per-digit roll | Hero stat animation |
| → text-reveal.tsx | ✅ Word/char split reveal | Hero headline animation |
| → text-shimmer.tsx | ✅ Shimmer effect | CTA hover states |
| → scroll-reveal.tsx | ✅ Fade-up with blur | Replace baz/ CSS reveal |
| → scroll-progress.tsx | ✅ Bar indicator | Add to blog posts |
| → parallax.tsx | ✅ Scroll parallax | Hero background layers |
| → magnetic.tsx | ✅ Spring-based magnetic | Upgrade baz/ Magnetic |
| → smooth-scroll.tsx | ✅ Lenis-powered | Replace baz/ SmoothScroll |
| → theme-toggle.tsx | ✅ View Transition API | Fix baz/ dark mode |
| → animated-badge.tsx | ✅ Status badges | Hub status indicators |
| → animated-toast-stack.tsx | ✅ Toast system | Replace baz/ notifications |
| → bottom-sheet.tsx | ✅ Mobile sheet | Replace baz/ mobile nav |
| → bouncy-accordion.tsx | ✅ FAQ accordion | Service page FAQs |
| → tooltip.tsx | ✅ Smart tooltips | Service hover states |
| **Triangle loop** (`lib/triangle.ts`) | ✅ 15K lines | EMBED as core feature |
| **Nova reasoning engine** (`lib/nova.ts`) | ✅ 36K lines | POWER homepage AI demo |
| **Cockpit dashboard** (`app/cockpit/`) | ✅ Real-time SSE | EMBED as /dashboard |
| **Attribution engine** (`lib/attribution.ts`) | ✅ 7K lines | ADD as /attribution |
| **Experiments** (`lib/experiments.ts`) | ✅ A/B testing | ADD as infrastructure |
| **Finance module** (12 pages, 20+ routes) | ✅ Full P&L | ADD as premium feature |
| **Sequences** (`lib/sequences.ts`) | ✅ Sales cadences | ADD as /sequences |
| **Marketing Dive** (`lib/marketingDive.ts`) | ✅ 12K lines | ADD as /dive |
| **Orchestrator** (`lib/orchestrator.ts`) | ✅ 34K lines | ADD as campaign manager |
| **Intelligence** (`lib/intelligence.ts`) | ✅ 19K lines | ADD as AI insights |
| **Lexicon** (`lib/lexicon.ts`) | ✅ 41K lines | ADD as marketing dictionary |
| **Library** (`lib/library.ts`) | ✅ 21K lines | ADD as framework library |
| **Copy engine** (`lib/copy.ts`) | ✅ 22K lines | ADD as copy generator |
| **Studio** (`lib/studio.ts`) | ✅ 17K lines | ADD as content studio |
| **Trends** (`lib/trends.ts`) | ✅ 11K lines | ADD as trends tracker |
| **Predictive** (`lib/predictive.ts`) | ✅ 4.5K lines | ADD as forecasting |
| **Retention** (`lib/retention.ts`) | ✅ 6.6K lines | ADD as cohort analysis |
| **Reports** (`lib/reports.ts`) | ✅ 7.2K lines | ADD as report generator |
| **Billing** (`lib/billing.ts`) | ✅ 12K lines | ADD as Stripe integration |
| **Wire** (`lib/wire.ts`) | ✅ 12K lines | ADD as news wire |
| **Funnel simulator** (`lib/funnel-sim.ts`) | ✅ 3.1K lines | ADD as /funnels |
| **ABM module** (`lib/abm.ts`) | ✅ 4.7K lines | ADD as /abm |
| **Machine** (`lib/machine.ts`) | ✅ 16K lines | ADD as content machine |
| **Patrick** (`lib/patrick.ts`) | ✅ 12K lines | ADD as onboarding |
| **Brainwave components** | ✅ Premium | PORT notification cards |
| **Recharts** integration | ✅ Data viz | ADD to all dashboards |
| **Command palette** | ✅ Cmd+K | ADD to baz/ |
| **Sidebar + Topbar** | ✅ App shell | USE for Hub section |
| **BlockEditor** | ✅ Visual editor | ADD to studio |
| **FontProvider** | ✅ Dynamic fonts | ADD as font switcher |
| **GodinRibbon** | ✅ Seth Godin ribbon | ADD as marketing philosophy |
| **useFetch hook** | ✅ Data fetching | ADD as standard hook |
| **Scheduler** (`lib/scheduler.ts`) | ✅ 60s tick | RUN triangle loop |
| **Themes** (`lib/themes.ts`) | ✅ 8.5K lines | PORT theme system |
| **Email** (`lib/email.ts`) | ✅ 6.6K lines | ADD as email engine |
| **Webhooks** (`lib/webhooks.ts`) | ✅ 3K lines | ADD as webhook system |
| **Backup** (`lib/backup.ts`) | ✅ 2.3K lines | ADD as backup system |
| **Workspace** (`lib/workspace.ts`) | ✅ 10K lines | ADD as multi-tenant |

### 3. BAZ Redesign — `localhost:3005` — SCORE: 7/10
**Cleanest dark mode. Modern stack.**

| Asset | Quality | Target |
|---|---|---|
| Next.js 16 + React 19 | ✅ Latest | UPGRADE baz/ to this |
| Shadcn UI (button, card, badge, input, separator) | ✅ Clean | PORT as component base |
| Radix UI primitives | ✅ Accessible | PORT for all interactive components |
| Tailwind v4 | ✅ Modern | UPGRADE baz/ CSS pipeline |
| Lucide icons | ✅ Complete icon set | REPLACE baz/ custom SVGs |
| tw-animate-css | ✅ Animation utilities | ADD to baz/ |
| Dark aesthetic (black bg, grid, emerald) | ✅ Clean | MERGE as dark mode base |
| Methodology page (Diagnose/Plan/Ship/Score) | ✅ Better than baz/ | REPLACE baz/ methodology |
| Feature grid with icons | ✅ Clean | REFERENCE for services page |
| Triangle steps with mono markers | ✅ Clean | REFERENCE for process section |
| Prettier config | ✅ Code formatting | ADD to baz/ |

### 4. BAZ Greatness — `localhost:3010` — SCORE: 7.5/10
**The luxury aesthetic. Gold + ink + cream.**

| Asset | Quality | Target |
|---|---|---|
| **Gold metallic gradient text** (`.text-gold`) | ✅ Stunning | PORT as accent option |
| Gold hairline dividers (`.hairline-gold`) | ✅ Elegant | PORT for section dividers |
| Gold shimmer CTA buttons (`.btn-gold`) | ✅ Premium | PORT as CTA variant |
| Gold radial glow ornaments | ✅ Atmospheric | PORT for hero background |
| Gold grid pattern overlay | ✅ Subtle | PORT as decorative layer |
| Playfair Display font | ✅ Editorial | ADD as alt display font |
| "Marketing systems behind category leaders" | ✅ Strong positioning | REFERENCE for messaging |
| Logo marquee with gold dots | ✅ Elegant | UPGRADE baz/ LogoMarquee |
| "Est. MMXXIV · San Francisco" branding | ✅ Premium | REFERENCE for brand treatment |
| Gold scrollbar styling | ✅ Premium detail | PORT |
| `tracking-ultratight` (-0.06em) | ✅ Tight display | ADD to baz/ type scale |
| Framer Motion integration | ✅ Smooth | PORT animation patterns |

### 5. BAZ Marketing Hub Snapshot — static HTML — SCORE: 6/10
**The B2B SaaS dashboard prototype.**

| Asset | Quality | Target |
|---|---|---|
| Silk + gold dark palette (#0a0a0f / #c9a96b) | ✅ Premium dark | MERGE with greatness gold |
| 4px border radius system | ✅ Sharp/modern | ADD as design token option |
| ShadCN-style CSS (`shadcn-b0.css`) | ✅ 566 lines | REFERENCE for component styles |
| Outfit font | ✅ Clean geometric | ADD as alt body font |
| Org chart (CEO/CFO/CMO + reports) | ✅ Smart | PORT to baz/ about page |
| Case study table layout | ✅ Clean | ADD as view option |
| Pulse strip (live metrics) | ✅ Data-dense | UPGRADE baz/ ProofNumbers |
| Hub status pill in nav | ✅ Live indicator | ADD to baz/ Header |
| Stock images (team, blog, products) | ⚠️ Generic | USE as placeholders until real |
| Logo SVG | ✅ Clean | REFERENCE for logo design |

### 6. Remix of Marketing Canvas — `localhost:5173` — SCORE: 7/10
**The full shadcn component library + app shell.**

| Asset | Quality | Target |
|---|---|---|
| **50+ shadcn/ui components** | ✅ Complete library | PORT entire component set |
| → accordion, alert, alert-dialog, avatar | ✅ | All interactive components |
| → badge, button, calendar, card, carousel | ✅ | UI primitives |
| → chart, checkbox, collapsible, command | ✅ | Data + interaction |
| → context-menu, dialog, drawer, dropdown-menu | ✅ | Menus + overlays |
| → form, hover-card, input, input-otp, label | ✅ | Form components |
| → menubar, navigation-menu, pagination, popover | ✅ | Navigation |
| → progress, radio-group, resizable, scroll-area | ✅ | Layout components |
| → select, separator, sheet, sidebar, skeleton | ✅ | Structure |
| → slider, sonner, switch, table, tabs, toast | ✅ | Feedback + data |
| → toggle, toggle-group, tooltip | ✅ | Controls |
| Starfield background component | ✅ Cool | ADD as hero bg option |
| RadialMenu | ✅ Innovative nav | REFERENCE for Hub nav |
| Waveform | ✅ Audio viz | REFERENCE for podcast feature |
| VoidHUD / VoidGraph / VoidCanvas | ✅ D3 network | REFERENCE for attribution graph |
| Comms widget (threads, DND, summaries) | ✅ Full | REFERENCE for inbox feature |
| GoalCard / TaskChecklist / PinnedNote | ✅ Useful | PORT to client portal |
| InsightCards / ChatInputBar | ✅ Smart | PORT to dashboard |
| MentorPanel | ✅ AI mentor | REFERENCE for Nova UI |
| TunnelBackground | ✅ Immersive | REFERENCE for hero |
| TodayPanel | ✅ Daily brief | PORT to cockpit |
| AppLayout + AppSidebar | ✅ App shell | REFERENCE for Hub layout |
| Zustand stores | ✅ State mgmt | REFERENCE for client state |
| TanStack Query | ✅ Data fetching | ADD to baz/ for Hub features |
| Supabase integration | ✅ Backend | REFERENCE for cloud option |
| React Router | ⚠️ Not Next.js | SKIP (use Next.js routing) |
| useVoice hook | ✅ Voice input | REFERENCE for Nova voice |

### 7. Digital Agency Templates — SCORE: 3/10
**Stock templates. Minimal value.**

| Asset | Quality | Target |
|---|---|---|
| Team photos (6 images) | ⚠️ Stock | USE as placeholder avatars |
| Blog images (6 images) | ⚠️ Stock | USE as placeholder post covers |
| Product images (6 images) | ⚠️ Stock | REFERENCE for case study visuals |
| Client logo PNGs (5 images) | ⚠️ Stock | REFERENCE for logo wall |
| Bootstrap CSS patterns | ❌ Outdated | SKIP |
| jQuery plugins | ❌ Outdated | SKIP |

---

## 🏗️ THE ULTIMATE BUILD PLAN

### Architecture Decision

**Base**: `baz/` (Next.js 14 → upgrade to 16, React 18 → 19)
**Product layer**: Merge `marketing-hub/` as `/hub/*` routes inside baz/
**Component library**: Shadcn/ui from remix-canvas + baz-redesign
**Animation**: beUI library from marketing-hub
**Design system**: Merge baz/ paper-ink-red + greatness gold + redesign dark

### Phase 1: Foundation Upgrade (Day 1-2)

```
1. Upgrade baz/ to Next.js 16 + React 19 + Tailwind v4
2. Install full shadcn/ui component library (from remix-canvas)
3. Port beUI animation library (15 components) from marketing-hub
4. Merge design tokens:
   - Light mode: baz/ paper + ink + accent red
   - Dark mode: greatness ink-black + gold + cream
   - Premium accent: gold metallic gradients
5. Fix dark mode with beUI theme-toggle (View Transition API)
6. Install Lucide icons (replace custom SVGs)
7. Install Recharts (data visualization)
8. Port beUI smooth-scroll (Lenis) replacing baz/ version
9. Port beUI magnetic (spring-based) upgrading baz/ version
10. Add Prettier config from baz-redesign
```

### Phase 2: Design System Merge (Day 2-3)

```
1. Create unified tailwind.config.ts:
   - Colors: paper/ink (light) + ink/gold/cream (dark) + accent-red (both)
   - Fonts: Fraunces (display) + Inter (body) + Playfair (alt display) + JetBrains Mono
   - Border radius: 4px (sharp) + existing rounded-full (buttons)
   - Shadows: existing + gold glow
2. Port gold effects from greatness:
   - .text-gold metallic gradient
   - .hairline-gold divider
   - .btn-gold shimmer CTA
   - Gold radial glow ornaments
   - Gold grid pattern overlay
3. Upgrade hero with:
   - beUI text-reveal (word-by-word animation)
   - beUI parallax background layers
   - Gold accent option (toggle between red/gold)
   - beUI number-ticker for stats
4. Upgrade all sections with beUI scroll-reveal
5. Port scroll-progress bar for all pages
6. Add beUI tooltip to service hover states
7. Add beUI bouncy-accordion to service FAQs
```

### Phase 3: Product Integration (Day 3-5)

```
1. Create /hub/* route namespace in baz/
2. Port marketing-hub pages as baz/ routes:
   - /hub/cockpit → dashboard
   - /hub/triangle → autonomous loop
   - /hub/nova → AI reasoning
   - /hub/sequences → sales cadences
   - /hub/attribution → multi-touch attribution
   - /hub/dive → industry intelligence
   - /hub/crm → contacts + deals
   - /hub/ads → ad management
   - /hub/analytics → tracking + dashboards
   - /hub/finance → P&L + cash flow
   - /hub/experiments → A/B testing
   - /hub/studio → content studio
   - /hub/lexicon → marketing dictionary
   - /hub/library → framework library
   - /hub/trends → market trends
   - /hub/reports → report generator
   - /hub/campaigns → campaign manager
   - /hub/automations → automation builder
3. Port marketing-hub lib modules:
   - triangle.ts → autonomous loop
   - nova.ts → AI reasoning
   - attribution.ts → attribution engine
   - sequences.ts → sales cadences
   - billing.ts → Stripe integration
   - experiments.ts → A/B testing
   - finance/* → financial module
   - intelligence.ts → AI insights
4. Port marketing-hub API routes (180+)
5. Merge SQLite schemas (baz/ + hub/)
6. Port scheduler for triangle loop (60s tick)
7. Wire Nova engine to homepage LiveAgentDemo
   - Replace simulated responses with real Nova answers
   - Add /api/nova endpoint
8. Embed cockpit as iframe/route on homepage
   - Live status pill in header
   - MarketingHubBanner fetches from real /api/triangle/health
```

### Phase 4: Content & UX Polish (Day 5-7)

```
1. Port org chart from snapshot to /about page
2. Add case study table layout (from snapshot) as alt view
3. Upgrade ProofNumbers with live pulse strip (from snapshot)
4. Add methodology page from baz-redesign (cleaner)
5. Add per-page OG images for all key pages
6. Add blog reading progress + TOC (beUI scroll-progress)
7. Add newsletter signup (wire to email engine from hub)
8. Add command palette (Cmd+K) from marketing-hub
9. Port brainwave notification cards for real-time alerts
10. Add client portal with GoalCard, TaskChecklist, PinnedNote
11. Port TodayPanel as daily brief widget
12. Add beUI bottom-sheet for mobile navigation
13. Add beUI animated-toast-stack for notifications
14. Fix all audit report issues (security, SEO, types, etc.)
```

### Phase 5: Advanced Features (Day 7-10)

```
1. Add finance module as premium tier feature
2. Add funnel simulator (/hub/funnels)
3. Add ABM module (/hub/abm)
4. Add content machine (/hub/machine)
5. Add copy engine (/hub/copy) with voice fitting
6. Add studio with visual BlockEditor
7. Add predictive forecasting
8. Add retention cohort analysis
9. Add wire (news aggregation)
10. Add webhooks system
11. Add workspace multi-tenant support
12. Add backup system
13. Add font switcher (from hub FontProvider)
14. Add theme system (from hub themes.ts - 8.5K lines)
15. Add Supabase as optional backend (from remix-canvas)
```

---

## 📊 FINAL SCORECARD

| Component | Source | Merged Quality |
|---|---|---|
| Marketing site content | baz/ (18 services, 12 cases, 12 posts) | 9/10 |
| Design system | baz/ + greatness + redesign | 9/10 |
| Dark mode | redesign + greatness + beUI toggle | 9/10 |
| Animations | marketing-hub beUI (15 components) | 10/10 |
| Component library | remix-canvas shadcn (50+ components) | 10/10 |
| Product (Hub) | marketing-hub (110+ pages, 180+ APIs) | 10/10 |
| AI/Nova | marketing-hub nova.ts (36K lines) | 10/10 |
| Triangle loop | marketing-hub triangle.ts (15K lines) | 10/10 |
| Auth | baz/ (cookie sessions) + hub/ (2FA, team) | 9/10 |
| SEO | baz/ (sitemap, OG, JSON-LD) + hub/ | 9/10 |
| Lead pipeline | baz/ (scoring) + hub/ (sequences) | 9/10 |
| Finance | marketing-hub (12 pages, 20+ routes) | 10/10 |
| Data viz | marketing-hub Recharts + remix-canvas chart | 9/10 |
| Icons | baz-redesign Lucide (complete set) | 10/10 |
| State management | remix-canvas Zustand + TanStack Query | 9/10 |

**ULTIMATE BUILD PROJECTED SCORE: 9.5/10** 🔥

---

## 🎯 PRIORITY ORDER FOR EXECUTION

### Immediate (can start now):
1. Port beUI animation library → baz/
2. Port shadcn component library → baz/
3. Merge gold design tokens → baz/
4. Fix dark mode with beUI theme-toggle
5. Wire Nova engine to homepage demo

### Next session:
6. Port marketing-hub as /hub/* routes
7. Merge SQLite schemas
8. Port Triangle loop + scheduler
9. Embed cockpit dashboard

### Following sessions:
10. Port finance, attribution, experiments
11. Port remaining 30+ lib modules
12. Content polish + audit fixes

---

*This manifest is the blueprint. Every asset is catalogued, rated, and assigned. Time to build the ultimate.*