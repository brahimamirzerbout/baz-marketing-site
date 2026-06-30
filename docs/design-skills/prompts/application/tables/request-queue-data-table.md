# Request Queue Data Table

Create an application data table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the table component code.

**Top metadata row.** At the very top, place a horizontal row. On the left, show a total count label with a bold numeric value and a small trailing info icon (such as "Total items: 43,436"). On the right, place a rounded search input with a leading search icon and placeholder text.

**Action bar.** Directly below the metadata row, place a second horizontal bar. On the left, place two secondary outlined dropdown buttons labeled "Actions" and "Filters" (the filters button includes a funnel icon). On the right, grouped on the same baseline, place a compact primary "+ Add item" button with a item-plus icon, a secondary outlined "Table settings" button with a gear icon, and a secondary outlined "Hide fields" button with an eye-slash icon.

**Table header row.** The table header row contains: a header checkbox; an ID column; a request-by column; a subject column; a priority column; an agent column; a create-date column with a sort icon; a status column; and an empty actions column.

**Table body rows.** Each body row begins with a row checkbox. The ID cell shows a item identifier prefixed with a hash symbol. The request-by and agent cells each stack a small circular avatar, a bold name, and a smaller secondary email beneath the name. The subject cell shows plain text. The priority cell holds a pill badge with a short priority label (such as high, medium, or low) in distinct color treatments. The create-date cell pairs a calendar icon with a formatted date. The status cell holds a pill badge with a leading icon and short status label (such as pending or solved). The actions cell holds a small icon-only horizontal ellipsis button.

**Sample data rule.** Populate the table body with exactly ten sample item rows of realistic placeholder data. Vary item IDs, requesters, subjects, priorities, agents, dates, and status badges across rows.

**Row actions menu rule.** The horizontal ellipsis trigger in each row must open a workable dropdown menu anchored to the trigger. The menu lists exactly three items in this order: Archive item, Edit item, and Delete item. Each item shows a leading icon on the same baseline as its label; Delete item uses destructive text and icon coloring per the design system.

**Action dots trigger rule.** Icon-only ellipsis triggers (vertical or horizontal three-dot buttons) must be exactly 36px wide and 36px tall, with the dots icon centered vertically and horizontally inside the button, and md border-radius (12px per radius.md) on the trigger surface.

**Row actions dropdown styling rule.** Style the menu per the design-system dropdown specs: the menu container uses neutral-primary-soft background, a 1px border-default border, shadow-lg, md radius (12px per radius.md), and 8px padding on all sides. Each menu item is a full-width inline-flex nav row with 8px padding on all sides and md radius (12px per radius.md); use 14px medium body text, a 16×16px leading icon, and an 8px gap between icon and label. Item hover state uses neutral-tertiary-medium background and heading text color.

Clicking the trigger toggles the menu; clicking outside or pressing Escape closes it. Selecting any item closes the menu and executes that row action.

**Footer row.** Below the table body, place a footer bar. On the left, place a "Rows per page" label with a dropdown selector, followed by a range summary (such as "1–10 of 8967"). On the right, place "Previous" and "Next" buttons each with a directional arrow icon.

**Interaction behavior.** Bulk actions and filters open dropdown menus. Sortable create-date header toggles sort direction on click.

**Sizing and typography rules.** Use tabular numerals for IDs and counts. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight. Stacked identity cells (name with email beneath) described elsewhere in this prompt are the only exception.

**Mobile header rule.** On narrow viewports stack the item header like the advanced items table: total item count above a full-width search field; bulk Actions and Filters buttons in one two-column grid; Add item, Table settings, and Hide fields in a second two-column grid; footer Previous and Next buttons share a paired row. The table scrolls horizontally. Agent and request-by cells may collapse to avatar plus name only, hiding the email line. Preserve reading order throughout.
