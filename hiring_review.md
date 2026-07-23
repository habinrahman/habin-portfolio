# Hiring Review — Portfolio + GitHub README

Reviewed as a Staff Engineering Manager hiring for an AI Systems Engineer role, given only the portfolio site and GitHub profile README.

## Would I interview you?

**Yes, for a mid-level backend role. No, for anything with "AI Systems Engineer" in the title as currently framed.** That's the core problem: the title is a bet the content doesn't cash. You have one real AI-adjacent asset (RAG + tool calling + LLM classification, shipped) and you're using it to claim a title usually reserved for people who've built or owned agent orchestration, evals, or model behavior in production at scale. A recruiter matching against that title will bounce off the gap between headline and evidence in under a minute.

## Concerns

- **Title inflation.** "AI Systems Engineer" vs. what's actually shown: RAG, embeddings, LLM classification, tool calling. That's applied-AI backend work — real, but one tier below what the title implies. You even admit it yourself in the README ("deepening into," "in progress, and I'd rather say so plainly") — which is honest, but it also confirms the title is aspirational, not current. Pick one: soften the title or beef up the evidence. Right now they contradict each other in the same document.
- **No metrics anywhere.** Zero numbers on scale, load, users, latency, uptime, cost. "Enrollment engine" — how many students? "High-volume outreach" — what volume? Without numbers I can't tell if this is a hobby project with good architecture diagrams or something that's actually been stress-tested. This is the single biggest gap.
- **You cut your own telemetry section.** The changelog shows you *removed* a live systems/telemetry panel because it was "fabricated" (fake p95 numbers, sine-wave stat wobble). Good call ethically — but it also means you had literally zero real telemetry to replace it with, and chose to show nothing rather than something real. That's the right integrity move, but it leaves the reliability claims ("systems that stay up") completely unverified. Nothing on the page proves uptime, error rates, or incident response. Say less about reliability until you can back it with a number.
- **"Ollive Inference Platform"** — "lightweight AI inference observability" with no live link, no metrics, no scale claim. Reads as a weekend build wearing enterprise vocabulary.
- **Six featured projects is too many.** Recruiters give you 3 real slots of attention. Cut to 3, go deeper on those.

## Missing signals

- No collaboration evidence — every project reads as solo. No PRs into other repos, no code review comments, no team context.
- No test coverage, CI, or engineering-process signals (no badges, no mention of testing discipline despite "reliability" being your whole philosophy).
- No blog posts / writeups showing how you think through a hard problem, not just what you shipped.
- No before/after — nothing showing you inherited a broken system and fixed it (that's usually the strongest signal for "reliability engineer" framing).
- No employer/client names, even anonymized ("worked with a 500-student cohort for X" would help).

## Strongest projects

1. **Certificate Verification Platform** — live, has a real trust/security angle (hash/signature verification), clearly shipped and used. Best single proof point on the page, correctly promoted to prime real estate.
2. **MicroDegree Hub** — live, has actual domain complexity (RBAC, lifecycle state machines, cron orchestration). Second strongest.
3. **Placement Outreach Automation** — good if it has real send volume; currently unproven by any number.

## Weakest / cut candidates

- **Ollive Inference Platform** — no live link, vaguest description, most inflated vocabulary relative to visible substance. This one hurts you more than it helps.
- **AI Job Application Tracker** — fine as a portfolio piece but reads as built-for-self, not built-for-others. Low stakes, no link to verify it's live.
- Consider dropping to 3–4 featured projects total; move the rest to the table you already have for smaller tools.

## Seniority read

**Mid-level (2–4 YOE equivalent), strong for that band, not senior.** Architecture instincts are good (state machines, idempotency language, service-layer separation) — that's the most senior-sounding thing on the page. But no evidence of: leading others, making tradeoff calls under organizational constraints, operating at scale, or owning something post-incident. The philosophy section reads like principles absorbed from good blog posts, not principles earned from an outage. That's not a knock — it's just what "no numbers, no team, no incident story" signals by default.

## Salary range (US market, remote-friendly, backend-leaning-AI)

**$95K–$130K base** for mid-level backend/applied-AI, depending on market. Not $150K+ "AI Systems Engineer" money — the title claim would get corrected downward the moment a recruiter actually reads past the headline, which creates friction/distrust in negotiation. Fix the title, and the comp conversation gets easier, not harder.

## Would I hire you over other applicants?

**Over a generic bootcamp-portfolio candidate with no shipped work — yes, easily.** You have live systems, real domain complexity, and unusually clear writing about tradeoffs (the "idempotency over optimism" line is a good signal, genuinely).

**Over another mid-level candidate who has metrics, team/collaboration evidence, and a title that matches their evidence — no.** You'd lose on trust, not on skill. The skill signal here is decent-to-good. The packaging signal (inflated title, no numbers, solo-only work) is what knocks you down a slot in a stack ranking.

**Bottom line:** the engineering is more credible than the pitch. Rename the pitch to match the engineering — "Backend Engineer, Applied AI" or "Backend & AI Systems Engineer" (which is literally what your GitHub README already says, correctly) — and drop "AI Systems Engineer" as the standalone portfolio headline until the evidence catches up. That single change removes most of the skepticism above.
