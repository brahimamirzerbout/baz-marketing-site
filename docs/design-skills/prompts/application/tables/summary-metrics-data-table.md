# Summary Metrics Data Table

Create an application data table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the table component code.

**Summary header row.** At the top of the component, place a horizontal header bar. On the left, show inline summary metrics as short label–value pairs on the same baseline (such as a total item count and a total sales figure, each value in a heavier weight). On the right, grouped on the same baseline, place a compact primary action button with a plus icon and a short label (such as "Add new item"), a secondary outlined button with a sync or refresh icon and a progress-style label (such as "Update stock 1/250"), and a secondary outlined export button with an export icon.

**Table header row.** Below the summary header, place a table whose header row contains: a header checkbox for select-all; a item column; a category column; a stock column with a sort icon; a sales-per-day column with a sort icon; a sales-per-month column; a rating column with a sort icon; a revenue column with a sort icon; and an empty actions column.

**Table body rows.** Each body row begins with an individual row checkbox. The item cell pairs a small document or thumbnail icon with the item name on the same baseline. The category cell holds a light pill badge with a short category label. The stock cell pairs a small colored status dot (green for high, orange for medium, red for low) with a formatted integer count. Sales-per-day and sales-per-month cells show decimal values. The rating cell shows a row of five star icons (filled through the score, empty for the remainder) followed by a numeric rating value. The revenue cell shows a formatted currency amount. The actions cell holds a small icon-only vertical ellipsis button for a row menu.

**Sample data rule.** Populate the table body with exactly ten sample rows of realistic placeholder data. Vary item names, categories, stock levels, ratings, and revenue values across rows.

**Row actions menu rule.** The vertical ellipsis trigger in each row must open a workable dropdown menu anchored to the trigger. The menu lists exactly three items in this order: Archive item, Edit item, and Delete item. Each item shows a leading icon on the same baseline as its label; Delete item uses destructive text and icon coloring per the design system.

**Action dots trigger rule.** Icon-only ellipsis triggers (vertical or horizontal three-dot buttons) must be exactly 36px wide and 36px tall, with the dots icon centered vertically and horizontally inside the button, and md border-radius (12px per radius.md) on the trigger surface.

**Row actions dropdown styling rule.** Style the menu per the design-system dropdown specs: the menu container uses neutral-primary-soft background, a 1px border-default border, shadow-lg, md radius (12px per radius.md), and 8px padding on all sides. Each menu item is a full-width inline-flex nav row with 8px padding on all sides and md radius (12px per radius.md); use 14px medium body text, a 16×16px leading icon, and an 8px gap between icon and label. Item hover state uses neutral-tertiary-medium background and heading text color.

Clicking the trigger toggles the menu; clicking outside or pressing Escape closes it. Selecting any item closes the menu and executes that row action.

**Footer row.** Below the table body, place a footer bar. On the left, show a range summary (such as "Showing 1–10 of 1000"). On the right, place compact pagination with previous and next arrow buttons flanking a current- page indicator (such as "1 of 99").

**Interaction behavior.** The header checkbox toggles selection on all visible rows. Individual row checkboxes toggle that row's selected state. Column headers with sort icons toggle ascending and descending sort on click. The row ellipsis opens the Archive item, Edit item, and Delete item menu described above.

**Sizing and typography rules.** Use tabular numerals for all numeric and currency columns. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight.

**Mobile header rule.** On narrow viewports stack the summary header into one column: summary metrics (total count and total sales) stay on a compact shared row with reduced gap; the primary "Add new item" button spans the full width below the metrics; the Update stock and Export secondary buttons share one row in a two-column equal-width grid. The table scrolls horizontally inside its container. Preserve reading order throughout.
