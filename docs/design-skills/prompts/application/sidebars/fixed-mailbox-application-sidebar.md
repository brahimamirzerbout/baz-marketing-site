# Mailbox Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Primary action button.** At the very top of the panel, place a full-width primary action button composed of a small leading compose or edit icon and a short label (such as "Compose"). The button spans the full panel width with comfortable horizontal padding.

**Mailbox navigation list.** Below the primary action button, stack a vertical list of mailbox navigation items. Each item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. One item includes a small circular numeric badge on the far right of the row indicating an unread count — the badge text is vertically and horizontally centered within the circle using line-height: 1 so the number never sits off-center. One item includes a trailing chevron icon indicating a collapsible dropdown submenu; when expanded, indented child links appear directly below the parent (such as category sub-folders). The expanded section's chevron rotates to indicate the open state.

**Labels section.** Below the mailbox navigation, separated by a thin horizontal divider, place a section heading in a bold or heavier weight (such as "Labels") on its own line. Below the heading, stack a vertical list of label items. Each label item is a horizontal row composed of a small colored tag or bookmark icon on the left (each with a distinct color) and a text label to its right on the same baseline. Below the label list, place a secondary button or text link composed of a small leading plus icon and a short label (such as "+ Create new label").

**Bottom utility group.** Anchored to the very bottom of the panel, stack a vertical list of icon-and-label utility links (such as Settings, Invite teammates) on separate lines, each composed of a small leading icon and a text label on the same baseline.

**Interaction behavior.** The compose button triggers the primary creation action (opening a compose modal or navigating to compose view). The collapsible category section toggles open/closed on click with chevron rotation. Label items navigate to the corresponding filtered view.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The bottom utility group is pinned to the bottom. The labels section and mailbox list scroll if content overflows.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
