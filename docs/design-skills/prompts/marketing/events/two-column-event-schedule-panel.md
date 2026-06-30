# Two-Column Event Schedule Panel

Create an event schedule section as one vertically stacked block inside a max-width container. At the top, place a left-aligned header block composed of a large heading on its own line followed by a supporting paragraph directly beneath the heading at a comfortable reading width.

Below the header, place one large rounded panel spanning the full container width. Inside the panel, split the content into two equal-width columns on large 1280px width breakpoints with a consistent gutter between them. Each column carries a centered column heading on its own line at the top (e.g. "Morning" and "Afternoon").

Below each column heading, stack a vertical list of alost 16 session blocks divided by an horizontal line with consistent vertical spacing between them. Each session block is a left-aligned horizontal row composed of two regions on the same baseline:

**Time column** — a small inline time-range element composed of a tiny clock icon and a short start–end time label on the same baseline, occupying a fixed-width leading area.

**Content column** — a left-aligned vertical stack to the right of the time column containing: a medium-weight session title on its own line — every session title must be a link; a short multi-line description paragraph directly below the title; a speaker row directly below the description composed of a small circular avatar on the left and a two-line text block to its right on the same baseline containing the speaker name on the first line and the speaker role or affiliation on the second line.

On narrow viewports, stack the two columns vertically with the morning column first and the afternoon column directly below it; each session block preserves its internal reading order; the panel stretches to the full content width with comfortable side padding.
