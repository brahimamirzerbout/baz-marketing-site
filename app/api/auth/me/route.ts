import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { readSessionFromCookies } from "@/lib/auth";

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
    const { user } = session;
    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User",
        role: "member",
        initials: ((user.user_metadata?.full_name as string)?.[0] ?? user.email?.[0] ?? "U").toUpperCase(),
        color: "var(--brand)",
      },
    });
  }

  const { user } = await readSessionFromCookies();
  return NextResponse.json({ ok: true, user });
}
