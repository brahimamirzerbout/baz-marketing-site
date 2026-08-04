# BAZ Brand Assets — Master Index

> **Version 2.0.0 · BlackSwan Design System · Cyan Accent**

This directory contains all canonical brand assets for BAZ Marketing Ventures Agency. Every asset follows the BlackSwan Design System with cyan accent `#22D3EE` (hsl(187, 85%, 72%)).

---

## ⚠️ Critical: Accent Color

The BAZ functional signal is **cyan `#22D3EE`**. The signature gold mark (metallic gradient `#F7E3A8→#C29B5B→#8C6A30`) is the favicon/mark only. Retired accents — violet `#8b5cf6`, gold `#C8A55A`, orange `#F2572B`, red `#ff3b2f` — do not reintroduce. If you find any asset using a retired accent, update it immediately.

---

## Directory Structure

```
brand/assets/
├── logo/                          ← Canonical logo SVGs
│   ├── baz-mark.svg               ← Primary icon mark (cyan squircle + paper B)
│   ├── baz-mark-inverse.svg       ← Inverse mark (paper squircle + cyan B)
│   ├── baz-mark-ghost.svg         ← Ghost mark (for watermark use at 6-10% opacity)
│   ├── baz-wordmark.svg           ← Primary wordmark (for light/paper backgrounds)
│   ├── baz-wordmark-mono.svg      ← Monochrome (single ink-900 color)
│   ├── baz-wordmark-reverse.svg   ← Reverse (for ink/dark backgrounds)
│   ├── baz-favicon.svg            ← Simplified mark for browser tabs
│   ├── reference-*.webp/png       ← Downloaded AI/client reference images
│   └── README.md                  ← Logo usage guide
│
├── og/                            ← Open Graph sharing images
│   ├── og-image-1200x630.svg      ← Default OG image (ink bg, cyan accent)
│   └── README.md                  ← OG implementation guide
│
├── social/                        ← Social media templates
│   ├── linkedin-banner.svg        ← 1584×396 LinkedIn banner
│   ├── instagram-post.svg         ← 1080×1080 Instagram post
│   ├── instagram-story.svg        ← 1080×1920 Instagram story
│   ├── twitter-header.svg         ← 1500×500 X/Twitter header
│   └── README.md                  ← Social copy & template guide
│
├── stationery/                   ← Print & email templates
│   ├── business-card-front.svg    ← 1050×600 @300dpi
│   ├── business-card-back.svg    ← 1050×600 @300dpi
│   ├── letterhead.svg            ← 2550×3300 @300dpi
│   ├── email-signature.svg        ← 1200×300 @96dpi
│   └── README.md                  ← Print specs & CMYK conversions
│
├── presentation/                  ← Slide templates
│   ├── title-slide-ink.svg        ← 1920×1080 title slide (ink bg)
│   ├── content-slide-paper.svg    ← 1920×1080 content slide (paper bg)
│   └── README.md                  ← Slide typography & layout guide
│
├── app/                           ← App icons & favicons
│   ├── app-icon-1024.svg         ← Master 1024×1024 app icon
│   ├── apple-touch-icon.svg      ← 512×512 Apple touch icon
│   └── README.md                  ← Export sizes & manifest config
│
├── patterns/                      ← Background patterns & textures
│   ├── grid-pattern.svg           ← Subtle grid for paper sections
│   ├── mesh-gradient.svg         ← Radial cyan glow for ink sections
│   ├── paper-grain.svg           ← Noise texture overlay
│   ├── dot-pattern.svg            ← Dot grid alternative
│   ├── cyan-gradient.svg       ← CTA gradient fill
│   ├── cyan-shimmer.svg        ← Decorative shimmer/border
│   └── README.md                  ← CSS implementation guide
│
└── export-sizes.md                ← Complete export specification table
```

---

## Quick Reference

### Brand Colors
| Token | HEX | HSL | Use |
|-------|-----|-----|-----|
| Cyan-500 (accent) | `#22D3EE` | `hsl(187, 85%, 72%)` | Primary accent, CTAs, highlights |
| Cyan-600 (hover) | `#0891b2` | `hsl(187, 80%, 64%)` | Hover states |
| Cyan-700 (active) | `#0e7490` | `hsl(187, 75%, 55%)` | Active/pressed states |
| Ink-900 | `#0e0e0e` | — | Primary dark, headings |
| Paper | `#f5f1ea` | — | Primary light, backgrounds |
| Ink-500 | `#737373` | — | Body text |

### Brand Fonts
| Font | Role | Weights |
|------|------|---------|
| Inter | Display/headlines | 300, 400, 500, 600 |
| Inter | Body/UI | 400, 500, 600 |
| JetBrains Mono | Code/eyebrows | 400 |

### Radius System
| Token | Value | Use |
|-------|-------|-----|
| fib3 | 3px | Badges, tags |
| fib5 | 5px | Inputs, small buttons |
| fib8 | 8px | Standard buttons |
| fib13 | 13px | Cards, modals |
| fib21 | 21px | Hero containers |
| fib34 | 34px | Large overlays |
| fib55 | 55px | Full-width sections |
| fib89 | 89px | Decorative blobs |

---

## Related Documentation

| Document | Path |
|----------|------|
| Design system overview | `brand/README.md` |
| Visual design philosophy | `brand/design.md` |
| Color palette & tokens | `brand/colors.md` |
| Typography | `brand/typography.md` |
| Logo guidelines | `brand/logo.md` |
| Components | `brand/components.md` |
| Spacing | `brand/spacing.md` |
| Imagery | `brand/imagery.md` |
| Motion | `brand/motion.md` |
| Voice | `brand/voice.md` |
| Accessibility | `brand/accessibility.md` |
| CSS variables | `brand/css/variables.css` |
| Design tokens (JSON) | `brand/tokens.json` |
| Design tokens (YAML) | `brand/design-tokens.yml` |
| Tailwind theme | `brand/tailwind.theme.js` |
| Tailwind config | `brand/tailwind.config.js` |

---

## Change Log

### v2.0.0 (2026-07-03)
- **Breaking:** Accent color changed from red `#ff3b2f` to cyan `#22D3EE`
- **Breaking:** Font stack changed from Plus Jakarta Sans → Inter (display), Poppins → Inter (body)
- **Breaking:** Border radius changed from 0/square to Fibonacci scale (3, 5, 8, 13, 21, 34, 55, 89)
- **Added:** Full BlackSwan Design System integration (seed variables, algorithmic palette)
- **Added:** Brand pattern library (grid, mesh, grain, dots, gradients)
- **Added:** Social media templates (LinkedIn, Instagram, Twitter)
- **Added:** Stationery templates (business card, letterhead, email signature)
- **Added:** Presentation slide templates
- **Added:** App icon and favicon suite
- **Added:** OG image template with dynamic implementation guide
- **Updated:** All logo SVGs now use cyan accent instead of red
- **Updated:** Wordmark subtitle changed to "MARKETING VENTURES" (from "Marketing Agency")
- **Updated:** Mark squircle now uses Fibonacci radius (rx=26 for 120px, rx=14 for 64px)