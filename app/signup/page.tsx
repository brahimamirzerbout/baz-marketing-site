"use client";

import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabaseRef = useRef<ReturnType<typeof createBrowserClient<Database>> | null>(null);
  function getSupabase() {
    if (!supabaseRef.current) {
      supabaseRef.current = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
    }
    return supabaseRef.current;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    if (password.length < 8) {
      setError("password_too_short");
      setBusy(false);
      return;
    }

    try {
      const { error: signUpError } = await getSupabase().auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (signUpError) {
        if (signUpError.message?.includes("already registered")) {
          setError("email_taken");
          return;
        }
        setError(signUpError.message);
        return;
      }

      router.push("/console");
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
            <h1 className="font-display text-2xl font-medium tracking-[-0.02em]">
              Create an account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              For operators and clients. Free to start.
            </p>
          </div>
          <Field label="Name" value={name} onChange={setName} type="text" />
          <Field label="Email" value={email} onChange={setEmail} type="email" />
          <Field
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            hint="8 characters minimum"
          />
          {error && <p className="text-sm text-accent">{humanizeError(error)}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
          >
            {busy ? "Creating account…" : "Create account"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Already have one?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  hint,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  type: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-border text-sm focus:outline-none focus:border-accent"
      />
      {hint && <span className="block mt-1 text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function humanizeError(code: string): string {
  const map: Record<string, string> = {
    email_taken: "An account with that email already exists.",
    password_too_short: "Password must be at least 8 characters.",
    missing_fields: "All fields are required.",
  };
  return map[code] || code;
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-background">
          <span className="text-muted-foreground text-sm">Loading…</span>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
