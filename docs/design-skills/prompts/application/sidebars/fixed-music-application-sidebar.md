# Music Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Brand header.** At the very top of the panel, place a brand mark composed of a small logo icon paired with the brand name to its right on the same baseline.

**Search field.** Directly below the brand header, place a search input field spanning the full panel width with a leading search icon and placeholder text relevant to the content domain (such as "Search for a song").

**Primary navigation list.** Below the search field, stack a vertical list of navigation items. Each item is a horizontal row composed of a small leading icon on the left and a text label to its right on the same baseline. Items represent core navigation destinations (such as Home, Discover, Albums, Tracks, Genres). No dropdowns in this section.

**Playlists section.** Below the primary navigation, separated by a thin horizontal divider, place a section header row composed of a bold section title on the left (such as "My playlists") and a small icon-only add button (plus icon) on the far right on the same baseline. Below the header, stack a vertical list of playlist items. Each playlist item is a horizontal row composed of a small square thumbnail image on the left, and a two-line text group to its right: the playlist name on the first line and a short subtitle or metadata line (such as "Playlist · 67 songs") on the second line in a lighter weight. One playlist item carries a highlight state (active color on its name) to indicate the currently playing or selected playlist. Below the playlist list, center a secondary text link with a small leading eye or view icon (such as "See all albums").

**Upgrade CTA card.** Anchored to the bottom of the panel, place a promotional card with a subtle border or distinct background containing: a bold title on its own line; a short multi-line description paragraph below the title; and a full-width primary action button with a short label and a small trailing arrow icon (such as "Upgrade now →") at the bottom of the card.

**Interaction behavior.** The add button in the playlist section header triggers a create-new-playlist action. Playlist items navigate to the corresponding playlist view. The upgrade CTA button navigates to the upgrade flow.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. The upgrade CTA card is pinned to the bottom of the panel. The playlists list scrolls if it overflows, while the brand header, search field, and CTA card remain fixed.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
