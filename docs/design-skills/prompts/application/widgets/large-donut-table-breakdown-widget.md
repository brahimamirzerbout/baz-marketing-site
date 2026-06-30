# Large Donut Table Breakdown Widget

Create an application dashboard **big widget** as a self-contained surface card with a fixed canvas of 1024 pixels wide by 640 pixels tall. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container measuring 1024×640 pixels with 24 pixels of internal padding, 12 pixels of medium (md) corner radius, primary surface background, optional 1 pixel border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a widget title (such as "Top items") beside a positive trend badge (such as "↑ 10%") on the same baseline, with a muted subtitle beneath (such as "Best selling items"). On the right end, place a bordered date-range picker trigger (such as "Dec 31 - Jan 31" with calendar icon and chevron). Separate the header from the body with a thin horizontal divider below it.

**Split body.** Below the header divider, fill the remaining canvas height with a two-column row vertically centered between the header and footer. On the left, place a large responsive donut chart wired to the same item dataset as the table. On the right, render a sortable three-column table with headers item, Sales, and Stock using the host design system's table primitives. Vertically center-align the donut and table with each other within the row so both sit midway between the header and footer rather than pinned to the top.

**Table rows.** Each item row includes a colored dot matching the donut segment, a small item icon placeholder, the item name (such as "MacBook PRO M4 Max"), a bold sales count using tabular numerals, and a stock cell showing a current-to-total ratio above a horizontal progress bar tinted warning, danger, or success depending on fill level.

**Footer row.** At the bottom left, place an outlined "View report" button with an eye icon.

**Chart and table implementation.** Wire the donut chart and table to one shared typed item dataset — not static illustrations. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Column headers must be sortable. Row hover highlights the matching chart segment and chart segment hover highlights the matching table row. Stock cells reflect real current-to-total values from the dataset. Enable segment tooltips with item name and sales count.

**Sizing rules.** The widget canvas is exactly 1024×640 pixels. Populate at least five item rows. Use tabular numerals for sales and stock values. The split body row must use flex alignment to vertically center the donut and table both relative to each other and within the space between the header and footer.

**Button padding rule.** Every labeled action button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** Preserve the 1024-pixel canvas inside a horizontally scrollable preview frame. Preserve reading order throughout.
