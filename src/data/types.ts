export type ProjectImpact = {
  metric: string
  description: string
}

/** Live verification example (public URL + copy) — project modal, deep dive, certifications. */
export type VerificationProof = {
  sectionTitle: string
  lead: string
  ctaLabel: string
  ctaUrl: string
  /** One line directly under the CTA (e.g. endpoint vs static PDF). */
  ctaMicrocopy?: string
  supporting: string
  connection: string
  tag?: string
}

export type Project = {
  id: string
  /** Shown in the homepage featured grid (top N by config order). */
  featured?: boolean
  /** Overrides category-derived label on cards (e.g. “AI-Powered Full-Stack Platform”). */
  systemTypeLabel?: string
  /** Human-readable card title (e.g. “Certificate Verification System”). Falls back to `title`. */
  displayTitle?: string
  /** GitHub repo slug for “Repository: …” line; falls back to parsing `github` URL or `title`. */
  repoSlug?: string
  /** Short internal slug / legacy label; prefer `displayTitle` + `repoSlug` on cards. */
  title: string
  /** One-line card summary; cards fall back to `tagline` if omitted. */
  description?: string
  tagline: string
  /** 2–3 short bullets: what the system does in real usage (production framing). */
  usageHighlights: string[]
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Systems'
  status: 'Shipped' | 'Production' | 'In Progress'
  github?: string
  demo?: string
  /** Public URL alias for `demo` (same value allowed); shown as "Live →" on cards. */
  live?: string
  /** Drives Running vs Production emphasis on status strip. */
  lifecycleStatus?: 'running' | 'production'
  /** Optional card thumbnail (URL or data URL from admin upload). */
  thumbnail?: string
  /** When set, replaces the default "Demo" label on the external link. */
  demoLabel?: string
  /** Short note beside the demo/verify link (e.g. real-world reference). */
  demoReferenceNote?: string
  /** Extra copy tying the project to production-style systems (modal + engineering details). */
  productionNotes?: {
    context: string
    /** Strong positioning line (e.g. vs manual verification / platform-style flows). */
    positioning?: string
    comparison: string
    kicker?: string
  }
  /** Industry-style live verification link + narrative (e.g. certificate systems). */
  verificationProof?: VerificationProof
  problem: string
  solution: string
  techStack: string[]
  keyFeatures: string[]
  impact: ProjectImpact[]
  engineeringDecisions: string[]
  tradeoffs: string[]
  architectureOverview: string[]
  levelRequired: 1 | 2 | 3 | 4 | 5
  xpReward: number
}

export type SkillCategory = {
  id: string
  title: string
  description: string
  skills: Array<{
    id: string
    name: string
    level: number // 0-100
  }>
}

export type ExperienceItem = {
  id: string
  title: string
  org: string
  timeframe: string
  summary: string
  achievements: string[]
}

