# Metric Area Chart Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a large bold primary metric value (such as "867.4k") using tabular numerals above a short metric label (such as "Users this month") in a muted secondary weight. On the right end, place a compact positive trend indicator with a directional arrow and percentage (such as "↑ 10%") using a success semantic color. Separate the header from the body with a thin horizontal divider below it.

**Chart body.** Below the header, fill the remaining canvas height with a responsive smooth area chart. Render a brand-colored line with curved interpolation and fill the region beneath the line with a light gradient that fades into the card background toward the bottom. Omit axis labels and grid lines to keep the chart minimal and decorative.

**Footer row.** Below the chart, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron). On the right, place a compact text link to a detailed report (such as "Users report" with a trailing chevron icon).

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Use tabular numerals for all metrics. Chart gradient, trend color, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, use 16-pixel card padding on mobile and small screens. The header keeps metric and trend on one row when space allows; otherwise stack trend beneath the metric. The area chart spans full card width. The footer stacks period dropdown above the report link. Preserve reading order throughout.
