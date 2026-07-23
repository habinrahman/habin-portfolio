# Portfolio Review — Critique Only (vs. GitHub README)

Scope: `habin-portfolio` homepage, reviewed against the GitHub profile README as the canonical technical profile. Critique only — no redesign.

## What the portfolio does worse than the README

- The README's "Featured Projects" section is tighter: one clean architecture line per project. The portfolio repeats Problem/Solution/bullets/tech stack for six projects at full length — it reads as padded, not curated. The README already proved these projects; the portfolio should be doing something the README can't (visual, interactive, memorable), not re-narrating them in prose.
- "Live system telemetry" with fake-looking terminal/server logs is a liability, not a strength. It's labeled "representative... not a tenant" and "sample output" — but that hedge itself signals fabrication. The README's actual GitHub contribution graph and real repo links carry more truth-weight than a staged terminal panel ever will.
- The homepage buries the one thing a hiring manager actually wants first — proof of real usage ("used by thousands," "verified by real users") — under signal jargon ("p95 84ms · depth 7") that reads as invented precision rather than earned credibility.

## What's duplicated

- Tech stack appears three times: "What I do" (Primary/Secondary), "Engineering stack & systems," and again per-project in the Tech: lines. Same information, three formats, no new signal each time.
- "Systems that run / stay up" is repeated as a phrase at least five times (hero, footer, tagline, closing line, contact section). It's a good line once. Five times it stops being a philosophy and starts being a tic — the README says it once and moves on.
- Certifications appear as a full section here with the same three certs the README lists — this is one of the few things safe to duplicate since certs are inherently a credential list, but the "Applied in" tags underneath are duplicating project associations already shown elsewhere.

## What should move

- The Certificate Verification "Live verification pattern" walkthrough is your best differentiator (real public endpoint, real users, "verifiable records instead of static PDFs") and it's currently stranded near the bottom next to certs. This is genuinely portfolio-only material — the README can't do interactive verification. It should be much higher, arguably in the hero's proof zone.
- Open Source tools (RLS Inspector, AI CSV Importer per the README critique) aren't visible on the portfolio at all in what's shown — if they're the most "technically legible" work per the README review, they're more portfolio-appropriate than a fifth repeated tagline.

## What should stay

- The featured project list itself (trim the prose, keep the set).
- Certifications with "View credential" links — concrete and verifiable.
- The problem→solution transformation strip (Manual→Automated, Unreliable→Hardened, Local→Deployed) — this is a good compression of the README's "Philosophy" section into something visual. Keep this pattern, expand on it.

## What should become visual

- The "Featured Systems" Problem/Solution paragraphs should become diagrams or before/after visuals, not repeated prose blocks — this is exactly the kind of content a portfolio should show, not tell, versus the README's text-only format.
- System status/health (api/worker/scheduler/postgres) should be a real, live-fetched status widget if it can be wired up, or removed — a fake-labeled dashboard undermines the "not a demo" claim harder than not having one at all.
- The "20+ systems built / 18 deployed" stats are just numbers in text — these read stronger as a visual counter or timeline than as a stat row sitting next to more text.

## What should disappear

- "Signal · p95 84ms · depth 7" tags on project cards — invented-sounding metrics with no real backing hurt trust more than they add polish.
- Redundant taglines — cut to one strong instance of "systems that run/stay up," not five.
- The synthetic terminal/server-log panel, unless it's a real embed (e.g., live Grafana/uptime badge) — otherwise it's the portfolio's own version of the README's "Writing & Speaking" problem: a section announcing effort without substance.

## How the homepage should change

Current sequence: hero → production systems badges → what I do → telemetry stats → automations → transformation strip → featured projects → fake telemetry → engineering stack → certs → verification proof → CTA. That's too many credibility-claiming sections before the one section with real third-party proof (the verification system). Apple/Stripe/Vercel pattern: hero claim → one unmistakable proof point → curated work → done. The live verification system is the unmistakable proof point — it should almost anchor the hero, or immediately follow it, instead of appearing two-thirds down the page after several sections that are asking to be trusted rather than demonstrating why they should be.
