# Fixed Market Data Application Sidebar

Create an application sidenav as a fixed-width vertical panel anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Section header.** At the very top of the panel, place a section header row composed of a bold title (such as "Market Cap") on the left and a small icon-only overflow menu button (three dots) on the far right, on the same baseline.

**Market data list.** Below the section header, stack a vertical list of market data rows with thin horizontal dividers between items. Each data row is a horizontal row composed of: a small circular token or asset icon on the far left; a two-part name group next to the icon containing the full asset name in a normal weight and a short ticker symbol in a lighter or secondary weight on the same baseline; a numeric price value right-aligned on the row; and a short percentage change value at the far right in a distinct color indicating positive or negative movement (such as green for positive). Below the data list, center a compact brand button with a small leading eye or view icon and a short label (such as "View more"), using the host design system's brand button variant (brand background, white label text, brand-strong hover state).

**Trending section.** Below the "View more" button, separated by vertical whitespace, place a second section header row composed of a bold title (such as "Trending") on the left and a small icon-only overflow menu button on the far right. Below the header, stack a shorter vertical list of trending data rows following the same structure as the market data list above (icon, name, ticker, price, percentage). Below the trending list, center another compact brand button with the same styling as the market section "View more" button above.

**Interaction behavior.** The overflow menu buttons open a context menu with options (such as sort, filter, time range). The "View more" buttons navigate to the full list view. Individual data rows may be clickable to navigate to a detail view.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The panel width is fixed. Price values and percentage values are right-aligned. The name and ticker group is left-aligned next to the icon. The entire panel scrolls vertically if content overflows.

On narrow viewports the sidenav collapses off-screen and becomes accessible via an external toggle. Preserve reading order throughout.
