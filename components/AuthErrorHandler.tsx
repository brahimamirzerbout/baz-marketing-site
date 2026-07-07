"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Catches Supabase auth errors that land on the Site URL (the implicit/hash
 * flow bypasses /auth/callback). The classic case: an expired magic link →
 *   /?error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired#error=...&sb=
 * The error sits in BOTH the query string (server-visible) and the hash
 * (client-only). We read both on mount and redirect to /login with a clean
 * error code so the login page can show a friendly message + a re-send form,
 * instead of leaving the user on a garbled error URL.
 *
 * No-op when no error is present. Runs once per mount.
 */
export function AuthErrorHandler() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const qErr =
      url.searchParams.get("error_code") ||
      url.searchParams.get("error") ||
      url.searchParams.get("error_description") ||
      "";
    let hErr = "";
    if (url.hash.startsWith("#")) {
      const hp = new URLSearchParams(url.hash.slice(1));
      hErr =
        hp.get("error_code") ||
        hp.get("error") ||
        hp.get("error_description") ||
        "";
    }
    const raw = (qErr || hErr).toLowerCase();
    if (!raw) return;
    const code =
      raw.includes("otp_expired") || raw.includes("expired") || raw.includes("access_denied")
        ? "otp_expired"
        : "auth_error";
    router.replace(`/login?error=${encodeURIComponent(code)}`);
  }, [router]);
  return null;
}