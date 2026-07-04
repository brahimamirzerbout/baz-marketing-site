import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;
const PROTECTED_PATHS = ["/admin", "/console", "/hub", "/portal", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!needsAuth) return NextResponse.next();

  const customSession = req.cookies.get("baz_session")?.value;
  if (customSession) return NextResponse.next();

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
