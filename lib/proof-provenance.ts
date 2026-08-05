/**
 * Proof provenance gate — the Cialdini-Code enforcement layer for proof.
 *
 * Ground truth (~/Desktop/BAZ-Canonical.md §1):
 *   "Never fabricate client metrics, testimonials, or case studies.
 *    Flag composites as [replace with real]."
 *
 * The 18 service `proof` points in content/services.ts are representative
 * composites (see that file's header comment). Rendering them as
 * authoritative named-client results on a public production site would
 * violate the doctrine. This gate mirrors the existing "show nothing rather
 * than fabricate" pattern already used for testimonials ([]), case-studies
 * ([]), and homepage stats (env-gated hide-when-null in lib/site.ts).
 *
 * Model: default-composite. A proof point is composite UNLESS it explicitly
 * declares `provenance: "signed"` — same default-deny / explicit-allow
 * posture as the authority engine (§2.6). Real, client-approved outcomes opt in.
 *
 * Behavior:
 *   - Production (NEXT_PUBLIC_SHOW_COMPOSITE_PROOF unset/false):
 *       publicProof() returns ONLY signed points. Composite points never
 *       reach the public render — callers show the NDA substitute instead.
 *   - Dev/preview (NEXT_PUBLIC_SHOW_COMPOSITE_PROOF=true):
 *       publicProof() returns ALL points so editors can iterate on copy.
 *       Render composite points with a visible "representative example"
 *       provenance tag (isCompositeProof() → tag the card).
 *
 * To ship a real outcome: add `provenance: "signed"` to that proof point,
 * only with written client permission. The audit-placeholders script counts
 * how many points remain unsigned.
 */

export type Provenance = "signed" | "composite";

export type ProofPoint = {
  provenance?: Provenance;
};

/** Dev/preview gate: true → composite proof is rendered (flagged). */
export const SHOW_COMPOSITE_PROOF =
  process.env.NEXT_PUBLIC_SHOW_COMPOSITE_PROOF === "true";

/**
 * The proof points safe to render on the public site.
 * Production: signed only. Dev/preview (flag set): everything.
 */
export function publicProof<P extends ProofPoint>(all: readonly P[]): P[] {
  if (SHOW_COMPOSITE_PROOF) return [...all];
  return all.filter((p) => p.provenance === "signed");
}

/** True when a point is composite (must be flagged, never shown as real). */
export function isCompositeProof<P extends ProofPoint>(p: P): boolean {
  return p.provenance !== "signed";
}