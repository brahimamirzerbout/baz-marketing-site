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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message?.includes("Invalid login credentials")) {
          setError("invalid_credentials");
          return;
        }
        setError(signInError.message);
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
          BAZ
        </Link>
        <form
          onSubmit={onSubmit}
          className="bg-card rounded-2xl border border-border p-8 space-y-5"
        >
          <div>
            <h1 className="font-display text-2xl font-medium tracking-[-0.02em]">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Operator console &amp; client portal.
            </p>
          </div>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-border text-sm focus:outline-none focus:border-accent"
            />
          </label>
          {error && (
            <p className="text-sm text-accent">
              {error === "invalid_credentials" ? "Wrong email or password." : error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </form>
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
