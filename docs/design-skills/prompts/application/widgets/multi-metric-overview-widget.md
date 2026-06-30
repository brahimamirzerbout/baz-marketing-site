# Multi-Metric Overview Widget

Create an application dashboard **big widget** as a self-contained surface card with a fixed width of 1024 pixels and auto height sized to its content. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container measuring 1024 pixels wide with auto height sized to content, 24 pixels of internal padding, 12 pixels of medium (md) corner radius, primary surface background, optional 1 pixel border, and optional subtle elevation shadow.

**Header row.** Span four equal summary metric columns across the full width. Each column stacks a large bold value (such as "475", "657.8k", "849.7", or "04:14"), a colored trend badge (such as "+ 78%" or "- 10%"), an info- augmented comparison line (such as "vs last day" or "vs last month"), and a muted metric label (such as "Live users", "Visitors", "Views", or "Avg time on site"). Separate the header from the body with a thin horizontal divider below it.

**Multi-chart row.** Below the header divider, divide the canvas into four columns separated by vertical dividers. The first three columns are equal-width sparkline panels labeled Visits, Revenue, and Customers. Each panel shows a section title, a trend badge, a bold metric value (such as "163.4k"), and a responsive mini area chart with smooth brand stroke and gradient fill sized to its content — do not stretch the row to fill unused vertical space. The fourth column on the right shows a device breakdown: three device icons (Desktop, Mobile, Tablet) with percentage and count values, a horizontal segmented comparison bar, and a three-item dot legend beneath.

**Footer row.** At the bottom, separated by a thin divider, place a horizontal footer with space between regions. On the left, place an outlined "View report" button with an eye icon. On the right end, place a bordered date-range picker trigger (such as "Dec 31 - Jan 31" with calendar icon and chevron).

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget canvas is 1024 pixels wide with auto height sized to content — do not force a fixed 640-pixel canvas. Use tabular numerals for all metrics.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** Preserve the 1024-pixel width inside a horizontally scrollable preview frame. Preserve reading order throughout.
