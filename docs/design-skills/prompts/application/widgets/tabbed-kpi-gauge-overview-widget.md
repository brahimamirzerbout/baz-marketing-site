# Tabbed KPI Gauge Overview Widget

Create an application dashboard **big widget** as a self-contained surface card with a fixed canvas of 1024 pixels wide by 640 pixels tall. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container measuring 1024×640 pixels with 24 pixels of internal padding, 12 pixels of medium (md) corner radius, primary surface background, optional 1 pixel border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a widget title (such as "Account overview") above a muted subtitle (such as "View key details and recent changes to your account"). On the right end, place a segmented timeframe control (such as "Daily", "Weekly", "Monthly") with "Weekly" active.

**Tab navigation.** Below the header, render a horizontal tab bar with icon-plus- label items (such as Overview, Support, Users, Projects, Finance). Highlight the active tab (such as Support) with brand-colored text and a bottom border indicator.

**KPI and gauge row.** Below the tabs, split the row horizontally. On the left, arrange four KPI blocks in a two-by-two grid. Each block shows a muted label, a large bold count using tabular numerals, a trend badge with directional arrow (such as "↑ 10.3%" or "↓ 2.44%"), and a comparison line with a clock icon (such as "vs 428 last 7 days"). The fourth KPI may show a satisfaction score (such as "4.7 of 5") with a smile icon and a "See all responses" link. On the right end, place a circular service-level gauge showing "87.6%" on a success- colored radial arc with "Service Level" label centered inside.

**Chart body.** Below the KPI row, fill the remaining width with a responsive responsive dual-series area chart plotting seven daily buckets (such as Jan 21 through Jan 27). Render a solid brand line with gradient fill plus a lighter secondary line beneath it. Keep horizontal grid lines muted and omit heavy axis chrome.

**Footer row.** At the bottom left, place an outlined "View report" button with an eye icon.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Data binding.** Store datasets in typed constants or reactive state. Interactive controls (segmented time ranges, tabs, toggles, checkboxes, or dropdowns) must update the values shown in the chart, map, or summary metrics — not just restyle the UI.

**Sizing rules.** The widget canvas is exactly 1024×640 pixels. Use tabular numerals throughout.

**Button padding rule.** Every labeled action button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** Preserve the 1024-pixel canvas inside a horizontally scrollable preview frame. Preserve reading order throughout.
