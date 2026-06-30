# Semi-Circular Gauge Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 320 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a large bold primary metric value (such as "345k") using tabular numerals above a short metric label (such as "Visits by OS") in a muted secondary weight. On the right end, place a compact inline legend with two items sitting side by side: each item shows a small colored circle followed by a category label (such as "macOS" and "Windows"). Separate the header from the body with a thin horizontal divider below it.

**Chart body.** Below the header, fill the remaining canvas with a responsive semi-circular radial bar or gauge chart sized to the full card width. Keep a two-to-one width-to-height container ratio and scale the gauge as large as possible within the space between the header and footer so the arc occupies roughly half to three-fifths of the total card height, centered vertically in that chart area with balanced spacing above and below the arc. Render a thick arc track in a very light neutral color with a brand-colored fill segment covering roughly three quarters of the arc and a neutral remainder segment on the trailing end. Use flat butt caps on segment ends rather than rounded caps.

**Footer row.** Below the chart, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron). On the right, place a compact text link to a detailed report (such as "Users report" with a trailing chevron icon).

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 320 pixels. Use tabular numerals for the primary metric. Gauge track, segment colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** On narrow viewports preserve the 320-pixel widget height, use 16-pixel card padding on mobile and small screens. The header stacks metric block above the inline legend. The gauge scales to full card width, preserves the two-to-one semicircle aspect ratio, and stays centered between the header and footer. The footer stacks period dropdown above the report link. Preserve reading order throughout.
