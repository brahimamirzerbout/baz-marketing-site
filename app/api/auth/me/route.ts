import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { readSessionFromCookies } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    },
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    const { user: supaUser } = session;
    const db = getDb();
    const localUser = db.prepare(
      "SELECT id, email, name, role, team, initials, color FROM users WHERE email = ?",
    ).get(supaUser.email ?? "") as { id: string; email: string; name: string; role: string; team: string | null; initials: string; color: string } | undefined;
    if (localUser) {
      return NextResponse.json({ ok: true, user: localUser });
    }
    // Supabase-authenticated user has no local row → refuse to mint a session.
    // Either the admin needs to provision them, or the auth provider is wrong
    // for this app. Do not silently downgrade to a fabricated 'member' role.
    return NextResponse.json(
      { ok: false, error: "no_local_user", provider: "supabase" },
      { status: 401 },
    );
  }

  const { user } = await readSessionFromCookies();
  return NextResponse.json({ ok: true, user });
}
