# Item Workflow Data Table

Create an application data table as a self-contained component. Do not generate any surrounding page shell beyond what is described below; do not render side navigation or global chrome unrelated to the table block.

**Breadcrumb and title row.** At the top, place a breadcrumb trail on its own line (such as Home > E-commerce > items). Below the breadcrumb, place a horizontal row with a large bold page title on the left (such as "All items") and a compact primary "Add new item" button on the right. Do not wrap this header block in a separate bordered card; it sits directly above the table card.

**Table card toolbar.** Inside the table card, place a horizontal toolbar row at the top. On the left, place a wide search field (such as placeholder "Search"). On the right, place three compact secondary dropdown buttons on the same baseline: Filter (with a leading filter icon), Due date, and Options (for column or display settings).

**Quick-filter strip.** Below the toolbar, place a secondary strip with a soft neutral background and a bottom border. On the left, place a "Show only:" label followed by a row of radio-style quick filters (such as All, In progress, Completed, In review, Cancelled) with one option selected. Anchor an "Actions" dropdown button to the far right of this strip.

**Table header row.** The table header row contains: a header checkbox; a item column; a status column; a items column; a progress column; a preview column; a time-tracking column; a due-date column; and an empty actions column.

**Table body rows.** Each body row begins with a row checkbox. The item cell shows a truncated item name as a brand-colored text link (not plain body text). The status cell holds a pill badge with a leading icon and short status label (such as in progress, completed, in review, or cancelled). The items cell shows one or more small circular avatars; when multiple assignees exist, stack overlapping avatars with a "+N" overflow indicator. The progress cell pairs a horizontal progress bar with a percentage label. The preview cell holds a 36×36px icon-only eye button with md border-radius (12px per radius.md) for opening a item preview. The time-tracking cell is a single inline pill chip with pill border-radius (9999px per radius.base), a 1px border, and soft neutral fill — no shadow; this is a display container, not a button. Inside the chip: a leading clock icon, an elapsed time value in semibold tabular numerals, an optional estimated duration prefixed with a slash in softer body color (such as semibold "6:47" followed by "/8:00"), and a trailing circular play or pause control embedded inside the same chip (28×28px rounded-full icon button with success-soft fill and play icon when stopped, warning-soft fill and pause icon when active). When elapsed time equals the estimate or the item is complete, show only the final elapsed value without the slash estimate (such as "8:00"). The due-date cell pairs a calendar icon with a date or relative label (such as "Tomorrow"). The actions cell holds a small icon-only ellipsis button.

**Sample data rule.** Populate the table body with exactly ten sample item rows of realistic placeholder data. Vary item names, statuses, assignees, progress values, time-tracking states, and due dates across rows.

**Row actions menu rule.** The ellipsis trigger in each row must open a workable dropdown menu anchored to the trigger. The menu lists exactly three items in this order: Archive item, Edit item, and Delete item. Each item shows a leading icon on the same baseline as its label; Delete item uses destructive text and icon coloring per the design system.

**Action dots trigger rule.** Icon-only ellipsis triggers (vertical or horizontal three-dot buttons) must be exactly 36px wide and 36px tall, with the dots icon centered vertically and horizontally inside the button, and md border-radius (12px per radius.md) on the trigger surface.

**Row actions dropdown styling rule.** Style the menu per the design-system dropdown specs: the menu container uses neutral-primary-soft background, a 1px border-default border, shadow-lg, md radius (12px per radius.md), and 8px padding on all sides. Each menu item is a full-width inline-flex nav row with 8px padding on all sides and md radius (12px per radius.md); use 14px medium body text, a 16×16px leading icon, and an 8px gap between icon and label. Item hover state uses neutral-tertiary-medium background and heading text color.

Clicking the trigger toggles the menu; clicking outside or pressing Escape closes it. Selecting any item closes the menu and executes that row action.

**Footer row.** Below the table body, place a footer bar. On the left, show an activity log line (such as "Last account activity: 2 hours ago"). On the right, place compact pagination with previous and next arrows flanking a current-page indicator (such as "1 of 99").

**Interaction behavior.** Quick-filter radios narrow visible rows by status. Play/pause buttons toggle time tracking for that row. Toolbar and strip dropdown buttons open selection menus. The preview button triggers a preview action for that row.

**Sizing and typography rules.** Use tabular numerals for percentages and time values. Progress bar fill reflects the percentage value. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px. Icon-only preview controls and the embedded circular play/pause control inside the time-tracking pill are exempt from standard button padding.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight.

**Mobile header rule.** On narrow viewports consolidate the page header and table controls: the breadcrumb stays on its own line; the "All items" title stacks above a full-width Add new item button; inside the table card the search field spans full width, with Filter, Due date, and Options dropdowns in a two-column equal-width grid on the row below; the quick-filter strip stacks the "Show only:" radios (horizontal scroll on one line) above a full-width Actions dropdown. The table scrolls horizontally. The time-tracking pill may keep its embedded play/pause icon on mobile while the chip stays on one line. Preserve reading order throughout.
