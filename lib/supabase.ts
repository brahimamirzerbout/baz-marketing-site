/**
 * BAZventures — Supabase server adapter for Next.js App Router.
 *
 * Uses `createSupabaseContext` from @supabase/server to produce an
 * RLS-scoped client (`ctx.supabase`) and an admin client that bypasses
 * RLS (`ctx.supabaseAdmin`) from the incoming Request.
 *
 * Env vars (set in .env.local — injected automatically on Edge Functions):
 *   SUPABASE_URL
 *   SUPABASE_PUBLISHABLE_KEY
 *   SUPABASE_SECRET_KEY
 *   SUPABASE_JWKS_URL
 */

import { createSupabaseContext, type SupabaseContext, type AuthModeWithKey, type WithSupabaseConfig } from "@supabase/server";

export type { SupabaseContext, AuthModeWithKey };

/**
 * Resolve Supabase context from a Next.js Request.
 *
 * Usage in a route handler:
 *
 *   export async function GET(req: NextRequest) {
 *     const { data: ctx, error } = await getSupabaseContext(req, { auth: "user" });
 *     if (error) return NextResponse.json({ error: error.message }, { status: error.status });
 *     const { data } = await ctx.supabase.from("todos").select();
 *     return NextResponse.json(data);
 *   }
 *
 * Auth modes:
 *   "user"       — requires valid JWT in Authorization: Bearer header
 *   "publishable" — requires publishable key in apikey header
 *   "secret"      — requires secret key in apikey header
 *   "none"        — no auth required (still creates the clients)
 *
 * Multiple modes: { auth: ["user", "publishable"] } — first match wins.
 */
export async function getSupabaseContext<Database = unknown>(
  request: Request,
  options?: Pick<WithSupabaseConfig, "auth" | "env" | "supabaseOptions">,
): Promise<
  | { data: SupabaseContext<Database>; error: null }
  | { data: null; error: { message: string; status: number } }
> {
  const result = await createSupabaseContext<Database>(request, options);
  if (result.error) {
    return {
      data: null,
      error: {
        message: result.error.message,
        status: result.error.status,
      },
    };
  }
  return { data: result.data, error: null };
}