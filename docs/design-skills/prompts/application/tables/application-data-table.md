# Application Data Table

Create an application data table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the table component code.

**Toolbar row.** At the top of the component, place a horizontal toolbar spanning the full width. On the left, place a wide search input field with a leading search icon and placeholder text. On the right, grouped on the same baseline, place a compact primary action button composed of a small leading plus icon and a short label (such as "Add item"), a secondary outlined button with a funnel icon, a trailing dropdown chevron, and a short "Filters" label, and a secondary outlined "Actions" button with a trailing dropdown chevron.

**Table header row.** Below the toolbar, place a table whose header row contains column labels for: a item identity column; a role column; a plain email column; a type or tier column with a small trailing info icon in the header cell; a rating column; a country column; and a status column; plus a final actions column with no label. Sortable columns may carry a small vertical sort icon beside the label.

**Table body rows.** Each body row is separated from the next by a thin horizontal divider only (no vertical column dividers). The item identity cell stacks a small circular avatar, a bold primary name on one line, and a smaller secondary email line directly beneath the name. The role cell holds a pill badge composed of a small leading icon and a short role label on the same baseline (distinct badge treatments per role such as admin, viewer, or editor). The email cell shows plain text. The type cell shows a short tier label. The rating cell pairs a numeric value with a small trend arrow icon (upward for positive, downward for negative). The country cell pairs a small circular flag glyph with a country name label. The status cell pairs a small colored status dot with a short status label (such as active, inactive, or suspended). The actions cell holds two compact buttons side by side on the same baseline: a light secondary "Edit" button with a pencil icon and a short label, and a solid destructive "Delete" button with a trash icon and the visible "Delete" label — never icon-only.

**Row delete button rule.** The destructive delete button in each row must show both the trash icon and the "Delete" text label on the same baseline. Do not render the delete control as an icon-only button in this variant.

**Sample data rule.** Populate the table body with exactly ten sample rows of realistic placeholder data. Vary names, roles, tiers, ratings, countries, and status treatments across rows so the table reads as a live dataset rather than a repeated template.

**Footer row.** Below the table body, place a footer bar. On the left, show a range summary (such as "Showing 1–10 of 1000"). On the right, place pagination controls composed of previous and next arrow buttons, individual numbered page buttons, and one page button visually highlighted as the current page.

**Sizing and typography rules.** Use tabular numerals for numeric columns. Table cell padding is generous and consistent. Colors, borders, badge treatments, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight. Stacked identity cells (name with email beneath) described elsewhere in this prompt are the only exception.

**Mobile header rule.** On narrow viewports stack the toolbar into a single merged column with tighter horizontal padding: the search field spans the full width on the first row; the primary "Add item" button spans the full width on the second row; the Filters and Actions secondary buttons share one row in a two-column equal-width grid so they stay paired instead of scattering. The table scrolls horizontally inside its container while preserving column order. The delete button keeps its "Delete" label on all breakpoints; the edit button may collapse to icon-only on very narrow widths. Preserve reading order throughout.
