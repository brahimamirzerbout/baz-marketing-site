# BAZ — Claims Ledger (public-claim audit)

> Every metric shown to buyers must be tagged here. Per the BAZ guardrail:
> *never fabricate metrics; flag composites as `[replace with real]`.* A claim that
> ships to buyers unverified is a guardrail violation, regardless of intent.
>
> **Status legend:** `[verified]` = real data cited · `[demonstrative]` = honest
> "illustrative" wording, no specific number claimed · `[remove]` = cut it.
>
> **Owner:** founder. **Deadline:** 2026-08-06. Every row must move to
> `[verified]` or `[remove]` before any public page ships the claim.

| Claim | Where it appears | Status | Evidence / action |
|---|---|---|---|
| "60+ brands shipped" | system prompt, agency-site, BAZ-Agent-System-Prompt.md | `[verify]` | Cite the real count + 3 named (or permissioned) examples, or reword to "a portfolio of brand engagements — details on request" |
| "27 concurrents analysés" / "27 agencies" | agency-site/README.md, ÆTHER VOICE.md | `[verify]` | If the 27-agency scan is a real dataset, cite the file/URL. If composite, tag `[demonstrative]` and reword to "a scan of the Algerian agency market" — no specific "27" |
| "265 books" | marketing-hub site | `[verify]` | Cite the source corpus, or reword |
| "9,377 terms" | marketing-hub site | `[verify]` | Cite the glossary source, or reword |
| "14,000+ operator passages" | marketing-hub site | `[verify]` | Cite the ingest log (the `152k passages` commit exists — reconcile the two numbers) |
| "247 pages" / "362 routes" | marketing-hub site | `[verify]` | Verify against the live sitemap; reword to "[demonstrative]" if the counts are aspirational |
| "0/27 offer QR" / "1/27 publish prices" | agency-site | `[verify]` | Same 27-agency dataset — if real, cite; if not, reword to directional language |
| "24h delivery" | agency-site, ÆTHER VOICE.md | `[verify]` | Confirm the delivery SLA is operationally true before publishing |
| "live in 45 days or you don't pay" | positioning.md hero offer | `[verify]` | Confirm the 45-day delivery is operationally deliverable before the offer scales — this is the risk-reversal promise |
| performance / revenue metrics | marketing-hub site | `[verify]` | Every "+40% traffic / top-3 / payback" claim needs a real client or `[demonstrative]` tag |

## The rule
No public page ships a metric that isn't `[verified]` or honestly `[demonstrative]`.
The marketing-hub production-readiness brief (ask 1, §6) is the enforcement: tag or
remove, no middle ground. **This file is the proof plan.**

## Reconciliation note
- The "152k passages / 6,251 videos / 25 masters" commit (marketing-hub `b944119`)
  exists in the git log — that's a real ingest. Reconcile it with the "14,000+
  operator passages" site claim (different number, same concept). Pick one, cite it.
- The 10-stage marketer engine + ~25 marketers is doctrine (citable to the
  `~/BAZ-research/` corpus) — that's `[verified]` lineage, not a fabricated metric.