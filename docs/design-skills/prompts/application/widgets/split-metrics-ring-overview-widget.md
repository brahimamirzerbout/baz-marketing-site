# Split Metrics Ring Overview Widget

Create an application dashboard **big widget** as a self-contained surface card with a fixed width of 1024 pixels and auto height sized to its content. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container measuring 1024 pixels wide with auto height sized to content, 24 pixels of internal padding, 12 pixels of medium (md) corner radius, primary surface background, optional 1 pixel border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a widget title (such as "Website performance") beside a positive trend badge (such as "↑ 10%") with a muted subtitle beneath (such as "Last month website stats"). On the right end, place a domain dropdown trigger (such as "flowbite.com" with chevron).

**Split body.** Below the header, divide the canvas into two regions sized to content — do not stretch the body to fill unused vertical space. On the left, render a two-row by three-column metric grid with thin internal dividers. Each cell shows a large bold value (such as "163.4M", "$768k", or "6,567"), a muted label beneath (such as "Website visits" or "Monthly revenue"), and a compact delta indicator aligned to the right using success or danger semantic colors (such as "1,45% ↑" or "1,12% ↓"). On the right, center a responsive multi-ring concentric chart with four partial arcs in progressively lighter brand shades.

**Footer row.** At the bottom, place a period dropdown trigger on the left (such as "Last 7 days" with chevron) and a "View full report" text link with trailing chevron on the right.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget canvas is 1024 pixels wide with auto height sized to content — do not force a fixed 640-pixel canvas. Populate all six metric cells. Use tabular numerals throughout.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** Preserve the 1024-pixel width inside a horizontally scrollable preview frame. Preserve reading order throughout.
