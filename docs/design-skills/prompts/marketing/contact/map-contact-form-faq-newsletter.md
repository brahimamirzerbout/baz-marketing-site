# Map Contact Form With FAQ and Newsletter

Create a long contact-support page made of three sequential modules inside a centered page container constrained to a 1280px width with comfortable side padding. Each module is separated from the next by generous vertical spacing.

**First module** splits into two columns on large breakpoints with equal column widths and a comfortable column gap.

The *left column* embeds an interactive map element that fills the column width and carries standard map chrome (zoom controls, a recenter button, and an optional directions entry point) showing a pinned business location.

The *right column* is a left-aligned vertical stack containing, in order: a headline on its own line inviting contact; a short supporting paragraph on its own line beneath the headline; single-line input fields stacked vertically for name, email address, phone number, and subject (each label sits above its input on its own line with a tiny required-field marker where applicable); a labeled multi-line message textarea directly below (the textarea carries a placeholder inviting the message body and allows vertical expansion); one full-width submit control beneath the textarea (text-style or solid, depending on the design system).

**Second module** splits into two columns on large breakpoints.

The *left column* is a left-aligned vertical stack containing: a small uppercase or label-style tag reading as an FAQ marker on its own line; a medium heading about remaining questions on its own line beneath the tag; a short supporting paragraph beneath the heading.

The *right column* is a vertical accordion list of question items. One item is expanded by default: its question title sits on its own line paired with a collapse affordance (chevron or minus icon) at the right end, and a paragraph answer is visible directly beneath the title. The remaining items are collapsed: each shows only the question title paired with an expand affordance (chevron or plus icon) at the right end, with no visible answer beneath.

**Third module** is a single centered vertical stack (no column split). It contains, in order: a small uppercase or label-style tag centered on its own line; a heading inviting newsletter subscription centered on its own line beneath the tag; a short supporting paragraph centered beneath the heading; a horizontal inline field group centered beneath the paragraph, composed of an email input (with placeholder) at the left and a compact circular or square send control carrying only an icon (arrow or send glyph) flush to the right of the input, both on the same baseline.

On narrow viewports, stack the two-column modules (first and second) into single columns with the left column content above the right column content; keep the third module centered.
