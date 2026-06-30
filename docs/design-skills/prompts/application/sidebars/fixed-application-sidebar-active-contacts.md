# Application Sidebar With Active Contacts

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Brand header.** At the very top of the panel, place a brand mark composed of a small logo icon paired with the brand name to its right on the same baseline.

**Primary navigation list.** Below the brand header, stack a vertical list of navigation items. Each primary navigation item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. Some items include a trailing chevron icon indicating a collapsible dropdown submenu; when expanded, indented child links appear directly below the parent item. One section carries a highlight state with an expanded dropdown visible. One navigation item includes a small circular numeric badge whose text is vertically and horizontally centered within the circle using line-height: 1.

**Active contacts section.** Below the primary navigation, separated by a thin horizontal divider, place a section heading (such as "Active contacts") on its own line. Below the heading, stack a vertical list of user contact items. Each contact item is a horizontal row composed of a small circular avatar with a colored online-status ring or indicator on the left, and the contact's name label to its right on the same baseline.

**Bottom utility row.** Anchored to the very bottom of the panel, place a horizontal row of icon-and-label utility links sitting side by side on the same baseline (such as Settings and FAQ & support), separated by consistent horizontal spacing.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The bottom utility row is pinned to the bottom of the panel. If the contacts list overflows, the section scrolls independently.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
