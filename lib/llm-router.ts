/**
 * LLM Router — provider failover chain with circuit breaker.
 *
 * Chains: gemini → openai → anthropic → ollama → deterministic fallback.
 * Each provider has a circuit breaker: skip after 3 failures in 60s.
 */

import { complete as callProvider, llmStatus, type LlmResult } from "./llm";

interface ProviderState {
  name: string;
  failures: number[];
  cooldownUntil: number;
}

const providers: ProviderState[] = [
  { name: "gemini", failures: [], cooldownUntil: 0 },
  { name: "openai", failures: [], cooldownUntil: 0 },
  { name: "anthropic", failures: [], cooldownUntil: 0 },
  { name: "ollama", failures: [], cooldownUntil: 0 },
];

const COOLDOWN_MS = 300_000;
const FAILURE_THRESHOLD = 3;
const WINDOW_MS = 60_000;

function isAvailable(p: ProviderState): boolean {
  if (Date.now() < p.cooldownUntil) return false;
  const recent = p.failures.filter((t) => Date.now() - t < WINDOW_MS);
  return recent.length < FAILURE_THRESHOLD;
}

function recordFailure(p: ProviderState): void {
  p.failures.push(Date.now());
  const recent = p.failures.filter((t) => Date.now() - t < WINDOW_MS);
  if (recent.length >= FAILURE_THRESHOLD) {
    p.cooldownUntil = Date.now() + COOLDOWN_MS;
  }
}

function recordSuccess(p: ProviderState): void {
  p.failures = [];
  p.cooldownUntil = 0;
}

async function tryProvider(p: ProviderState, args: {
  prompt: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<LlmResult | null> {
  if (!isAvailable(p)) return null;

  try {
    const result = await callProvider({
      ...args,
      provider: p.name as any,
    });

    if (result.ok) {
      recordSuccess(p);
      return result;
    }
    recordFailure(p);
    return result;
  } catch {
    recordFailure(p);
    return null;
  }
}

export interface RoutedResult {
  ok: boolean;
  provider: string | null;
  text: string | null;
  error?: string;
}

/**
 * Route a completion request across available providers.
 * Falls back to a null result (no provider) when all are down.
 */
export async function routeComplete(args: {
  prompt: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<RoutedResult> {
  const status = llmStatus();
  const available = providers.filter((p) => status.keysPresent[p.name as keyof typeof status.keysPresent]);

  if (available.length === 0) {
    return { ok: false, provider: null, text: null, error: "no_provider_configured" };
  }

  for (const p of available) {
    const result = await tryProvider(p, args);
    if (result?.ok) {
      return { ok: true, provider: result.provider, text: result.text };
    }
  }

  return { ok: false, provider: null, text: null, error: "all_providers_failed" };
}

export function routerStatus(): Record<string, { available: boolean; failures: number; cooldownUntil: number }> {
  const result: Record<string, { available: boolean; failures: number; cooldownUntil: number }> = {};
  for (const p of providers) {
    const recent = p.failures.filter((t) => Date.now() - t < WINDOW_MS);
    result[p.name] = {
      available: isAvailable(p),
      failures: recent.length,
      cooldownUntil: p.cooldownUntil,
    };
  }
  return result;
}
