# Geographic Distribution Map Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 540 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with a widget title (such as "Country wise sessions") on the left and a small trailing info icon button on the same baseline that opens a short descriptive popover or tooltip explaining the map data.

**Map body.** Below the header, fill the remaining canvas height with a responsive choropleth world map using the target project's geo visualization stack and a world geography dataset. Use the same primary surface background as the widget card for the map area — do not introduce a separate tinted ocean or map panel color. Shade countries using a monochromatic blue scale where higher session density maps to darker fills and low or zero density maps to a very light neutral gray. Highlight at least one primary country in the darkest shade and several secondary countries in mid-range shades. Enable per-country hover highlighting and tooltips where practical. Ensure country fill colors contrast with that shared card surface — do not use the same background token for both the map area and country shapes, or geographies will render invisibly even when the SVG is present.

**Footer row.** Below the map, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron). On the right, place a compact text link to a detailed report (such as "Users report" with a trailing chevron icon).

**Map implementation.** Wire the map to a typed country session-density dataset — not a static SVG mock or decorative illustration. Use the geo visualization library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the map responsive within the widget shell. Enable per-country hover highlighting and tooltips where practical.

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 540 pixels. Map fill colors, borders, and hover or focus states stay agnostic and follow the host design system. Country shapes may use simplified SVG paths or an equivalent vector map component.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px. Icon-only info buttons use equal compact padding on all sides instead.

**Mobile layout rule.** On narrow viewports preserve the 540-pixel widget height, use 16-pixel card padding on mobile and small screens, the map scales to full card width with a minimum height so country shapes remain recognizable. The footer stacks period dropdown above the report link. Preserve reading order throughout.
