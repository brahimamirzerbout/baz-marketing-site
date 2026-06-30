# Large Grouped Vertical Bar Chart Widget

Create an application dashboard **big widget** as a self-contained surface card with a fixed width of 1024 pixels and auto height sized to its content. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container measuring 1024 pixels wide with auto height sized to content, 24 pixels of internal padding, 12 pixels of medium (md) corner radius, primary surface background, optional 1 pixel border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a 28-pixel large bold currency metric (such as "$401,857") beside a positive trend badge (such as "↑ 10%") with a muted subtitle beneath (such as "Total revenue for flowbite.com"). On the right end, place a bordered date-range picker trigger (such as "Dec 31 - Jan 31" with calendar icon and chevron).

**Chart body.** Below the header, place a responsive grouped vertical bar chart sized to its content — do not stretch the chart to fill unused vertical space. Plot seven day buckets labeled Mon through Sun on the x-axis with a linear y-axis up to roughly 2500. Each day contains three adjacent bars representing Templates (solid brand), Icons (medium brand tint), and Illustrations (pale brand tint). Give every bar rounded top corners. Keep horizontal grid lines muted.

**Legend row.** Center a three-item legend beneath the chart with colored dots for Templates, Icons, and Illustrations.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Data binding.** Store datasets in typed constants or reactive state. Interactive controls (segmented time ranges, tabs, toggles, checkboxes, or dropdowns) must update the values shown in the chart, map, or summary metrics — not just restyle the UI.

**Sizing rules.** The widget canvas is 1024 pixels wide with auto height sized to content — do not force a fixed 640-pixel canvas. Use tabular numerals for currency and axis values.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** Preserve the 1024-pixel width inside a horizontally scrollable preview frame. Preserve reading order throughout.
