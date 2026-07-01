import { NextRequest, NextResponse } from "next/server";
import { getSupabaseContext } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/supabase-demo
 *
 * Demonstrates @supabase/server integration. Requires a valid JWT
 * (Authorization: Bearer <token>) from Supabase Auth.
 *
 * Returns the caller's identity and a test query against Supabase.
 */
export async function GET(req: NextRequest) {
  const { data: ctx, error } = await getSupabaseContext(req, { auth: "user" });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status },
    );
  }

  // ctx.supabase — RLS-scoped client (sees only rows the caller's JWT allows)
  // ctx.supabaseAdmin — admin client (bypasses RLS, sees everything)
  // ctx.userClaims — decoded JWT identity (id, email, role)
  // ctx.jwtClaims — raw JWT payload

  return NextResponse.json({
    ok: true,
    authMode: ctx.authMode,
    user: ctx.userClaims
      ? {
          id: ctx.userClaims.id,
          email: ctx.userClaims.email,
          role: ctx.userClaims.role,
        }
      : null,
    supabaseUrl: process.env.SUPABASE_URL,
    message: "Supabase context created successfully. Use ctx.supabase for RLS-scoped queries, ctx.supabaseAdmin for admin queries.",
  });
}