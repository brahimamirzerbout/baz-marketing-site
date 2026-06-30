# Segmented Metrics Area Chart Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a widget title (such as a domain name) in a semibold weight above a muted date-range subtitle (such as "31 Nov – 31 Dec") using tabular numerals where applicable. On the right end, place a secondary outlined "Export" button. Separate the header from the body with a thin horizontal divider below it.

**Channel toggle.** Below the header, place a segmented control or toggle button group with two options (such as "Organic" and "Paid") sharing one connected bordered container. Highlight the active segment with a filled background treatment. Do not add drop shadows to the segmented control.

**Metric rows.** Below the toggle, render three horizontal metric rows separated by thin horizontal dividers between rows. Each row is a horizontal strip with space between regions: on the left, a full-width single-series inline area chart that fills the remaining row width before the metrics block. Render one trend line with a matching gradient fill beneath it in a semantic color (green for positive metrics, red for negative), using straight line segments with no axes and no grid lines; on the right, a stacked block with twenty-four pixels of horizontal spacing from the area chart, containing a muted label (such as "Users", "Customers", or "Revenue"), a large bold value (such as "232.7k", "238", or "$4268") using tabular numerals, and a delta line with a directional arrow and comparison text (such as "2% vs last month") colored to match the trend direction.

**Footer row.** Below the metric rows, separated by a thin horizontal divider above it, place a secondary outlined button on the left labeled "View report" with a small leading eye icon on the same baseline.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Data binding.** Store datasets in typed constants or reactive state. Interactive controls (segmented time ranges, tabs, toggles, checkboxes, or dropdowns) must update the values shown in the chart, map, or summary metrics — not just restyle the UI.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Use tabular numerals for all numeric values. Area chart gradient fills, segmented control treatments, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, use 16-pixel card padding on mobile and small screens. The header stacks title and export button vertically. Each metric row keeps the area chart and values on one row when possible; otherwise stack the area chart above values. Preserve reading order throughout.
