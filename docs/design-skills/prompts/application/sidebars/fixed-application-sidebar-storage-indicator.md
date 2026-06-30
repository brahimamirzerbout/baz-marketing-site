# Application Sidebar With Storage Indicator

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Brand header.** At the very top of the panel, place a brand mark composed of a small logo icon paired with the brand name to its right on the same baseline.

**Search field.** Directly below the brand header, place a search input field spanning the full panel width with a leading search icon and placeholder text.

**Primary navigation list.** Below the search field, stack a vertical list of navigation items. Each primary navigation item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. Some items include a trailing chevron icon indicating a collapsible dropdown submenu; when expanded, indented child links appear directly below the parent item as plain text labels without leading icons. One section carries a highlight state (active color and expanded submenu visible). One navigation item includes a small circular numeric badge to the right of its label indicating an unread count; the badge text is vertically and horizontally centered within the circle using line-height: 1 so the number never sits off-center.

**Storage indicator.** Anchored to the bottom of the panel, place a storage usage block composed of a short descriptive label (such as "Space left") on its own line, a usage fraction or count in a prominent weight (such as "70 of 150 GB") on the next line, a horizontal progress bar beneath the count that visually represents usage as a filled segment relative to total capacity, and a full-width secondary button with a small leading icon and a short upgrade label (such as "Upgrade to pro") below the progress bar.

**Interaction behavior.** Clicking a parent item with a trailing chevron toggles the dropdown open or closed and rotates the chevron. The search field filters visible navigation items or triggers a search action.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The storage indicator block is pinned to the bottom of the panel and does not scroll with the navigation list. If the navigation list overflows, it scrolls independently while the brand header and storage block remain fixed.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
