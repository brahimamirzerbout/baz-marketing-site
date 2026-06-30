# Double-Panel Application Sidebar

Create a double-panel sidenav composed of a narrow icon-only rail on the leading edge and an expanded text navigation panel adjacent to it, together forming a fixed-width side region anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Icon rail.** The narrow leading strip contains a brand logo icon at the very top, followed by a vertical stack of small icon-only navigation buttons below it, each centered horizontally in the rail with consistent vertical spacing between them. Icons represent top-level navigation categories. The rail stretches the full viewport height.

**Expanded panel.** Adjacent to the icon rail, the wider panel stretches the full viewport height and contains the following from top to bottom:

*Panel header.* A header row composed of a short title label (such as the application name or "dashboard") on the left and a small icon-only add or new-item button (plus icon) on the far right, sitting on the same baseline.

*Search field.* Below the panel header, a search input field spanning the full panel width with a leading search icon and placeholder text.

*Navigation list.* Below the search field, a vertical list of navigation items. Each item is a horizontal row composed of a text label on the left and optionally a trailing chevron icon on the right indicating a collapsible dropdown submenu. When expanded, indented child links appear below the parent. One item includes a small circular numeric badge whose text is vertically and horizontally centered within the circle using line-height: 1. One section carries a highlight state with an expanded dropdown.

*User identity block.* Anchored to the very bottom of the panel, place a user identity block composed of a small circular avatar on the left, a two-line text group to its right (user name and email), and a small trailing up-down chevron icon on the far right.

**Interaction behavior.** Clicking an icon in the rail highlights it and may update the expanded panel's content to match that category. Dropdown items in the expanded panel toggle their child links and rotate their chevrons on click. The user identity chevron triggers account switching.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The icon rail has a narrow fixed width (approximately 48–64 pixels). The expanded panel has a wider fixed width. Together they form the sidenav region. The user identity block is pinned to the bottom of the expanded panel.

On narrow viewports both the icon rail and expanded panel collapse off-screen and become accessible via an external toggle. The sidenav may slide in as an overlay. Preserve reading order throughout.
