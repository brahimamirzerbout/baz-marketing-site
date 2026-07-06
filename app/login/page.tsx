"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/console";
  const [mode, setMode] = useState<"magic" | "password">("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // Passwordless: email → magic link
  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSent(false);
    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo, shouldCreateUser: false },
      });
      if (otpError) {
        setError(otpError.message);
        return;
      }
      setSent(true);
    } catch {
      setError("network_error");
    } finally {
      setBusy(false);
    }
  }

  // Fallback: password (kept for now)
  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(
          signInError.message?.includes("Invalid login credentials")
            ? "invalid_credentials"
            : signInError.message,
        );
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("network_error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 py-16 bg-background">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center font-display text-2xl font-medium tracking-[-0.04em] mb-8"
        >
          BAZventures
        </Link>
        <div className="bg-card rounded-2xl border border-border p-8 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-medium tracking-[-0.02em]">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Operator console &amp; client portal.
            </p>
          </div>

          {sent ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground bg-muted/40 rounded-xl border border-border p-4 text-center">
                Check your email for the sign-in link.
                <br />
                <span className="text-xs">It expires shortly.</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setError(null);
                }}
                className="w-full text-xs text-muted-foreground hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : mode === "magic" ? (
            <form onSubmit={sendMagicLink} className="space-y-5">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Email
                </span>
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-border text-sm focus:outline-none focus:border-accent"
                />
              </label>
              {error && (
                <p className="text-sm text-accent">
                  {error === "network_error" ? "Network error — try again." : error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
              >
                {busy ? "Sending…" : "Send sign-in link"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("password");
                  setError(null);
                }}
                className="w-full text-xs text-muted-foreground hover:underline"
              >
                Use a password instead
              </button>
            </form>
          ) : (
            <form onSubmit={signInWithPassword} className="space-y-5">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Email
                </span>
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-border text-sm focus:outline-none focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Password
                </span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-3 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-border text-sm focus:outline-none focus:border-accent"
                />
              </label>
              {error && (
                <p className="text-sm text-accent">
                  {error === "invalid_credentials"
                    ? "Wrong email or password."
                    : error === "network_error"
                      ? "Network error — try again."
                      : error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
              >
                {busy ? "Signing in…" : "Sign in"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("magic");
                  setError(null);
                }}
                className="w-full text-xs text-muted-foreground hover:underline"
              >
                Use a sign-in link instead
              </button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground pt-2 border-t border-border">
            No account?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-background">
          <span className="text-muted-foreground text-sm">Loading…</span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}