# Application Sidebar With Alert Card

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Brand header.** At the very top of the panel, place a brand mark composed of a small logo icon paired with the brand name to its right on the same baseline, separated from navigation below by a thin horizontal divider.

**Primary navigation list.** Below the brand header, stack a vertical list of navigation items. Each primary navigation item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. Some items include a trailing chevron icon indicating a collapsible dropdown submenu; when expanded, indented child links appear directly below the parent item. One section carries a highlight state with an expanded dropdown visible. One navigation item includes a small circular numeric badge whose text is vertically and horizontally centered within the circle using line-height: 1. Below the primary navigation, separated by a thin divider, place a secondary group of utility links (such as Docs, Components, Help), each following the icon-plus-label row pattern.

**Alert info card.** Below the secondary utility links, place a floating card with a subtle border or elevated surface containing: a header row composed of a small leading info icon paired with a bold title on the same baseline and a small dismiss (close/X) button anchored to the top right; a short multi-line description paragraph below the header; and a full-width primary action button with a small leading download or action icon and a short label at the bottom of the card.

**Bottom utility group.** Anchored to the very bottom of the panel below the alert card, place a row of icon-and-label links on separate lines (such as Settings, Help & Terms, Invite teammates), each composed of a small leading icon and a text label on the same baseline.

**Interaction behavior.** The alert card dismiss button removes the card from view. Dropdown navigation items toggle their child links and rotate their chevrons on click.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The bottom utility group is pinned to the bottom of the panel. The alert card is positioned between the navigation and the bottom utility group. If content overflows, the navigation list scrolls while the bottom utility group remains anchored.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
