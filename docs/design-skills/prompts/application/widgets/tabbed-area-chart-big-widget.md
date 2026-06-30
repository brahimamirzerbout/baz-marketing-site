# Tabbed Area Chart Big Widget

Create an application dashboard **big widget** as a self-contained surface card with a fixed canvas of 1024 pixels wide by 640 pixels tall. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container measuring 1024×640 pixels with 24 pixels of internal padding, 12 pixels of medium (md) corner radius, primary surface background, optional 1 pixel border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a 28-pixel large bold metric (such as "657.3k") above a muted label (such as "Total revenue"). On the right end, place a segmented timeframe control (such as "Daily", "Weekly", "Monthly") with "Weekly" active.

**Tab navigation.** Below the header, render a horizontal icon tab bar with items such as Home, Settings, My account, Downloads, and Support. Highlight the active tab (such as Settings) with brand-colored text and a bottom border indicator.

**Chart body.** Fill the remaining canvas height with a responsive dual-series area chart plotting seven monthly date buckets (such as Jan 31 through Jul 31). Use an inverted y-axis with currency labels from $0 at the top down to $20,000 at the bottom. Render a solid brand primary line with gradient fill and a lighter secondary line beneath it with a faint fill. Keep horizontal grid lines muted.

**Footer row.** At the bottom left, place an outlined "View report" button with an eye icon.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Data binding.** Store datasets in typed constants or reactive state. Interactive controls (segmented time ranges, tabs, toggles, checkboxes, or dropdowns) must update the values shown in the chart, map, or summary metrics — not just restyle the UI.

**Sizing rules.** The widget canvas is exactly 1024×640 pixels. Use tabular numerals throughout.

**Button padding rule.** Every labeled action button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** Preserve the 1024-pixel canvas inside a horizontally scrollable preview frame. Preserve reading order throughout.
