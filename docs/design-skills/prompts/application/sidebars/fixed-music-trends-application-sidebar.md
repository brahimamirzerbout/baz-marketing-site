# Music Trends Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Trending songs section.** At the very top of the panel, place a section header row composed of a bold title (such as "Trending songs") on the left and a text link (such as "Show all") on the far right, on the same baseline. Below the header, stack a vertical list of song items. Each song item is a horizontal row composed of: a small circular thumbnail (album art or artist photo) on the far left; a two-line text group next to the thumbnail with the song title on the first line in a prominent weight and the artist name on the second line in a lighter weight; and a small circular icon-only play button on the far right. One item may show a pause icon instead of a play icon to indicate the currently playing track.

**Trending albums section.** Below the songs list, separated by a thin horizontal divider, place a second section header row composed of a bold title (such as "Trending albums") on the left and a "Show all" text link on the far right. Below the header, stack a shorter vertical list of album items following the same structure as the song items above (circular thumbnail, title, artist, play button).

**Interaction behavior.** Play buttons trigger audio playback; the currently playing item shows a pause icon. "Show all" links navigate to the full list view. Song/album rows may be clickable to navigate to a detail view.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. Thumbnails are consistently sized small circles. Play buttons are right-aligned. The panel scrolls vertically if content overflows.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
