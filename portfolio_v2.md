# Portfolio Rewrite v2 — Change Log

Implements the fixes from `portfolio_review.md`. Content + structure rewrite — no visual/design-system overhaul (that was explicitly out of scope).

## Positioning

- Title/headline repositioned: "Backend Systems & Cloud Automation Engineer" → **"AI Systems Engineer"** — in `index.html` meta, page `<title>`/description, and `profile.title`. Kept honest: still framed as backend + automation + applied AI, not overclaimed as an ML/research role.
- Hero subhead rewritten to foreground AI without dropping the backend/automation core: "Backend infrastructure, automation, and applied AI — built to stay up in production."

## Cut

- The fake terminal/server-log panel (`LiveSystemTelemetrySection`) — deleted the component file and its config block (`liveTelemetry`) entirely. It simulated `git push` / Docker build output and fabricated status rows (`p95 42ms`, `queue depth 1`, etc.).
- The `signal · p95 84ms · depth 7` fabricated metric strip that appeared under the Featured Projects heading (`LiveSystemPulse` in `ProjectsSection`).
- The animated fake stat cards (`LiveEngineeringStats`) in "What I do" — driven by a client-side sine-wave "wobble" on invented numbers. Replaced with nothing; the real "Active GitHub projects: N+" line (already sourced from GitHub) stays as the only stat.

## Moved

- Certificate verification proof — previously buried near the bottom next to the certifications grid — now lives in its own section, `VerifiedProofSection` (`src/sections/VerifiedProofSection.tsx`), placed immediately after the hero/authority strip. This is the strongest piece of real, checkable evidence on the site and now anchors the page instead of trailing it.
- Nav updated to match: added a "Verified" link, removed "Telemetry".

## Merged

- "AI workflow systems" section folded into the Engineering Stack table as a new "AI Systems" group (LLM orchestration, OpenAI/RAG/vector search, classification pipelines). Removed the standalone section and its duplicate tech-stack framing.

## De-duplicated

- "Systems that run / stay up" previously appeared 5 times across hero, footer, work-with-me CTA, and closing statement. Now appears once, in the hero. Closing statement rewritten to add new information instead of echoing the headline: "Not a demo. Not a tutorial project. Production systems — including the AI ones."
- Footer line updated to match the new positioning: "Habin Rahman · AI Systems Engineer · backend, automation, applied AI."

## New homepage order

Hero → Authority strip → **Verified proof** → What I do → Projects → Problem-to-system → Engineering stack (incl. AI) → Certifications → Work with me → Contact.

(Previous order buried the one unmistakable proof point — the live verification system — two-thirds down the page behind several sections that were asking to be trusted rather than demonstrating why.)

## Files touched

- `src/config/portfolio.config.ts` — copy, nav, section content, removed `liveTelemetry`/`aiWorkflowSystems` keys, added `verifiedProof`
- `src/pages/HomePage.tsx` — section import/order
- `src/sections/VerifiedProofSection.tsx` — new
- `src/sections/WhatIDoStackSection.tsx`, `src/sections/ProjectsSection.tsx`, `src/sections/CertificationsSection.tsx` — removed fabricated-metric widgets
- `src/components/command/CommandPalette.tsx` — updated `ai-workflow-systems`/`telemetry` command entries to match new structure
- `index.html` — title/meta/og tags
- Deleted: `src/sections/AiWorkflowSystemsSection.tsx`, `src/sections/LiveSystemTelemetrySection.tsx`

## Verification

- `tsc --noEmit` — clean
- `npm run build` — succeeds
- Not visually screenshotted in a browser (no browser tool available in this session) — worth a manual look at `localhost:5173` before treating this as final.
