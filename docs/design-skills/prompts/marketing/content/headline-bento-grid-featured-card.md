# Headline Bento Grid With Featured Card

Create a content section as three vertical bands inside a centered page container with comfortable side padding.

The **headline band** is a two-column row on large 1280px width breakpoints. The left cell holds a large multi-line heading left-aligned on its own line; the right cell holds a supporting paragraph left-aligned at a comfortable reading width. The two cells share the same top alignment.

The **bento grid band** sits below the headline band. Lay out a responsive bento-style grid of several rounded tiles with consistent gutters between them; tiles vary in span and height to create a dynamic mosaic. The grid mixes three tile types: solid-color accent tiles (each carrying a short title and a small trailing arrow affordance in one corner); image-backed tiles (each carrying a small pill-shaped tag near the top containing a tiny leading icon and a short label, title text anchored at the lower-left, and a small circular arrow button anchored at the lower-right); and mixed-layout tiles as needed to fill the composition. Every tile carries rounded corners.

The **featured card band** sits below the bento grid as one large horizontal card split into two columns on large 1280px width breakpoints.

The **left side** of the featured card is a media region: a background image or video placeholder fills the region; a circular play control sits at the center of the media surface (carrying a small triangular play glyph inside it); and a horizontal row of small pill-shaped hashtag labels is anchored along the bottom edge of the media region with comfortable inset padding.

The **right side** of the featured card is a left-aligned vertical stack containing, in order: a heading on its own line; a supporting paragraph directly beneath the heading at a comfortable reading width; and one pill-shaped button whose label includes a small trailing arrow icon, placed beneath the paragraph.

On narrow viewports, stack the headline row into a single column (heading first, paragraph second); reflow the bento grid into fewer columns (two-column or single-column) while keeping left-to-right, top-to-bottom reading order; and stack the featured card with the media region on top and the copy stack beneath it.
