import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;
const PROTECTED_PATHS = ["/admin", "/console", "/hub", "/portal", "/dashboard"];

export const runtime = "nodejs";

/**
 * Session tokens are 32 random bytes hex-encoded (see `lib/db.ts` → `token()`),
 * which is 64 lowercase hex chars. This regex is the edge-safe, DB-free check
 * used by the middleware to reject trivially-forged cookies (empty, non-hex,
 * wrong length) before the request reaches a server component.
 *
 * The *authoritative* check (token exists in the `sessions` table, is not
 * expired, and resolves to a real user) happens in the server component via
 * `readSessionFromCookies()` / `requireAdmin()`. Middleware does not touch
 * the DB because the better-sqlite3 native module is not edge-compatible.
 */
const SESSION_TOKEN_FORMAT = /^[a-f0-9]{64}$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!needsAuth) return NextResponse.next();

  // Edge-safe gate: presence + format only. A forged cookie with the right
  // shape would pass this gate and be rejected by the page's `requireAdmin`,
  // which performs the DB-backed lookup. Net effect: no auth bypass, but the
  // middleware stays edge-bundleable.
  const customSession = req.cookies.get("baz_session")?.value;
  if (customSession && SESSION_TOKEN_FORMAT.test(customSession)) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request: req });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        req.cookies.set({ name, value, ...options });
        supabaseResponse = NextResponse.next({ request: req });
        supabaseResponse.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        req.cookies.set({ name, value: "", ...options });
        supabaseResponse = NextResponse.next({ request: req });
        supabaseResponse.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/console/:path*", "/hub/:path*", "/portal/:path*", "/dashboard/:path*"],
};
