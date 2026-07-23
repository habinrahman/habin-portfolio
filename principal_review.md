# Principal Engineer Review — Portfolio

Evaluated as a Principal Engineer at Anthropic, ignoring design/colors/badges — engineering maturity only. Reviewed against `portfolio_v2.md`'s change log (fake telemetry/stat-card removal, "AI Systems Engineer" repositioning, new Verified Proof section).

## Verdict

The v2 rewrite is a content/copy pass, not a capability change. Cutting the fabricated telemetry panel and sine-wave stat cards was the right call — actively worse than nothing, since fake production evidence is disqualifying for a systems-engineering hire. But nothing yet in the site survives "walk me through what breaks and how you'd know."

## Missing signals

- A live deployed system with real uptime/status (even low traffic) beats any "production-grade" claim in prose
- Failure-handling evidence: postmortems, incident writeups, retry/backoff, idempotency
- Load-test numbers with linked methodology, not bare claims
- Cost/tradeoff reasoning for AI work — token/cost budgets, model choice rationale, latency vs. accuracy tradeoffs (biggest tell of a real "AI Systems Engineer" vs. someone who wired up an API call)
- CI as a visible, linked artifact (workflow file), not a decorative badge

## Projects worth building

1. Small but real distributed system — a job queue with retries, dead-letter handling, and backpressure — with a design doc explaining the failure modes considered.
2. An LLM pipeline with an actual eval set: inputs, expected outputs, a scoring script, and a regression check in CI. This alone would separate the portfolio from 95% of "AI engineer" portfolios.
3. Real observability (Prometheus/Grafana or structured logs + dashboard) wired to a real backend — not simulated telemetry.

## Diagrams worth having

- One system-of-record diagram per major project: data flow, failure/retry paths, and where state lives. Review-grade, not a marketing box diagram.
- A request-lifecycle diagram for the RAG/LLM pipeline showing where latency and cost accumulate (embedding, retrieval, generation) — doubles as the cost-reasoning artifact above.

## Open source that would impress

- A merged PR to a library actually used (LangChain, a vector DB client, FastAPI ecosystem) with a linked issue and discussion — shows ability to work in someone else's codebase under review.
- A standalone tool/library maintained with real external stars/usage/issues, not a portfolio-only repo.

## What should disappear

- Anything with "fabricated," "invented," or "simulated" in its own description — already correctly cut.
- Vague adjectives without a linked artifact ("scalable," "production-grade," "AI-powered") anywhere they aren't immediately backed by a repo, diagram, or number.
- Certifications given equal visual weight to real systems work — fine as a footnote, not a pillar.

## Bottom line

The rewrite in `portfolio_v2.md` is doing the right cleanup (cutting fake metrics, deduplicating copy), but it's still a content/copy pass. The gap isn't wording — it's that the site has no artifact yet that would survive the question "walk me through what breaks and how you'd know."
