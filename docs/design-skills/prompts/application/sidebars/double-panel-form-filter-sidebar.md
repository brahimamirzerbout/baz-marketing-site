# Double-Panel Form Filter Sidebar

Create a double-panel sidenav composed of a narrow icon-only rail on the leading edge and an expanded form panel adjacent to it, together forming a fixed-width side region anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Icon rail.** The narrow leading strip contains a vertical stack of small icon-only navigation buttons, each centered horizontally in the rail with consistent vertical spacing between them. Icons represent top-level navigation categories. The rail stretches the full viewport height.

**Expanded form panel.** Adjacent to the icon rail, the wider panel stretches the full viewport height and contains the following from top to bottom:

*User identity header.* At the top of the panel, a user identity block composed of a medium circular avatar on the left, a two-line text group to its right (user name and email), and a small trailing up-down chevron icon on the far right indicating account switching.

*Form fields.* Below the user header, a vertical stack of labeled form fields with consistent vertical spacing between them. Each form field is composed of a short label above the input on its own line, and either a text input field with placeholder text or a select/dropdown field with a current value displayed and a trailing chevron icon. The form fields represent filter criteria (such as requester name, ticket ID, status dropdown, type dropdown, priority dropdown). Dropdown fields show their selected value and open a selection list on click.

*Toast notification.* Anchored to the very bottom of the panel, a success toast card with a tinted or colored background composed of: a header row with a small leading checkmark or success icon paired with a bold title (such as "Ticket solved") and a small dismiss (close/X) button on the far right; a short description paragraph below the header; and a compact action button (such as "Undo") at the bottom of the card.

**Panel expand control.** At the very bottom of the icon rail, place a small expand or collapse chevron icon pointing toward the panel.

**Interaction behavior.** Text inputs accept typed filter values. Dropdown fields open a selection menu on click and update the displayed value on selection. The toast dismiss button removes the notification. The undo button in the toast reverts the last action.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The icon rail has a narrow fixed width. The expanded panel has a wider fixed width. Form fields span the full panel width. The toast card is pinned to the bottom.

On narrow viewports both panels collapse off-screen and become accessible via an external toggle. Preserve reading order throughout.
