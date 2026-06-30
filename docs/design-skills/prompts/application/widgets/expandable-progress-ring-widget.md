# Expandable Progress Ring Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with a widget title (such as "Your team's progress") on the left and a small trailing info icon button on the same baseline that opens a short descriptive popover or tooltip. Separate the header from the body with a thin horizontal divider below it.

**Status summary band.** Below the header, wrap a light neutral inset surface containing three compact status cards arranged horizontally with equal spacing. Each card uses a pastel background tint matching its semantic category and stacks a circular badge with a bold count (such as "5", "10", or "18") above a short status label (such as "To do", "In progress", or "Done").

**Expandable details.** Below the status band, place a text link toggle (such as "Show more details" with a chevron icon indicating expanded or collapsed state). When expanded, render a vertical list of three detail rows separated by consistent spacing. Each row shows a muted label on the left (such as "Average task completion rate", "Days until sprint ends", or "Upcoming meeting") and a compact pill badge on the right containing the value (such as "↑ 78%", "4 days", or a calendar icon with "Monday 28"). The meeting row may include a small external-link icon beside the label.

**Chart body.** Below the expandable details, center a responsive multi-series concentric ring chart with three rings sharing a common center. Each ring is a partial arc on a clearly visible light neutral track representing a different status category at a distinct completion level. Use a mid neutral background token from the host design system for unfilled arc segments so ring tracks contrast with the card surface — do not reuse the same surface token for both the card and the track. Use progressively lighter or darker shades of a single brand hue per ring. Group the chart and legend together with 24 pixels of spacing between them, 24 pixels above the chart, and 24 pixels below the legend before the footer divider.

**Legend row.** Directly below the chart within that grouped block, place a centered horizontal legend with three items. Each item shows a small colored circle matching a ring followed by a status label.

**Footer row.** Below the legend, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron). On the right, place a compact text link to a detailed report (such as "Users report" with a trailing chevron icon).

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Chart implementation.** Wire the chart to realistic typed sample data — not a static SVG mock, CSS-only placeholder, or decorative illustration. Use the chart library already present in the target project; if none exists, add a well-supported option with the target app's package manager and install dependencies only in that app workspace (do not assume npm, yarn, pnpm, bun, or any specific package name). Keep the visualization responsive within the widget shell. Enable hover tooltips with human-readable labels and formatted values (currency, counts, or percentages as appropriate). Map fills and strokes to host design system tokens (such as brand, success, and danger). Use smooth curves for line and area series where supported; round bar corners where appropriate.

**Sizing rules.** The widget spans the full width of its grid cell. Use tabular numerals for all counts and percentages. Group the concentric ring chart and legend with 24 pixels of spacing between them, 24 pixels above the chart, and 24 pixels below the legend before the footer divider. Status card tints, ring colors, pill treatments, borders, and hover or focus states stay agnostic and follow the host design system.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px. Icon-only info buttons use equal compact padding on all sides instead.

**Mobile layout rule.** On narrow viewports the three status cards wrap or shrink proportionally. Expandable detail rows stack label above badge when space is tight. The concentric ring chart scales to full card width. The footer stacks period dropdown above the report link. Preserve reading order throughout.
