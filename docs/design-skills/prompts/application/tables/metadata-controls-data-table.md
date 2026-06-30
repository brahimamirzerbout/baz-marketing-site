# Metadata Controls Data Table

Create an application data table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the table component code.

**Top metadata row.** At the very top, place a horizontal row. On the left, show a total count label with a bold numeric value and a small trailing info icon. On the right, place a rounded search input with a leading search icon and placeholder text (such as "Search for items").

**Action bar.** Directly below the metadata row, place a second horizontal bar. From 640px screen width upward (the small breakpoint / `sm:`), keep Actions and Filters on the left as one inline cluster, and Add item, Table settings, and Hide fields on the right as a second inline cluster (`justify-between` or equivalent space-between layout on the same row). On the right cluster only: primary "Add item" with a plus icon, secondary "Table settings" with a gear icon, and secondary "Hide fields" with an eye-slash icon. The Hide fields button is visible on large screens only — hide it on mobile and tablet (below the large-screen breakpoint, such as `hidden` until `lg:` / 1024px).

**Table header row.** Below the action bar, place a table whose header row contains: a header checkbox; a items column; a item-role column; a status column; a social-profile column; a promote column with a small trailing info icon in the header; a rating column; a last-login column; and an empty actions column.

**Table body rows.** Each body row begins with an individual row checkbox. The items cell stacks a small circular avatar, a bold name, and a smaller secondary email beneath the name. The role cell holds a pill badge with a leading icon and role label. The status cell pairs a colored dot with a short status label. The social-profile cell shows a horizontal row of small monochrome brand icons only (such as Facebook, GitHub, Google, LinkedIn, or X) — plain icon glyphs with no circular button wrapper, border, or text abbreviation badges; show only the networks relevant to each row. The promote cell holds a toggle switch (on or off per row). The rating cell pairs a numeric value with a small trend arrow. The last-login cell pairs a clock icon with relative time text (such as "Today" or "Last week"). The actions cell holds a small icon-only horizontal ellipsis button.

**Sample data rule.** Populate the table body with exactly ten sample rows of realistic placeholder data. Vary item names, roles, statuses, social icons, toggle states, ratings, and last-login values across rows.

**Row actions menu rule.** The horizontal ellipsis trigger in each row must open a workable dropdown menu anchored to the trigger. The menu lists exactly three items in this order: Archive item, Edit item, and Delete item. Each item shows a leading icon on the same baseline as its label; Delete item uses destructive text and icon coloring per the design system.

**Action dots trigger rule.** Icon-only ellipsis triggers (vertical or horizontal three-dot buttons) must be exactly 36px wide and 36px tall, with the dots icon centered vertically and horizontally inside the button, and md border-radius (12px per radius.md) on the trigger surface.

**Row actions dropdown styling rule.** Style the menu per the design-system dropdown specs: the menu container uses neutral-primary-soft background, a 1px border-default border, shadow-lg, md radius (12px per radius.md), and 8px padding on all sides. Each menu item is a full-width inline-flex nav row with 8px padding on all sides and md radius (12px per radius.md); use 14px medium body text, a 16×16px leading icon, and an 8px gap between icon and label. Item hover state uses neutral-tertiary-medium background and heading text color.

Clicking the trigger toggles the menu; clicking outside or pressing Escape closes it. Selecting any item closes the menu and executes that row action.

**Footer row.** Below the table body, place a footer bar. On the left, place a "Rows per page" label with a dropdown selector, followed by a range summary (such as "1–10 of 8967"). On the right, place "Previous" and "Next" buttons each with a directional arrow icon.

**Interaction behavior.** Bulk "Actions" and "Filters" dropdowns open menus above or below their triggers. Toggle switches change state on click. Column visibility is controlled through the hide-fields control.

**Sizing and typography rules.** Use tabular numerals for counts and ratings. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight. Stacked identity cells (name with email beneath) described elsewhere in this prompt are the only exception.

**Mobile header rule.** Below 640px screen width (mobile only), stack the metadata and action regions vertically with tighter padding: the total-items count sits above a full-width search field; below that, split the action bar into two rows — bulk-action buttons (Actions, Filters) in one two-column equal-width grid, then management buttons (Add item, Table settings) in a second two-column equal-width grid. Omit Hide fields on mobile and tablet; it appears only from the large-screen breakpoint upward. From 640px width upward, return to one action row with Actions and Filters aligned left and Add item, Table settings, and Hide fields aligned right. Footer pagination controls (Previous, Next) share a paired two-column row.

The table scrolls horizontally. Preserve reading order throughout.
