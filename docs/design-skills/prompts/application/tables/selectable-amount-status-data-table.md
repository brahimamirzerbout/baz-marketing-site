# Selectable Amount Status Data Table

Create an application data table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the table component code.

**Toolbar row.** At the top of the component, place a horizontal toolbar spanning the full width. On the left, place a wide search input field with a leading search icon and placeholder text (such as "Search for item"). On the right, grouped on the same baseline, place a compact primary "+ Add item" button, a secondary outlined "Filters" button with a funnel icon and trailing chevron, and a secondary outlined "Actions" button with a trailing chevron.

**Table header row.** Below the toolbar, place a table whose header row contains: a header checkbox; a item column; a due-date column with a sort icon; an amount column with a sort icon; a status column; and an actions column with a small trailing info icon in the header cell.

**Table body rows.** Each body row begins with a row checkbox. The item cell shows a descriptive label (such as a payer name or refund reference). The due-date cell pairs a calendar icon with a formatted date. The amount cell shows a formatted currency value; negative amounts include a leading minus sign. The status cell holds a pill badge with a short status label (such as completed, in progress, or failed). The actions cell holds two controls side by side: a secondary outlined "Actions" dropdown button and a solid destructive "Delete" button with a trash icon and the visible "Delete" text label — never icon-only.

**Row delete button rule.** The destructive delete button in each row must show both the trash icon and the "Delete" text label on the same baseline. Do not render the delete control as an icon-only button in this variant.

**Sample data rule.** Populate the table body with exactly ten sample item rows of realistic placeholder data. Vary item labels, dates, positive and negative amounts, and status badges across rows.

**Row actions menu rule.** The row-level Actions dropdown trigger in each row must open a workable dropdown menu anchored to the trigger. The menu lists exactly three items in this order: Archive item, Edit item, and Delete item. Each item shows a leading icon on the same baseline as its label; Delete item uses destructive text and icon coloring per the design system.

**Row actions dropdown styling rule.** Style the menu per the design-system dropdown specs: the menu container uses neutral-primary-soft background, a 1px border-default border, shadow-lg, md radius (12px per radius.md), and 8px padding on all sides. Each menu item is a full-width inline-flex nav row with 8px padding on all sides and md radius (12px per radius.md); use 14px medium body text, a 16×16px leading icon, and an 8px gap between icon and label. Item hover state uses neutral-tertiary-medium background and heading text color.

Clicking the trigger toggles the menu; clicking outside or pressing Escape closes it. Selecting any item closes the menu and executes that row action.

**Footer row.** Below the table body, place a footer bar. On the left, show a range summary (such as "Showing 1–10 of 1000"). On the right, place pagination controls composed of previous and next arrow buttons, individual numbered page buttons, and one page button visually highlighted as the current page.

**Interaction behavior.** The header checkbox toggles selection on all visible rows. Sortable column headers toggle ascending and descending sort on click. Row-level Actions dropdowns open the Archive item, Edit item, and Delete item menu described above. The delete button triggers a destructive action for that row.

**Sizing and typography rules.** Use tabular numerals for amounts and dates. Negative amounts are visually distinct from positive amounts through sign, color, or weight — follow the host design system's convention. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight.

**Mobile header rule.** On narrow viewports stack the toolbar into one merged column: the search field spans full width on the first row; the primary Add item button spans full width on the second row; Filters and Actions secondary buttons share one row in a two-column equal-width grid. The table scrolls horizontally. The delete button keeps its "Delete" label on all breakpoints; row Actions and delete controls may collapse into a single overflow menu on very narrow widths. Preserve reading order throughout.
