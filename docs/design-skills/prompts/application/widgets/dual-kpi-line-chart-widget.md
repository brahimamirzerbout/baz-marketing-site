# Dual KPI Line Chart Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, group two KPI blocks side by side with consistent horizontal spacing between them. Each block stacks a muted label with a small trailing info icon button on the same baseline (such as "Clicks" and "CPC") above a large bold metric value (such as "234,5K" and "$1.20") using tabular numerals. On the right end, place a bordered period dropdown trigger (such as "Last week" with a trailing chevron). Separate the header from the body with a thin horizontal divider below it.

**Chart body.** Below the header, fill the remaining canvas height with a responsive dual-series smooth line chart. Render one thick brand-colored primary line and one thinner pale secondary line, both using curved interpolation rather than sharp angles. Include muted horizontal dashed grid lines across the plot area but omit vertical grid lines. Label the x-axis with short date stamps (such as "Jan 21" through "Jan 27") rotated slightly for readability when space is tight.

**Footer row.** Below the chart, separated by a thin horizontal divider above it, place a secondary outlined button on the left labeled "View report" with a small leading eye icon on the same baseline.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Use tabular numerals for all metrics. Chart line weights, grid treatments, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px. Icon-only info buttons use equal compact padding on all sides instead.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, use 16-pixel card padding on mobile and small screens, stack the header vertically: the two KPI blocks side by side on the first row when space allows, period dropdown on the second row spanning full width. The chart scales to full card width. Preserve reading order throughout.
