# Centered Timeline Content Section

Create a content section as a vertical stack inside a centered page container with comfortable side padding.

The **header block** sits at the top and is horizontally centered: a large heading on its own line, then a centered supporting paragraph directly beneath the heading constrained to a restrained max line width (roughly two-thirds of the content area) so it does not span the full container.

The **timeline band** sits below the header block. A thin horizontal baseline rule runs the full content width with small circular markers placed along it at even intervals. Anchor four milestone columns above or along the baseline, evenly spaced across the width. Each milestone is a vertical stack containing, in order: a small date badge at the top (the badge is a compact inline row pairing a small leading calendar icon with a short date string on the same baseline); a bold short title on its own line directly beneath the badge; a placeholder description paragraph of two to three lines beneath the title; and a text-style link whose label includes a small trailing arrow icon anchored at the bottom of the milestone stack. Maintain equal horizontal gutters between milestone columns.

On narrow viewports, reflow the timeline into a single-column vertical stack while preserving chronological top-to-bottom order; each milestone keeps its internal stacking sequence intact.
