# Layout & Spacing

## Spacing Rhythm

Base unit: **8px**. All spacing values should be multiples of 8px.

| Context | Value |
|---|---|
| Section vertical padding | 96px |
| Section header → content | 48px or 64px |
| Heading → paragraph | 16px |
| Container horizontal padding | 24px |
| Flex/grid row gap | 16px |
| Card grid gap | 24px |
| Wide component grid gap | 32px |
| Column layout gap | 48px |

## Container

Standard section container: max-width 1152px, centered, 24px horizontal padding.

Every major section wraps content in this container.

## Content Composition Order

Inside each section, follow this order:
1. Heading (`h1`–`h3`)
2. Leading paragraph
3. Normal paragraph(s)
4. Lists, CTA links, or component grids

## Section Pattern

Each section has:
- 96px vertical padding
- A background color (alternate between neutral-primary-soft and neutral-secondary-soft)
- A centered container (max-width 1152px, 24px horizontal padding)
- A section header area with 48px bottom margin
- Section content below

## Motion & Animation

- Prefer CSS-native: `transition`, `animation`, `@keyframes`. Use Motion library only when CSS cannot achieve the behavior.
- Prioritize high-impact orchestrated moments over scattered micro-interactions. A single well-sequenced page-load animation using staggered `animation-delay` delivers more perceived quality than many isolated effects.
- Reserve scroll-triggered and hover transitions for moments that reinforce hierarchy or reward attention.

## Backgrounds & Visual Depth

- Default to clean, flat solid backgrounds with crisp borders for separation.
- Apply contextual treatments — subtle border separators, alternating neutral backgrounds, structured whitespace — that align with the enterprise aesthetic.
- Incorporate modern geometric illustrations and abstract patterns to add visual depth and sophistication:
  - **Dot grids** at very low opacity (2–4%) as section backgrounds to create subtle texture
  - **Geometric line patterns** (intersecting lines, grid overlays) as decorative layers behind hero and CTA sections
  - **Abstract geometric shapes** (nested squares, concentric circles, diagonal lines) as floating decorative elements positioned at section edges
  - **SVG-based illustrations** that use the brand color at reduced opacity for visual interest without competing with content
- Illustrations and patterns must be monochrome or use the brand color at very low opacity (2–5%) to maintain the clean enterprise feel.
- Every visual element must serve a functional purpose (hierarchy, separation, or emphasis). Patterns add atmospheric texture, not decoration.

## Must

- All sections: consistent 96px vertical padding
- All containers: max-width 1152px, centered, 24px horizontal padding
- Section headers: 48px or 64px bottom margin
- Consistent vertical rhythm, no crowded sections
- Layouts readable and properly spaced on both desktop and mobile
