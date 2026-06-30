# Monthly Task Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Month navigation header.** At the very top of the panel, place a month navigation row with comfortable vertical padding. Center a bold month-and-year label (such as "August, 2025") in the middle. On the left and right, place small circular icon-only previous and next arrow buttons with a light neutral background, each containing a chevron icon, all on the same baseline as the month label.

**Daily task list.** Below the month header, stack a vertical scrollable list of daily entries separated by thin horizontal dividers. Each daily entry is a horizontal row with the date block and task summary card vertically centered. The date block on the left is a compact rounded neutral container composed of three stacked lines: the year in a smaller lighter weight on top (such as "2025"), the day number in a large bold weight in the middle (such as "1"), and the abbreviated month in a medium weight on the bottom (such as "AUG"). The task summary card on the right fills the remaining row width and uses the same card pattern as accent-tinted containers with a soft background, a thin outer border, and a thick solid left-edge accent border (approximately 4 pixels).

Days with tasks use the brand accent family: soft brand background, brand left border, brand icon and text, and a summary line such as "You have **4 tasks**" with the task count in bold, plus an underlined "See all" text link on the line below — both lines inside the same card beside a small leading clipboard or task icon. Days with no tasks use the secondary brand accent family: soft secondary-tinted background, secondary left border, and secondary-toned icon and text showing a single summary line such as "No tasks for today" with no "See all" link.

**Interaction behavior.** The previous and next arrow buttons navigate to adjacent months, updating the month label and daily list content. The "See all" links navigate to the detailed task list for that day. Daily entries may be clickable to navigate to that day's detail view.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. Date blocks are left-aligned at a consistent width. Task summary cards sit beside the date block with consistent horizontal gap and generous internal padding. Populate the list with enough daily entries to exceed viewport height so it scrolls vertically within the panel, while the month navigation header remains sticky at the top.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
