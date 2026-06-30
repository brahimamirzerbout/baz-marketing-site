# Radial Progress Summary Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with auto height sized to its content, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a widget title (such as a shop or entity name) in a semibold weight above a muted date-range subtitle (such as "31 Nov – 31 Dec"). On the right end, place a compact text link (such as "View all" with a trailing chevron icon). Separate the header from the body with a thin horizontal divider below it.

**Chart body.** Below the header, center a radial progress ring chart at a fixed prominent size. Keep 24 pixels of vertical spacing above and below the chart between the header divider and footer divider. Render a light neutral full circle track with a brand-colored arc overlay starting at the twelve o'clock position and extending clockwise to represent the current rate. In the center hole, stack a large bold percentage value (such as "35.4%") using tabular numerals above a short label (such as "Conversion rate") in a muted secondary weight.

**Footer row.** Below the chart, separated by a thin horizontal divider above it, place a centered or left-aligned trend summary line: a positive trend indicator with a directional arrow and delta value (such as "↑ 0.6%") using a success semantic color, followed by comparison text in a muted weight (such as "compared to last month").

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell with auto height sized to its content. Use tabular numerals for the percentage and delta. Keep the radial ring at a fixed prominent size with 24 pixels of vertical spacing above and below the chart. Chart arc, track, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Mobile layout rule.** On narrow viewports preserve auto height sized to content, use 16-pixel card padding on mobile and small screens. The header stacks title block above the view-all link. Keep the same fixed ring size and 24-pixel vertical chart spacing. Preserve reading order throughout.
