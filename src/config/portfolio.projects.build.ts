import type { Project, ProjectImpact, VerificationProof } from '../data/types'

/** Microdegree live certificate — shared by Certificate project + Certifications section. */
export const certificateLiveVerificationProof: VerificationProof = {
  sectionTitle: 'Real-world verification example',
  lead: 'This certificate is verified through a public endpoint — similar to how modern platforms validate credentials at scale.',
  ctaLabel: 'Verify Live Certificate',
  ctaUrl: 'https://certificate.microdegree.in/cert/DOEC-11146',
  ctaMicrocopy: 'Public verification endpoint — not a static document.',
  supporting: 'Used by thousands — each certificate is validated via a unique link.',
  connection:
    'My certificate verification system follows the same principle — verifiable records instead of static PDFs.',
  tag: 'Live verification pattern',
}

/**
 * Canonical project entry shape — defined in `portfolio.config.ts` and re-exported from there.
 */
export type PortfolioProjectConfig = {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  live?: string
  status: 'running' | 'production'
  featured: boolean
  problem?: string
  solution?: string
  impact?: string
  features?: string[]
  type?: string
}

export type PortfolioProjectBuild = {
  config: PortfolioProjectConfig
  merge?: Partial<Project>
}

function projectFromBuild(b: PortfolioProjectBuild): Project {
  const c = b.config
  const m = b.merge ?? {}
  const liveTrim = (c.live ?? '').trim()
  const lifecycleStatus = c.status

  const keyFeatures = (m.keyFeatures ?? c.features ?? []).filter(Boolean)
  let impact: ProjectImpact[] = []
  if (Array.isArray(m.impact) && m.impact.length) {
    impact = m.impact
  } else if (c.impact?.trim()) {
    impact = [{ metric: 'Impact', description: c.impact.trim() }]
  }

  const core: Project = {
    id: c.id,
    title: m.title ?? c.title,
    displayTitle: m.displayTitle,
    repoSlug: m.repoSlug,
    description: c.description,
    tagline:
      m.tagline ??
      (c.description.length > 160 ? `${c.description.slice(0, 157).trimEnd()}…` : c.description),
    usageHighlights: m.usageHighlights ?? [],
    category: m.category ?? 'Backend',
    status: m.status ?? (lifecycleStatus === 'production' ? 'Production' : 'Shipped'),
    lifecycleStatus,
    github: c.github,
    demo: m.demo !== undefined ? m.demo : liveTrim || undefined,
    live: liveTrim || undefined,
    featured: c.featured,
    systemTypeLabel: c.type,
    problem: c.problem ?? '',
    solution: c.solution ?? '',
    techStack: [...c.tech],
    keyFeatures,
    impact,
    engineeringDecisions: m.engineeringDecisions ?? [],
    tradeoffs: m.tradeoffs ?? [],
    architectureOverview: m.architectureOverview ?? [],
    levelRequired: m.levelRequired ?? 2,
    xpReward: m.xpReward ?? 200,
  }

  return { ...core, ...m, id: c.id, techStack: [...c.tech], featured: c.featured }
}

/** Order preserved: homepage shows first five `featured` projects; the rest roll into “More Systems”. */
export const PORTFOLIO_PROJECT_BUILDS: PortfolioProjectBuild[] = [
  {
    config: {
      id: 'mycareer-ai',
      title: 'MyCareer AI – Resume Intelligence & Career Mentorship Platform',
      description:
        'An AI-powered platform that analyzes resumes, delivers personalized mentorship, benchmarks candidates against industry standards, and generates professional career reports using generative AI.',
      tech: [
        'FastAPI',
        'Next.js',
        'Supabase',
        'PostgreSQL',
        'OpenAI',
        'pgvector',
        'SQLAlchemy',
        'Docker',
      ],
      github: 'https://github.com/habinrahman/mycareer-ai',
      live: '',
      status: 'production',
      featured: true,
      type: 'AI-Powered Full-Stack Platform',
      problem:
        'Job seekers lack personalized, data-driven insights to optimize their resumes and career prospects.',
      solution:
        'Developed an AI-powered platform leveraging FastAPI, OpenAI, and RAG to provide ATS scoring, career mentorship, and industry benchmarking.',
      impact:
        'Empowers students and professionals with intelligent career guidance and automated AI-generated reports.',
      features: [
        'Resume Analysis & ATS Scoring',
        'AI Career Mentorship Chatbot',
        'Skill Gap Detection & Career Roadmaps',
        'Semantic Job Matching using pgvector',
        'Downloadable AI-Generated Career Reports',
      ],
    },
    merge: {
      title: 'mycareer-ai',
      displayTitle: 'MyCareer AI – Resume Intelligence & Career Mentorship Platform',
      repoSlug: 'mycareer-ai',
      category: 'Backend',
      levelRequired: 2,
      xpReward: 280,
      tagline:
        'Resume intelligence, mentorship, and career reports powered by generative AI and RAG.',
    },
  },
  {
    config: {
      id: 'certificate-system',
      title: 'certificate-verification',
      description: 'QR verification, signed API, Supabase-backed issuer records.',
      tech: ['FastAPI', 'Supabase', 'React', 'PostgreSQL'],
      github: 'https://github.com/habinrahman/certificate-verification',
      live: 'https://certificate.microdegree.in/',
      status: 'production',
      featured: true,
      type: 'Backend Service',
      problem: 'Paper credentials are easy to forge without a public verify path.',
      solution: 'QR flow + signed API responses on controlled storage.',
      impact: 'Verifiable issuer records with instant, scan-based validation.',
      features: [
        'QR verification without manual lookup',
        'Signed, audit-friendly API responses',
        'Issuer records with access controls',
      ],
    },
    merge: {
      displayTitle: 'Certificate Verification System (Public API)',
      repoSlug: 'certificate-verification',
      demo: 'https://certificate.microdegree.in/',
      demoLabel: 'Demo',
      demoReferenceNote: 'Public verification',
      productionNotes: {
        context:
          'Real certificate systems validate through public endpoints — this project follows the same pattern.',
        positioning: 'Verifiable records replace static PDFs and manual lookup.',
        comparison: 'Same principle as mainstream credential platforms.',
        kicker: 'Live verification',
      },
      verificationProof: certificateLiveVerificationProof,
      impact: [
        { metric: 'Instant', description: 'Verification on scan.' },
        { metric: 'Single source', description: 'Immutable record per credential.' },
      ],
      engineeringDecisions: [
        'FastAPI for low-latency async APIs.',
        'Supabase for managed auth and storage.',
        'Minimal payloads on verification for privacy.',
      ],
      tradeoffs: ['External Supabase dependency for core data.'],
      architectureOverview: ['Client → FastAPI → Supabase'],
      levelRequired: 2,
      xpReward: 220,
    },
  },
  {
    config: {
      id: 'automated-email-job',
      title: 'automated-email-job',
      description: 'Outbound pipelines with Gmail/SMTP, quotas, threading, follow-ups.',
      tech: ['Python', 'Gmail API', 'SMTP', 'SQLite', 'React'],
      github: 'https://github.com/habinrahman/automated-email-job',
      live: '',
      status: 'production',
      featured: true,
      type: 'Automation System',
      problem: 'Manual outreach loses state across campaigns at scale.',
      solution: 'CSV-driven sends with quotas, tracking, and scheduled follow-ups.',
      impact: 'Repeatable email operations with observable delivery state.',
      features: [
        'Batched sends with quota-aware throttling',
        'Thread-aware reply detection',
        'Follow-up scheduler (e.g. 0/7/14/21 days)',
      ],
    },
    merge: {
      displayTitle: 'Automated Email Job (Pipeline System)',
      repoSlug: 'automated-email-job',
      tagline: 'Email automation at scale — batched sends, tracking, follow-ups.',
      impact: [
        { metric: 'Operational', description: 'Repeatable runs with observable delivery state.' },
        { metric: 'Throughput', description: 'Higher send volume without manual babysitting.' },
      ],
      engineeringDecisions: [
        'Gmail API with SMTP fallback for reliability.',
        'SQLite for lightweight deployment footprint.',
      ],
      tradeoffs: ['Provider rate limits require backoff and pacing.'],
      architectureOverview: ['CSV → Engine → Provider → Tracking → Follow-ups'],
      category: 'Systems',
      levelRequired: 3,
      xpReward: 280,
    },
  },
  {
    config: {
      id: 'competition-tracker',
      title: 'competition-tracker',
      description: 'Structured competition tracking — data model, APIs, clear boundaries.',
      tech: ['Python', 'APIs', 'PostgreSQL'],
      github: 'https://github.com/habinrahman/competition-tracker',
      live: '',
      status: 'running',
      featured: true,
      type: 'Backend Service',
      problem: 'Ad-hoc tracking breaks as entrants and events grow.',
      solution: 'Explicit entities, REST-style APIs, durable storage.',
      impact: 'One system of record for competition data.',
      features: [
        'REST-style API boundaries',
        'Persistent competition and entrant state',
        'Designed for incremental feature growth',
      ],
    },
    merge: {
      displayTitle: 'Competition Tracker (REST API)',
      repoSlug: 'competition-tracker',
      tagline: 'Competition workflows and persistence with clear service boundaries.',
      impact: [
        { metric: 'Clarity', description: 'One system of record for competition data.' },
        { metric: 'Maintainability', description: 'Separated concerns for future services.' },
      ],
      engineeringDecisions: ['Schema-first persistence', 'Small, testable service modules'],
      tradeoffs: ['Scope kept to core tracking over full UI polish.'],
      architectureOverview: ['API → Services → Database'],
      levelRequired: 2,
      xpReward: 200,
    },
  },
  {
    config: {
      id: 'finguard',
      title: 'FinGuard',
      description: 'Guard-rail style rules — APIs, validation, secure defaults.',
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/habinrahman/FinGuard',
      live: '',
      status: 'running',
      featured: true,
      type: 'Backend Service',
      problem: 'Sensitive flows need strict validation and traceable server decisions.',
      solution: 'Typed validation, transactional persistence, narrow public surface.',
      impact: 'Failures fail closed with reproducible containerized deploys.',
      features: [
        'Input validation at system boundaries',
        'Transactional persistence for critical paths',
        'Containerized deployment story',
      ],
    },
    merge: {
      displayTitle: 'FinGuard (Validation Layer)',
      repoSlug: 'FinGuard',
      tagline: 'Financial-style guard rails with explicit validation and persistence.',
      impact: [
        { metric: 'Safety', description: 'Failures fail closed with explicit errors.' },
        { metric: 'Deployability', description: 'Reproducible environments via containers.' },
      ],
      engineeringDecisions: ['FastAPI for clear request/response contracts', 'Docker for parity'],
      tradeoffs: ['Heavier ops surface than a single script deployment.'],
      architectureOverview: ['API → Domain → DB'],
      levelRequired: 2,
      xpReward: 210,
    },
  },
  {
    config: {
      id: 'intruder-detector',
      title: 'INTRUDER-DETECTION',
      description: 'OpenCV on camera stream — detect, capture evidence, alert.',
      tech: ['Python', 'OpenCV'],
      github: 'https://github.com/habinrahman/INTRUDER-DETECTION',
      live: '',
      status: 'production',
      featured: true,
      type: 'Automation System',
      problem: 'Recording alone does not notify when a threat pattern appears.',
      solution: 'Frame pipeline, triggers, evidence capture, email alerts.',
      impact: 'Alert path without a human watching the feed.',
      features: [
        'Continuous frame processing pipeline',
        'Evidence capture on trigger',
        'Email alerts with attachment context',
      ],
    },
    merge: {
      displayTitle: 'Intruder Detection System (Real-Time Alerts)',
      repoSlug: 'INTRUDER-DETECTION',
      tagline: 'Intrusion detection with evidence frames and outbound alerts.',
      impact: [
        { metric: 'Latency', description: 'Alert path without a human watching the feed.' },
        { metric: 'Coverage', description: 'Runs until stopped with observable behavior.' },
      ],
      engineeringDecisions: ['OpenCV for practical on-device iteration', 'Alert payload includes frames'],
      tradeoffs: ['Environment-dependent accuracy (lighting, angle, CPU).'],
      architectureOverview: ['Camera → Detection → Capture → Alert'],
      category: 'Systems',
      levelRequired: 1,
      xpReward: 160,
    },
  },
]

export const PROJECTS: Project[] = PORTFOLIO_PROJECT_BUILDS.map(projectFromBuild)

export const PROJECT_BY_ID: Record<string, Project> = PROJECTS.reduce(
  (acc, p) => {
    acc[p.id] = p
    return acc
  },
  {} as Record<string, Project>,
)
