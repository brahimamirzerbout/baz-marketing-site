# Double-Panel Task Management Sidebar

Create a double-panel sidenav composed of a narrow icon-only rail on the leading edge and an expanded task management panel adjacent to it, together forming a fixed-width side region anchored to one edge of the viewport, stretching the full viewport height. Do not generate any main content area or placeholder blocks beside the sidenav; only output the sidenav code.

**Icon rail.** The narrow leading strip contains a vertical stack of small icon-only navigation buttons, each centered horizontally in the rail with consistent vertical spacing between them. Icons represent top-level navigation categories. The rail stretches the full viewport height.

**Expanded task panel.** Adjacent to the icon rail, the wider panel stretches the full viewport height and contains the following from top to bottom:

*User identity header.* At the top of the panel, a user identity block composed of a medium circular avatar on the left, a two-line text group to its right (user name and email), and a small trailing up-down chevron icon on the far right indicating account switching.

*Add-task row.* Below the user header, a horizontal row composed of a clickable add-task control on the left with a small leading plus icon paired with a short label (such as "Add a task") that opens a modal dialog for creating a new task, and a small icon-only overflow menu button (three dots) on the far right, on the same baseline.

*Add-task modal.* When the add-task control is clicked, open a modal dialog centered over the full sidenav container (covering both the icon rail and the expanded task panel, not just the panel column) with a dimmed backdrop. The modal contains a title (such as "Add a task"), a text input or textarea for the task description with placeholder text, and a footer row with a secondary cancel button and a primary confirm button (such as "Add task"). Submitting the form adds the new task to the pending task list and closes the modal. The cancel button and backdrop click dismiss the dialog without changes.

*Task list.* Below the add-task row, a vertical list of pending task items. Each task item is a horizontal row composed of a small circular radio or checkbox on the left and a multi-line task description label to its right. Tasks may wrap to two lines.

*Completed section.* Below the pending tasks, a bold section label (such as "Completed") on its own line. Below the label, a vertical list of completed task items. Each completed item is a horizontal row composed of a filled or checked circular indicator on the left and a strikethrough-styled task description label to its right.

*Toast notification.* Anchored to the very bottom of the panel, a success toast card with a tinted or colored background composed of: a header row with a small leading checkmark or success icon paired with a bold title (such as "Task completed") and a small dismiss (close/X) button on the far right; a short description paragraph below the header; and a compact action button (such as "Undo") at the bottom of the card.

**Panel expand control.** At the very bottom of the icon rail, place a small expand or collapse chevron icon pointing toward the panel, indicating the panel can be toggled between expanded and collapsed states.

**Interaction behavior.** The add-task control opens a modal dialog for entering a new task; submitting adds the task to the pending list. Task radio/checkboxes toggle the task between pending and completed states. The undo button in the toast reverts the last completed action. The toast dismiss button removes the notification.

**Sizing and layout rules.** The sidenav panel height is exactly 100 vh, always spanning the full viewport height with no gap above or below. The icon rail has a narrow fixed width. The expanded panel has a wider fixed width. Together they form the sidenav region. The toast card is pinned to the bottom of the expanded panel.

On narrow viewports both panels collapse off-screen and become accessible via an external toggle. Preserve reading order throughout.
