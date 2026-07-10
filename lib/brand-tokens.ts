/**
 * BAZ — Brand token constants (server-side values, no CSS).
 *
 * These are the *persisted* defaults for `users.color` and similar
 * data columns. They are hex strings (not CSS variables) so the
 * value is portable outside the browser (PDFs, OG images, email,
 * server logs) and survives serialization.
 *
 * If the UI wants to honor a CSS-var accent (`var(--brand)`), it
 * should resolve it at render time via `getComputedStyle`. The
 * stored value remains a real hex.
 *
 * If you change these values, also update the `users.color`
 * column DEFAULT in `lib/db.ts` schema to match.
 */
export const USER_COLOR = {
  /** Default accent for owner/bootstrap user (BAZ red). */
  owner: "#ff3b2f",
  /** Default accent for self-registered members (BAZ blue). */
  member: "#4f7cff",
  /** Default accent for admin role. */
  admin: "#ff3b2f",
  /** Default accent for client portal users. */
  client: "#4f7cff",
} as const;

export type UserRole = keyof typeof USER_COLOR;

/**
 * Resolve the default user color for a role.
 * Unknown roles fall back to the member default.
 */
export function defaultUserColor(role: string): string {
  return (USER_COLOR as Record<string, string>)[role] ?? USER_COLOR.member;
}
