# Project Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**User identity header.** At the very top of the panel, place a user identity block composed of a medium circular avatar on the left, a two-line text group to its right (the user's full name on the first line in a prominent weight and the user's email on the second line in a lighter weight), and a small trailing up-down chevron icon on the far right indicating account switching. The header carries a bottom border with 16 pixels of padding below the content and 16 pixels of margin below the border, separating it from the primary navigation list.

**Primary navigation list.** Below the user identity header, stack a vertical list of navigation items. Each primary item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. One item carries a highlight state indicated by a contrasting background fill or left accent and a distinct label color. No trailing chevrons or dropdowns in this primary section.

**Projects section.** Below the primary navigation, separated by a thin horizontal divider, place a section heading in a bold weight (such as "My projects") on its own line. Below the heading, stack a vertical list of project items. Each project item is a horizontal row composed of a small colored square dot or indicator on the left (each with a distinct color) and a project name label to its right on the same baseline. Below the project list, place a secondary button composed of a small leading plus icon and a short label (such as "+ Add new project") spanning the full panel width.

**Bottom utility group.** Anchored to the very bottom of the panel, stack a vertical list of icon-and-label utility links (such as Settings, Help & Terms, Invite teammates) on separate lines, each composed of a small leading icon and a text label on the same baseline.

**Interaction behavior.** The account switch chevron triggers account selection. The add project button triggers creation flow. Project items navigate to the project's view. The active navigation item shows a distinct visual treatment.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The bottom utility group is pinned to the bottom. The navigation and projects sections scroll if content overflows.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
