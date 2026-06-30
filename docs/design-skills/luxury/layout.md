# Layout & Spacing

## Spacing Rhythm

Base unit: **8px**. All spacing values should be multiples of 8px.

| Context | Value |
|---|---|
| Section vertical padding | 120px |
| Section header → content | 56px or 72px |
| Heading → paragraph | 20px |
| Container horizontal padding | 32px |
| Flex/grid row gap | 16px |
| Card grid gap | 32px |
| Wide component grid gap | 40px |
| Column layout gap | 56px |

## Container

Standard section container: max-width 1280px, centered, 32px horizontal padding.

Every major section wraps content in this container.

## Section Separation

Sections flow into each other through **generous whitespace** — not border lines. There are no visible horizontal rules or grid lines between sections.

### Rules for Section Transitions
- No 1px horizontal border lines between sections
- No `gap-px` grid-line technique between sections
- No visible vertical border rails on containers
- All sections must use the `#262642` background color
- Whitespace alone handles the breathing room between sections

## Content Composition Order

Inside each section, follow this order:
1. Heading (`h1`–`h3`) — this is the dominant visual element; headings should command attention with their size
2. Leading paragraph
3. Normal paragraph(s)
4. Lists, CTA links, or component grids

## Section Pattern

Each section has:
- 120px vertical padding
- A background color of `#262642` for all sections
- A centered container (max-width 1280px, 32px horizontal padding)
- A section header area with 56px bottom margin
- Section content below
- No visible borders on containers or between sections — separation is purely through color and spacing

## Design Philosophy — Layered Editorial Luxury

- **Oversized headings are the hero of every section.** Headings (especially h1 and h2) should be the largest, most dominant visual element on the page. They anchor each section and create immediate visual hierarchy.
- **Overlapping, layered compositions.** Elements should overlap and layer on top of each other. Images overlap other images, cards overlap images, avatars cluster and overlap. Use negative margins, absolute positioning within relative containers, and z-index stacking to create depth. Nothing sits in a rigid, isolated box.
- **Rounded image treatments.** All images use generous border-radius (16px–24px for feature images, `rounded-full` for avatar thumbnails). No sharp-cornered images anywhere. Images should feel soft and approachable.
- **Circular accent elements.** Small circular thumbnails (avatars, mini product previews) appear as navigation hints, social proof clusters, or decorative accents. Group them in overlapping rows with negative margin spacing.
- **Asymmetric editorial grids.** Layouts are not rigid even-column grids. Mix a large image on one side with text on the other. Vary image sizes within a row. Use 60/40 or 70/30 splits rather than 50/50. Let one element dominate while others support.
- **Numbered section indicators.** Use large, styled numbers (01, 02, 03…) inside rounded containers as section markers. These sit on top of or adjacent to images to add editorial structure.
- **Generous negative space.** Whitespace is a design tool, not wasted space. Sections should breathe. Let large headings float in ample space to create an editorial, luxury feel.
- **Image-forward layout.** Sections should feature large, high-quality imagery as primary visual content. Images are the focal point — large, rounded, and layered — not squeezed into small frames.
- **Strong type-scale contrast.** The difference between heading sizes and body text should be dramatic. A 96px h1 next to 15px body copy creates the high-contrast editorial look.
- **Pill-shaped badges and tags.** Category labels, tags, and small navigation elements use `rounded-full` pill shapes with subtle backgrounds. They float near headings or above cards as metadata.
- **Let content lead.** Navigation should be minimal and unobtrusive. CTAs should be clear but not visually heavy. The content and typography should dominate, not UI chrome.
- **Dark accent sections for contrast.** CTA bands and the footer use dark (#111111) backgrounds to create dramatic contrast against the predominantly light page. These sections break the rhythm and draw attention.

## Overlapping & Layering Techniques

Layered compositions are core to this aesthetic. Every feature section should have at least one instance of visual overlap.

### Image Overlapping
- Use a relative-positioned parent container. Place a primary image, then use absolute positioning + negative offsets to partially overlap secondary images on top.
- Overlapping images should have a white border (3px–4px solid white) or a subtle shadow to lift them off the layer below.
- Typical overlap: 20%–40% of the secondary image overlaps the primary.

### Avatar Clusters
- Display 3–5 circular avatars in a horizontal row with negative horizontal margins (`-ml-3` or `-ml-4`) so they overlap each other.
- Each avatar gets a white ring border (`ring-2 ring-white` or `border-2 border-white`).
- Use z-index stacking so the first avatar is on top, descending order.

### Card-on-Image Overlapping
- Feature cards or numbered indicator badges sit partially over a hero image.
- The card uses absolute positioning anchored to a corner of the image container, offset by negative margin so it breaks the image boundary.
- The card gets a solid background and shadow to create separation from the image below.

### Z-Index Layering
- Images: z-0 (base)
- Overlapping secondary images: z-10
- Cards/badges overlapping images: z-20
- Avatar clusters: z-10
- Keep layering consistent and predictable

## Hero Section Pattern

The hero section is the most complex layered composition on the page.

- **Typography:** Massive display heading (h1, 96px desktop) with mixed emphasis — use a combination of bold and italic weights within the same heading to create typographic interest. One word or phrase in a lighter italic style contrasts with the rest in bold.
- **Image collage:** 2–4 images of varying sizes arranged in an overlapping cluster. At least one image should be significantly larger (hero focal image), with smaller images partially overlapping it.
- **Avatar row:** A cluster of 3–5 overlapping circular avatars near the hero content, serving as social proof.
- **CTA:** A single primary button or pill-shaped CTA below the heading.
- **Composition:** Text and images interweave — the heading can wrap around or sit between images rather than being strictly above or beside them.

## Product / Collection Grid Pattern

**CRITICAL RULE:** We do NOT use grid cards on the landing page. The landing page must only use big titles, premium PNG images, and big buttons. No small grid layouts or standard feature cards.

## Feature / Craftsmanship Section Pattern

- Two-column asymmetric layout (roughly 55/45 or 60/40 split).
- One column: large rounded image with a smaller overlapping element (numbered badge, secondary image, or stat card).
- Other column: heading + paragraph text, vertically centered.
- Numbered indicators (01, 02, 03) in rounded containers as section sequence markers.

## Stats / Social Proof Pattern

- Key metrics displayed in bold large type (e.g., "101k+") with a short label below.
- Arrange in a horizontal row or within feature cards.
- Use heading text color for the number, body text color for the label.

## Testimonial Pattern

- Large quote text (h3 or larger size) as the visual centerpiece.
- Avatar + name + role below the quote.
- Star rating row (5 filled/unfilled stars).
- Optional: a supporting image on one side (two-column layout).
- Rounded container or subtle background distinction.

## CTA Band Pattern

- Full-width dark (#111111) background section.
- Large display heading in white text.
- A single CTA button.
- Optional decorative image element (partially visible, clipped at edges).
- 120px vertical padding, text centered or left-aligned.

## Motion & Animation

- Prefer CSS-native: `transition`, `animation`, `@keyframes`. Use Motion library only when CSS cannot achieve the behavior.
- Prioritize high-impact orchestrated moments over scattered micro-interactions. A single well-sequenced page-load animation using staggered `animation-delay` delivers more perceived quality than many isolated effects.
- Reserve scroll-triggered and hover transitions for moments that reinforce hierarchy or reward attention.
- Image hover: subtle scale-up (`scale(1.03)`) with overflow hidden on the rounded container — the image zooms slightly but stays within its rounded mask.

## Backgrounds & Visual Depth

- Default to clean, flat backgrounds. All sections must use the `#262642` background color.
- No grid lines, no border rails, no wireframe aesthetic. The page should feel editorial and organic, not structured/gridded.
- Depth comes from overlapping layers, subtle shadows on overlapping elements, and white ring borders on avatars/thumbnails — not from section borders.

## Must

- All sections: consistent 120px vertical padding
- All containers: max-width 1280px, centered, 32px horizontal padding
- **No visible border lines between sections** — separation is through whitespace only
- **No vertical border rails on containers** — clean edge-to-edge backgrounds
- **No `gap-px` grid-line technique** — cards and grid items float with regular gap spacing
- All images: rounded corners (16px–24px for feature images, `rounded-full` for avatars/thumbnails)
- At least one overlapping/layered element per major section
- Headings must be the largest, most dominant element in every section — oversized display type is core to the aesthetic
- Consistent vertical rhythm, no crowded sections
- Generous whitespace around all content — editorial luxury feel, not density
- Layouts readable and properly spaced on both desktop and mobile
- Footer and CTA band: dark (#111111) background with white text
- Large, prominent, rounded imagery in feature and product sections — images should be a focal point with soft corners
- Circular avatar clusters with overlapping white-ring borders for social proof
- Pill-shaped badges and tags using `rounded-full`
