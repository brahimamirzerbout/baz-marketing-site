/**
 * BAZ — Admin route guard.
 *
 * Single source of truth for "this page is admin-only" enforcement.
 * Use from any server component / route handler under /admin/*.
 *
 * Semantics:
 *   - No session        → redirect to /login?next=<path>
 *   - Wrong role        → redirect to /  (don't leak admin existence)
 *   - Authorized        → returns the User record
 *
 * Roles permitted: `owner`, `admin`.
 * `member` and `client` are rejected.
 *
 * If you need to scope further (e.g. a "moderator" role that can see
 * /admin/canva but not /admin/monitors), pass `minRole` and check the
 * hierarchy below.
 */
import { redirect } from "next/navigation";
import { readSessionFromCookies } from "./auth";
import type { User } from "@/types/auth";

const ADMIN_ROLES = new Set(["owner", "admin"]);

export type AdminPathContext = {
  /** The path to redirect to on unauthenticated. Defaults to current path. */
  nextPath: string;
  /** The role hierarchy: "owner" > "admin" > "member" > "client". */
  minRole?: "owner" | "admin" | "member" | "client";
};

const ROLE_RANK: Record<NonNullable<AdminPathContext["minRole"]>, number> = {
  owner: 4,
  admin: 3,
  member: 2,
  client: 1,
};

/**
 * Server-component guard. Returns the user when authorized, redirects otherwise.
 * Throws a Next.js redirect under the hood; do not use in non-async contexts.
 */
export async function requireAdmin(ctx: AdminPathContext): Promise<User> {
  const { user } = await readSessionFromCookies();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(ctx.nextPath)}`);
  }

  const min = ctx.minRole ?? "admin";
  const userRank = ROLE_RANK[user.role as keyof typeof ROLE_RANK] ?? 0;
  const minRank = ROLE_RANK[min];
  if (userRank < minRank) {
    // Silent redirect to home — don't reveal that the path exists.
    redirect("/");
  }
  return user;
}

/**
 * Whether a user role is allowed to access admin pages.
 * Pure check, no redirect. Use in client components or for conditional UI.
 */
export function isAdmin(user: Pick<User, "role"> | null | undefined): boolean {
  return !!user && ADMIN_ROLES.has(user.role);
}
