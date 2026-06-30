# Profile Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**User profile block.** At the very top of the panel, center a user profile block as a vertical stack: a large circular user avatar centered horizontally on its own line; the user's full name centered in a prominent weight on the line directly below the avatar; the user's email centered in a lighter weight on the line below the name; and a full-width outlined secondary button with a small leading logout icon and a short label (such as "Logout") directly below the email.

**Icon utility row.** Below the profile block, center a horizontal row of small icon-only utility buttons sitting side by side on the same baseline (such as a grid or dashboard icon, a settings gear, and a help or question-mark circle) with consistent spacing between them, wrapped in a full-width band separated from the profile block above and the navigation below by 16 pixels of margin on top and bottom. The band carries a top border and a bottom border, with 16 pixels of padding on top and bottom inside the bordered area.

**Primary navigation list.** Below the icon utility row, stack a vertical list of navigation items. Each primary item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. One item includes a trailing chevron icon indicating a collapsible dropdown submenu; when expanded, indented child links appear directly below the parent as plain text labels (such as status-based sub-items). The expanded section carries a highlight state (active color on the parent label and icon, chevron rotated upward).

**Interaction behavior.** The logout button triggers the sign-out action. Icon utility buttons navigate to their respective views. Dropdown items toggle their child links and rotate the chevron on click.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The profile block and icon row are centered horizontally within the panel. Navigation items are left-aligned. The panel scrolls vertically if content overflows.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
