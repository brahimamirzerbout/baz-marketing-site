# Tabbed Event Schedule Cards

Create an event schedule section as one vertically stacked block on a full-width background inside a max-width container. At the top, place a large centered heading on its own line.

Below the heading, place a centered horizontal row of day- selector tabs on the same baseline. Each tab is a compact element composed of a small leading calendar icon and a short day label (e.g. "Day 1: Tuesday, Oct 27th") to the right of the icon on the same baseline. Exactly one tab carries a visually distinct treatment indicating the active selection; inactive tabs use a plain treatment.

Below the tab row, place a vertical stack of 8 session cards with consistent vertical spacing between them. Each card is a rounded panel whose interior is a horizontal row composed of three regions from left to right:

**Date column** — a compact left-aligned block displaying the abbreviated day name on its own line at the top and a large numeric date directly below the day name, both stacked vertically.

**Details column** — a left-aligned vertical stack containing a small inline time-range element composed of a tiny clock icon and a short start–end time label on the same baseline on its own line; directly below, a small inline location element composed of a tiny map-pin icon and a short venue or city label on the same baseline on its own line.

**Content column** — the widest region, containing a left-aligned vertical stack with the session title on its own line — every session title must be a link; for talk sessions, a horizontal cluster of slightly overlapping small circular speaker avatars directly below the title; for break or social sessions, a "Sponsors:" label on its own line with a horizontal row of small brand logos sitting side by side on the same baseline directly below the label.

Below the full card stack, place a centered text link whose label includes a trailing arrow icon at the end of the link text (e.g. "Buy tickets"), on its own line.

On narrow viewports, the tab row scrolls horizontally or wraps into stacked lines; inside each card the three regions stack vertically in reading order (date block, details block, content block); cards stretch to the full content width with comfortable side padding.
