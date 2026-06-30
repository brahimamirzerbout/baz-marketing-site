# Filterable Management Data Table

Create an application data table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the table component code.

**Page title row.** At the top, place a bold page title on the left (such as "All items"). On the right, grouped on the same baseline, place two secondary outlined buttons: one with a list icon and a view-mode label, and one with an export icon and an export label.

**Search and filter bar.** Below the title row, place a horizontal control bar. On the left, place a wide search input with placeholder text (no separate search submit button). Continuing on the same row, place a filter dropdown button with a funnel icon, a configurations button with a gear icon, and a compact primary "Add item" button anchored to the far right.

**Status radio filter row.** Directly above the table, place a horizontal "Show only:" label followed by a row of radio-style filter options (such as All, Active items, Pending items, Inactive items) sitting side by side on the same baseline with one option visually selected.

**Table header row.** The table header row contains column labels for: item; category; brand; price with a sort icon; stock with a sort icon; total sales with a sort icon; status; and an empty actions column.

**Table body rows.** Each body row is separated by a thin horizontal divider. The item cell pairs a small placeholder image icon with the item name. Category and brand cells show plain text. Price, stock, and total sales cells show formatted numeric values. The status cell holds a pill badge with a short status label (such as active, inactive, or suspended). The actions cell holds a small icon-only vertical ellipsis button.

**Sample data rule.** Populate the table body with exactly ten sample rows of realistic placeholder data. Vary item names, brands, prices, stock counts, sales totals, and status badges across rows.

**Row actions menu rule.** The vertical ellipsis trigger in each row must open a workable dropdown menu anchored to the trigger. The menu lists exactly three items in this order: Archive item, Edit item, and Delete item. Each item shows a leading icon on the same baseline as its label; Delete item uses destructive text and icon coloring per the design system.

**Action dots trigger rule.** Icon-only ellipsis triggers (vertical or horizontal three-dot buttons) must be exactly 36px wide and 36px tall, with the dots icon centered vertically and horizontally inside the button, and md border-radius (12px per radius.md) on the trigger surface.

**Row actions dropdown styling rule.** Style the menu per the design-system dropdown specs: the menu container uses neutral-primary-soft background, a 1px border-default border, shadow-lg, md radius (12px per radius.md), and 8px padding on all sides. Each menu item is a full-width inline-flex nav row with 8px padding on all sides and md radius (12px per radius.md); use 14px medium body text, a 16×16px leading icon, and an 8px gap between icon and label. Item hover state uses neutral-tertiary-medium background and heading text color.

Clicking the trigger toggles the menu; clicking outside or pressing Escape closes it. Selecting any item closes the menu and executes that row action.

**Footer summary bar.** Below the table body, place a footer bar split into two regions. On the left, show two inline summary metrics as label–value pairs (such as purchase price and total selling price, each value in a heavier weight). On the right, place text-style action links (such as "Print" and "Duplicate") followed by a compact primary "Export CSV" button.

**Interaction behavior.** Radio filters narrow visible rows by status. Sortable column headers toggle sort direction on click. The row ellipsis opens the Archive item, Edit item, and Delete item menu described above.

**Sizing and typography rules.** Use tabular numerals for all numeric and currency values. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight.

**Mobile header rule.** On narrow viewports consolidate the header into stacked bands instead of scattered wraps: the "All items" title and the View list / Export buttons share one row (title left, paired buttons in a two-column grid on the right or below on the smallest widths); the item search input spans full width on the next row; the primary Add item button spans full width, with Filter and Configurations secondary buttons grouped in a two-column grid beneath it; the "Show only:" status radio filters scroll horizontally in one line rather than wrapping. Footer summary metrics stack vertically on the left; Print, Duplicate, and Export CSV actions use a merged two-column grid with Export CSV spanning full width when alone on the last row. The table scrolls horizontally inside its container. Preserve reading order throughout.
