# Grouped Item Comparison Table

Create a item comparison table as a self-contained component inside a surface card container with 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow. Do not generate any surrounding page shell, sidebar, navbar, or breadcrumb chrome; only output the comparison table code.

**Header row.** At the top, place a horizontal header on one line at all breakpoints. On the left, show a section title with a small trailing info icon (such as "Compare items"). On the right, place the primary "Add item" button and the secondary outlined "Reset all" button with a refresh icon inline on the same baseline in a horizontal flex row with `align-items: center` (or equivalent such as `items-center`) and 16px gap between the two buttons (`gap-4` or `gap: 16px`). The title and the button pair share the same header row with space-between alignment — do not stack the heading above the buttons on any breakpoint.

**Tab navigation.** Directly below the header, place a horizontal tab bar with four tab labels (such as General information, Comparison, Delivery information, and Rating). One tab is visually selected with a filled or highlighted background; the others appear as plain text tabs.

**Comparison table structure.** Below the tabs, place a wide comparison table. The first column holds row labels; the remaining columns represent individual items being compared (three or more). The top row of the table is a item header row: the top-left cell is empty; each item column stacks a item image above the item name, both centered within the column.

**Grouped table body.** The table body is divided into category sections. Each section opens with a full-width section title row spanning all columns on a subtle filled background (such as "General information" or "Technical information"). Below each section title, place attribute rows. Each attribute row contains the attribute label in the left-most column; each item column holds either plain text, a formatted price, a pill badge, an icon indicator (such as a checkmark or X for boolean features), or a short multi-line spec value.

**Sample data rule.** Populate each grouped section with exactly ten attribute rows of realistic placeholder values. Vary text, prices, badges, and icon indicators across rows within each section.

**Footer action row.** At the bottom of the table, place a full-width row where the left-most cell is empty and each item column contains one full-width primary "Add to cart" button with a small leading cart icon, aligned at the bottom of the column.

**Interaction behavior.** Clicking a tab switches the visible comparison content or scrolls to the corresponding section. The reset button clears all selected items. Add item opens a picker or modal.

**Sizing and typography rules.** Use tabular numerals for prices and numeric specs. item columns are equal width. Colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every button uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Group button rule.** Segmented button groups — pagination controls (previous, numbered pages, next) and similar connected control strips — must share the same height and the same internal padding on every button in the group. Separate inline button clusters (such as Edit and Delete side by side) are not segmented groups; keep those as inline-flex siblings with normal spacing between them.

**Input padding rule.** Every search, text, number, and date input uses padding-left 10px, padding-right 10px, padding-top 8px, and padding-bottom 8px. Toggle switches, checkboxes, and radio buttons are exempt.

**Single-line cell rule.** Table body cell (`td`) text must stay on one line — apply `white-space: nowrap` (or equivalent such as `whitespace-nowrap`) so cell content does not wrap to two rows; truncate with ellipsis when horizontal space is tight.

**Mobile header rule.** On narrow viewports keep the full header on one line: "Compare items" on the left, Add item and Reset all inline on the right with `align-items: center` and 16px gap between the buttons — the heading and action buttons must not stack vertically. The tab bar below scrolls horizontally in one line instead of wrapping. The comparison table collapses into one stacked card per item, each card repeating the item header and the full attribute list with labels on the left and values on the right; cards stack vertically in the original column order. Preserve reading order throughout.
