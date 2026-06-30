# Application Sidebar With Notification Cards

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Brand header.** At the very top of the panel, place a brand mark composed of a small logo icon paired with the brand name to its right on the same baseline, separated from navigation below by a thin horizontal divider.

**Primary navigation list.** Below the brand header, stack a vertical list of navigation items. Each primary navigation item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. Some items include a trailing chevron icon indicating a collapsible dropdown submenu; when expanded, indented child links appear directly below the parent item. One section carries a highlight state with an expanded dropdown visible. One navigation item includes a small circular numeric badge whose text is vertically and horizontally centered within the circle using line-height: 1.

**Inline notification cards.** Below the primary navigation list, place two or more dismissible notification cards stacked vertically with consistent spacing between them. Each card is a bordered or subtly elevated container composed of: a header row with a small leading info or announcement icon paired with a bold short title on the same baseline and a small dismiss (close/X) button on the far right; a short multi-line description paragraph below the header; and a text-style inline link with a trailing arrow icon at the bottom of the card (such as "Update now →"). Each card represents a distinct notification or announcement with different titles and descriptions.

**Bottom icon utility row.** Anchored to the very bottom of the panel, center a horizontal row of small icon-only utility buttons sitting side by side on the same baseline (such as a settings gear, a globe or language icon, and a sliders or preferences icon) with consistent spacing between them.

**Interaction behavior.** Each notification card dismiss button removes that individual card. The inline link inside each card navigates to its target. Dropdown navigation items toggle their child links on click.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The bottom icon row is pinned to the bottom of the panel. Notification cards occupy the space between the navigation list and the bottom icon row.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
