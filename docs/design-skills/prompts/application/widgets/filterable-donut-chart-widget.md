# Filterable Donut Chart Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, place a widget title (such as "Website traffic") with a small trailing info icon button on the same baseline. On the right end, place an icon-only download or export button with an accessible label. Separate the header from the body with a thin horizontal divider below it.

**Filter row.** Below the header, place a horizontal row of three checkbox controls labeled Desktop, Tablet, and Mobile sitting side by side with consistent spacing. Each checkbox uses a rounded square control with a visible label beside it.

**Chart body.** Below the filter row, center a responsive donut or ring chart with a hollow center. Divide the ring into four segments using progressively lighter shades of a single brand hue. In the center hole of the donut, stack a large bold primary value (such as "65.4%") using tabular numerals above a short label (such as "Unique visitors") in a muted secondary weight. Enable segment tooltips on hover.

**Legend grid.** Below the chart, place a two-by-two grid of legend entries. Each entry shows a small colored circle matching a chart segment, a category label, and a formatted value on the same baseline (such as "Sponsor: $13.5k", "Direct: $13.5k", "E-mail: $13.5k", and "Affiliate: $13.5k").

**Footer row.** Below the legend, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron). On the right, place a compact text link to a detailed report (such as "Website report" with a trailing chevron icon).

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Data binding.** Store datasets in typed constants or reactive state. Interactive controls (segmented time ranges, tabs, toggles, checkboxes, or dropdowns) must update the values shown in the chart, map, or summary metrics — not just restyle the UI.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Use tabular numerals for percentages and legend values. Colors, borders, chart treatments, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px. Icon-only download and info buttons use equal compact padding on all sides instead.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, use 16-pixel card padding on mobile and small screens, the filter checkboxes wrap to a second row if needed. The donut chart scales down while keeping the center label legible. The legend grid collapses to a single column. The footer stacks period dropdown above the report link. Preserve reading order throughout.
