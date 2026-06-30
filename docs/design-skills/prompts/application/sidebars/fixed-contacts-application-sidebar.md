# Contacts Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Section header.** At the very top of the panel, place a header row composed of a bold title (such as "Contacts") on the left, and a group of small icon-only utility buttons on the far right (such as a save/pin icon, a search icon, and an overflow menu or three-dots icon) sitting side by side on the same baseline.

**Contacts list.** Below the header, stack a vertical list of contact items with consistent vertical spacing. Each contact item is a horizontal row composed of a small circular avatar on the left and a contact name label to its right on the same baseline.

**Group conversations section.** Below the contacts list, place a section header row composed of a bold title (such as "Group conversations") on the left and a small icon-only add button (plus icon) on the far right, on the same baseline. Below the header, stack a vertical list of group conversation items. Each group item is a horizontal row composed of: a small group avatar on the left (two or more overlapping circular thumbnails forming a stacked cluster) with a small numeric badge (text vertically and horizontally centered using line-height: 1) overlapping the cluster indicating unread message count; a two-line text group to the right with the group name in a prominent weight on the first line and a short preview of the last message (sender name and text snippet) in a lighter weight on the second line.

**Interaction behavior.** The search icon in the header triggers contact filtering. The add button in the group section triggers group creation. Contact items and group items navigate to their respective conversation views.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. Avatars are consistently sized. The panel scrolls vertically if content overflows.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
