# Distribution Pie Chart Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a widget title (such as "Website Traffic") in a semibold weight above a muted period subtitle (such as "Last 30 days"). On the right end, place an icon-only overflow or options menu button opening a dropdown with items such as Edit widget, Download data, and Delete widget. Separate the header from the body with a thin horizontal divider below it.

**Chart body.** Below the header, center a responsive pie chart occupying the main visual area. Divide the circle into three segments using progressively lighter shades of a single brand hue. Render white or high-contrast labels centered inside each slice showing the category name and percentage (such as "Direct 50%", "Search 30%", and "Referrals 20%").

**Legend row.** Below the chart, place a centered horizontal legend with three items sitting side by side. Each item shows a small colored circle matching a slice followed by a category label.

**Footer row.** Below the legend, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron). On the right, place a compact text link to a detailed report (such as "Users report" with a trailing chevron icon).

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Use tabular numerals for percentages. Chart segment colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px. Icon-only menu buttons use equal compact padding on all sides instead.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, use 16-pixel card padding on mobile and small screens, the legend wraps to multiple rows. The pie chart scales down while keeping in-slice labels legible or falls back to an external legend on very narrow widths. The footer stacks period dropdown above the report link. Preserve reading order throughout.
