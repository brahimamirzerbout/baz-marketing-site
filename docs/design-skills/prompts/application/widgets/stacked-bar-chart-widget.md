# Stacked Bar Chart Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, group a large bold primary metric value (such as "91.2k") using tabular numerals beside a compact positive trend indicator with a directional arrow and percentage (such as "↑ 10%") on the same baseline. Below that grouped row, place a short metric label (such as "Users this week") in a muted secondary weight. Separate the header from the body with a thin horizontal divider below it.

**Chart body.** Below the header, fill the remaining canvas height with a responsive stacked vertical bar chart spanning seven time buckets labeled Mon through Sun on the x-axis. Each bar is composed of three stacked segments in progressively lighter shades of a single brand hue, with the darkest segment at the bottom and the lightest at the top. Give the top segment rounded top corners. Omit grid lines.

**Legend row.** Below the chart, place a centered horizontal legend with three items sitting side by side. Each item shows a small colored circle followed by a series label (such as "Series 1", "Series 2", and "Series 3"). Legend dot colors must match the corresponding chart segment colors.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Use tabular numerals for all metrics. Chart segment colors, trend treatment, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, use 16-pixel card padding on mobile and small screens. The header keeps metric and trend inline when space allows. The chart scales to full card width. The legend wraps to multiple rows if needed. Preserve reading order throughout.
