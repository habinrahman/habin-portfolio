# Consistency Review — GitHub Profile README vs. Portfolio (`portfolio.config.ts` / `portfolio.projects.build.ts`)

## 1. Conflicting technical claims (same project, different stack)

These are the most serious findings — the two properties describe the *same* project with materially different technology, which reads as either carelessness or fabrication to anyone who cross-checks.

- **AI Job Application Tracker**: GitHub README says `Elixir` `Phoenix` `PostgreSQL` `Gmail API` ("Phoenix/LiveView backend"). Portfolio config (`ai-job-application-tracker`) lists `FastAPI, TypeScript, Python, OpenAI, PostgreSQL, Gmail API, Docker, DigitalOcean, Render, GitHub Actions, cron jobs, background workers` — no Elixir/Phoenix at all, and adds Python/FastAPI instead. This isn't additive detail, it's a contradictory backend language claim for the same repo.
- **Ollive Inference Platform**: GitHub says `Python` `Kubernetes` `Gemini`. Portfolio says `TypeScript, Node.js, FastAPI, OpenAI, PostgreSQL, Docker, DigitalOcean, Render, background workers` — different language (Python vs. TypeScript/Node), different model provider (Gemini vs. OpenAI), and Kubernetes disappears entirely even though it's the one project that would justify Kubernetes appearing in the GitHub skills table at all.
- **MicroDegree Hub**: GitHub describes the architecture as "Next.js frontend → Supabase Auth/RBAC → PostgreSQL" (no separate backend API layer implied). Portfolio adds `FastAPI` as part of the stack/architecture, which GitHub never mentions for this project.

## 2. Repo URL mismatches

- **Certificate Verification**: GitHub links to `github.com/habinrahman/CertificationVerification-V2`. Portfolio links to `github.com/habinrahman/certificate-verification`. This is not a casing difference — different repo name entirely, so a visitor following the portfolio link may land on a 404 or a different repo than the one referenced in the README.
- **MicroDegree Hub**: GitHub → `github.com/habinrahman/Hub`; Portfolio → `github.com/habinrahman/microdegree-hub`.
- **Outreach**: GitHub → `github.com/habinrahman/microdegree-outreach-platform`; Portfolio → `github.com/habinrahman/automated-email-job`.
- Several others differ only in case (`AI-Job-Application-Tracker` vs `ai-job-application-tracker`, `MyCareer-AI` vs `mycareer-ai`, `Ollive-Inference-Platform` vs `ollive-inference-platform`) — GitHub repo slugs are case-sensitive in path display though not in resolution, worth normalizing for a professional signal either way.

## 3. Missing live demo links on the portfolio

GitHub README advertises live URLs that the portfolio config has as empty strings:
- MicroDegree Hub: GitHub links `central.microdegree.work`; portfolio `live: ''`.
- Outreach automation: GitHub links `outreach.microdegree.work`; portfolio `live: ''`.

The portfolio is the property that should be leading with proof, but it's under-linking relative to the README.

## 4. Missing/extra projects between the two surfaces

- **On GitHub, not on portfolio at all**: AI CSV Importer, RLS Inspector (both listed under "Open Source & Tools" on GitHub) don't appear anywhere in `portfolio.projects.build.ts`.
- **On portfolio, absent from GitHub**: FinGuard, food-delivery-backend, intruder-detector, competitor-research-automation, certificate-backend-utilities, internal-tools-utilities. GitHub READMEs are typically curated/selective, so absence alone isn't a defect — but a few of these (food-delivery-backend, internal-tools-utilities) read as generic/tutorial-style exercises, which sits awkwardly next to the portfolio's own closing line: *"Not a demo. Not a tutorial project."*

## 5. Positioning / branding mismatch

- GitHub bio: **"Backend & AI Systems Engineer"** deepening into **Agentic AI**, with LangGraph/MCP called out explicitly as current focus, and a repeated "systems that plan, call tools, and carry state" framing.
- Portfolio meta/profile title: **"AI Systems Engineer"** (drops "Backend &"). Portfolio's engineering-stack "AI Systems" group lists only "LLM orchestration & agentic workflows / OpenAI integrations, RAG, vector search / classification pipelines" — no mention of LangGraph, MCP, or Gemini, despite GitHub calling these out by name as the active differentiator.
- Core taglines don't overlap at all: portfolio's repeated hero line is **"I build systems that run"** (used in `hero.h1` and `hirePitch.primary`); GitHub's core line is **"production backend platforms... apply that same reliability discipline to LLM systems."** Neither README nor portfolio uses the other's phrasing — no shared signature line across the two properties.
- Tone/voice mismatch: GitHub reads as a plain, restrained engineering profile ("that work is in progress, and I'd rather say so plainly than round it up"). Portfolio uses gamification language (XP, levels, "unlock graph," Ctrl+K command palette, "Progress & unlocks") that has no counterpart or explanation on GitHub — a visitor coming from one to the other will hit a noticeably different register.

## 6. Internal prioritization inconsistency (portfolio only, but affects credibility of GitHub-portfolio parity)

- The portfolio's `authority` section presents only 3 "Production systems" as top-line proof, one of which is **"Intrusion detection — real-time alerts."** That project (`intruder-detector`) is `featured: false` in the project data (buried in "More Projects") and doesn't appear anywhere in the GitHub README's featured or OSS lists — so the single most GitHub-invisible project is simultaneously one of the portfolio's three headline trust signals, with nothing on GitHub a visitor could cross-check it against.

## 7. Minor wording/language duplication

- "Systems that run" / "stay up" framing appears twice within the portfolio itself (hero + hirePitch) — changelog claims dedup happened but a second instance remains (likely intentional as it's a different UI surface, flagging for awareness).
- Footer line ("Habin Rahman · AI Systems Engineer · backend, automation, applied AI") vs. GitHub bio line ("Backend & AI Systems Engineer") — same three concepts, different order/phrasing, reads as two different taglines for the same person rather than one consistent line reused.
