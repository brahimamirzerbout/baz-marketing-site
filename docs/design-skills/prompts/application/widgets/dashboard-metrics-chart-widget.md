# Dashboard Metrics Chart Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, group a circular icon badge (such as a users or leads glyph) beside a stacked block: a large bold primary metric value (such as "3.8k") using tabular numerals, and a short metric label beneath it (such as "Leads generated per week") in a muted secondary weight. On the right end, place a compact delta badge with a directional trend icon and percentage (such as "+24%") using a positive semantic color treatment. Separate the header from the body with a thin horizontal divider below it.

**Secondary stat row.** Below the header, place a horizontal row with space between two inline stat pairs. Each pair shows a muted label followed by a bold value on the same baseline (such as "Money spent: $3,423" and "Conversion rate: 0.3%"). Use tabular numerals for all numeric values.

**Chart body.** Below the secondary stat row, fill the remaining canvas height with a responsive grouped vertical bar chart spanning seven time buckets labeled Mon through Sun on the x-axis. Each bucket contains two adjacent bars rendered as a pair: a solid brand-colored primary bar and a lighter secondary bar beside it. Give every bar rounded top corners where the library supports it. Omit horizontal and vertical grid lines; keep the chart area minimal with no y-axis labels if space is tight. Enable tooltips on hover.

**Footer row.** Below the chart, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron opening preset ranges and Custom period). On the right, place a compact text link to a detailed report (such as "Users report" with a trailing chevron icon).

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Use tabular numerals for all metrics. Chart series colors, badge treatments, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, stack the header vertically with icon and metric block first and trend badge beneath or aligned to the right of the metric, stack the secondary stat row into two lines, scale the chart to full card width, and stack the footer with period dropdown above the report link. Preserve reading order throughout.
