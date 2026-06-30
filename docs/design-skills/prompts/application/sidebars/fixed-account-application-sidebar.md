# Account Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**User identity header.** At the very top of the panel, place a user identity block composed of a medium circular avatar on the left, a two-line text group to its right (the user's full name on the first line in a prominent weight and the user's email on the second line in a lighter weight), and a small trailing up-down chevron or sort icon on the far right indicating the account can be switched.

**Quick-action buttons row.** Below the user identity header, place a horizontal row of equally-spaced quick-action buttons sitting side by side on the same baseline, wrapped in a full-width band separated from the header above and the navigation below by 16 pixels of margin on top and bottom. The band carries a top border and a bottom border, with 16 pixels of padding on top and bottom inside the bordered area. Each quick-action button is a small vertical stack containing a small icon centered on the top line and a short text label centered directly beneath the icon, all enclosed in a rounded bordered container or pill. The row contains three buttons (such as Profile, Gifts, Support).

**Primary navigation list.** Below the quick-action row, stack a vertical list of navigation items. Each primary navigation item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. Some items include a trailing chevron icon indicating a collapsible dropdown submenu; when expanded, indented child links appear directly below the parent item as plain text labels. One section carries a highlight state (active color and expanded dropdown visible with child links showing).

**Bottom utility group.** Anchored to the very bottom of the panel, separated from the primary navigation by generous vertical whitespace, stack a vertical list of utility links on separate lines. Each is composed of a small leading icon and a text label on the same baseline. The last item (such as "Log out") uses a distinct destructive or warning color to differentiate it from the others.

**Interaction behavior.** The account switch chevron triggers a dropdown or modal with available accounts. Quick-action buttons navigate to their respective views. Dropdown navigation items toggle their child links and rotate their chevrons on click.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The bottom utility group is pinned to the bottom. The navigation list scrolls if it overflows.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
