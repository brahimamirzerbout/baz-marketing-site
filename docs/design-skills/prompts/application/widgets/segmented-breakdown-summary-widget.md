# Segmented Breakdown Summary Widget

Create an application dashboard widget as a self-contained surface card intended to sit inside a dashboard grid cell. Do not generate any surrounding page shell, sidebar, navbar, breadcrumb chrome, or adjacent widgets; only output this widget component code.

**Widget shell.** Wrap the entire widget in a surface card container with a fixed canvas height of 396 pixels, 24 pixels of internal padding on large screens and 16 pixels on mobile and small screens, 12 pixels of corner radius using the medium (md) radius token, background set to the host design system's primary surface color, an optional 1 pixel default border, and optional subtle elevation shadow.

**Header row.** At the top, place a horizontal row with space between regions. On the left, stack a large bold primary metric value (such as "867.4k") using tabular numerals above a short metric label (such as "Visits") in a muted secondary weight. On the right end, place a compact negative trend indicator with a directional arrow and percentage (such as "3.7%") using a danger semantic color.

**Device breakdown row.** Below the header, place a horizontal three-column row with equal spacing. Each column stacks a small line-art device icon, a muted device label (such as "Desktop", "Mobile", or "Tablet"), a bold percentage value (such as "76%", "20%", or "4%") using tabular numerals, and a muted raw count beneath (such as "756.3k", "56.1k", or "6.2k").

**Comparison bar.** Below the device breakdown, render a single full-width horizontal bar with rounded ends divided into three proportional segments matching the device percentages. Use progressively lighter shades of a single brand hue from largest to smallest segment.

**Legend row.** Below the comparison bar, place a centered horizontal legend with three items. Each item shows a small colored circle matching a bar segment followed by a device label.

**Footer row.** Below the legend, separated by a thin horizontal divider above it, place a horizontal footer row with space between regions. On the left, place a period dropdown trigger (such as "Last 7 days" with a trailing chevron). On the right, place a compact text link to a detailed report (such as "Users report" with a trailing chevron icon).

**Sizing rules.** The widget spans the full width of its grid cell with a fixed canvas height of exactly 396 pixels. Use tabular numerals for all metrics. Device icon treatments, segment colors, borders, and hover or focus states stay agnostic and follow the host design system.

**Padding rule.** Use 24 pixels of internal card padding on large screens and 16 pixels on mobile and small screens.

**Divider rule.** Use horizontal divider lines only below the widget header and above the widget footer. Do not place horizontal dividers between other widget sections; separate them with spacing only.

**Button padding rule.** Every labeled action button and dropdown trigger uses padding-left 12px, padding-right 12px, padding-top 8px, and padding-bottom 8px.

**Mobile layout rule.** On narrow viewports preserve the 396-pixel widget height, use 16-pixel card padding on mobile and small screens, the three device columns remain side by side when space allows or wrap to a two-plus-one layout. The comparison bar and legend span full width. The footer stacks period dropdown above the report link. Preserve reading order throughout.
