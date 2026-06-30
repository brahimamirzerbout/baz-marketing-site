# Expandable Detail Data Table

Create an application data table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the table component code.

**Title and toolbar row.** At the top, place a horizontal header. On the left, show a title with an inline result count and a small trailing info icon (such as "items" followed by a bold total). On the right, place the primary "Add item" button and the secondary outlined "Manage columns" button with a layout icon inline on the same baseline in a horizontal flex row with `align-items: center` (or equivalent such as `items-center`) and 16px gap between the two buttons (`gap-4` or `gap: 16px`). Use each button's natural compact width on desktop — do not stretch them to full width except on mobile (see mobile header rule).

**Filter bar.** Below the title row, place a horizontal filter bar. On the far left, place an "Actions" dropdown button. Continuing on the same row, place a series of filter dropdown buttons (such as Brand, Category, Price, and Color), each with a trailing chevron.

**Table header row.** The table header row contains: a header checkbox; an expand/collapse column with no label; a thumbnail column; item; category; brand; price; stock; total sales; and status.

**Collapsed table body rows.** Each body row begins with a row checkbox and a chevron icon indicating collapsed or expanded state. The thumbnail cell holds a small item-type icon. Remaining cells show item name, category, brand, formatted price, stock count, total sales count, and a status pill badge (active, inactive, or suspended).

**Sample data rule.** Populate the collapsed table body with exactly ten sample item rows of realistic placeholder data. Vary names, categories, brands, prices, stock, sales, and status badges across rows.

**Row actions menu rule.** Where a row includes a vertical ellipsis trigger, it must open a workable dropdown menu anchored to the trigger listing Archive item, Edit item, and Delete item in that order. Each item shows a leading icon on the same baseline as its label; Delete item uses destructive text and icon coloring per the design system.

**Action dots trigger rule.** Icon-only ellipsis triggers (vertical or horizontal three-dot buttons) must be exactly 36px wide and 36px tall, with the dots icon centered vertically and horizontally inside the button, and md border-radius (12px per radius.md) on the trigger surface.

**Row actions dropdown styling rule.** Style the menu per the design-system dropdown specs: the menu container uses neutral-primary-soft background, a 1px border-default border, shadow-lg, md radius (12px per radius.md), and 8px padding on all sides. Each menu item is a full-width inline-flex nav row with 8px padding on all sides and md radius (12px per radius.md); use 14px medium body text, a 16×16px leading icon, and an 8px gap between icon and label. Item hover state uses neutral-tertiary-medium background and heading text color.

Clicking the trigger toggles the menu; clicking outside or pressing Escape closes it. Selecting any item closes the menu and executes that row action.

**Expanded row detail panel.** When a row is expanded, render a full-width detail panel directly beneath that row spanning all columns. Inside the panel, stack from top to bottom: a horizontal image gallery of four rectangular item-image placeholders of equal width with consistent gutters; a multi-line descriptive paragraph of technical specifications; a responsive grid of small attribute cards (each card composed of a short label and a value, optionally with a small leading icon — such as item state, shipping region, color swatches as a row of circular color dots, brand, category, seller, dimensions, and weight); and a horizontal row of action buttons at the bottom-left (a primary "Edit item" button, a secondary outlined "Preview" button, and a destructive "Delete" button).

**Footer summary bar.** Below the table body, place a footer bar. On the left, show two inline summary metrics (purchase price and total selling price). On the right, place text-style links and a compact primary "Export CSV" button.

**Interaction behavior.** Clicking the row chevron toggles the expanded detail panel open or closed; the chevron rotates to indicate state. Only one row may be expanded at a time, or multiple rows may be open simultaneously — follow the host design system's convention. The header checkbox toggles selection on all visible rows.

**Sizing and typography rules.** Use tabular numerals for numeric columns. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight.

**Mobile header rule.** On narrow viewports the results count stacks above the action row; Add item and Manage columns stay on one shared row in a two-column equal-width grid with 16px gap, each button full width within its column (`width: 100%` or `w-full`) — this full-width treatment applies on mobile only; on wider breakpoints revert to inline flex with natural button widths. The Actions dropdown and the Brand / Category / Price / Color filter dropdowns share a two-column equal-width grid so filters stay grouped instead of scattering. The table scrolls horizontally. The image gallery in the expanded panel stacks vertically; attribute cards reflow to fewer columns. Preserve reading order throughout.
