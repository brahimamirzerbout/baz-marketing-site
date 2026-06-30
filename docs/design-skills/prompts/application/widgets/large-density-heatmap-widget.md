# Large Density Heatmap Widget

Create an application dashboard **big widget** as a self-contained surface card with a fixed canvas of 1024 pixels wide by 640 pixels tall. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container measuring 1024×640 pixels with 24 pixels of internal padding on all sides, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a 28-pixel large bold primary metric value (such as "$3,560,890") using tabular numerals beside an inline positive trend badge (such as "↑ 10%") on the same baseline, with a short metric label beneath (such as "Total users for flowbite.com") in a muted secondary weight. On the right end, place a bordered date-range picker trigger with a calendar icon, a formatted range label (such as "Dec 31 - Jan 31"), and a trailing chevron.

**Heatmap body.** Below the header, fill the remaining canvas height with a density heatmap grid. Render seven rows labeled "Item" on the left y-axis and nine time columns on the x-axis labeled at half-hour increments (such as 09:00 through 13:00). Each cell is a small rounded rectangle filled with a shade from a monochromatic brand color scale where darker cells represent higher density. Separate cells with thin neutral gutters.

**Legend row.** Below the heatmap, center a horizontal color-scale legend bar that transitions from dark brand blue on the left to pale brand tint on the right. Place density threshold labels above the bar (such as "100k+", "50k+", "10k+", "5k+", "1k+", "100+", "10+", "0+").

**Heatmap implementation.** Drive every cell from a typed density dataset with row labels, time-bucket labels, and numeric session counts — not a static grid illustration. Render cells on a monochromatic brand scale. Show an interactive cell detail readout or tooltip on hover or focus with the row name, time bucket, and formatted count.

**Sizing rules.** The widget canvas is exactly 1024×640 pixels. Use tabular numerals for the primary metric. Heatmap fills, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** On narrow viewports preserve the 1024-pixel widget width inside a horizontally scrollable preview frame rather than reflowing the heatmap grid. Preserve reading order throughout.
