/**
 * Single source of truth for portfolio content.
 * Project entries live in `./portfolio.projects.build.ts` (schema: `PortfolioProjectConfig`).
 */
import { certificateLiveVerificationProof } from './portfolio.projects.build'

/** Single certificate record — drives cards + modal carousel */
export type CertificationItem = {
  id: string
  title: string
  org?: string
  image: string
  category: string
}

export type ExperimentRepo = {
  id: string
  repo: string
  displayName: string
  description: string
  tech: readonly string[]
}

const EMPTY_EXPERIMENT_REPOS: readonly ExperimentRepo[] = []

export type TechStackEntry = { id: string; label: string }

export const portfolioConfig = {
  meta: {
    title: 'Habin Rahman | Backend Systems & Cloud Automation Engineer',
    description: 'Backend systems and cloud automation. I build systems that run.',
  },

  /** Profile image (place `public/headshot.png` or change `src`) */
  personal: {
    photo: {
      src: '/headshot.png',
      alt: 'Habin Rahman — backend systems engineer',
    },
    photoFallbackInitials: 'HR',
  },

  nav: {
    brand: 'Habin',
    easterEggToast: 'Easter egg found: +50 XP',
    githubAriaLabel: 'GitHub',
    linkedinAriaLabel: 'LinkedIn',
    links: [
      { label: 'What I do', path: '/', hash: 'what-i-do' },
      { label: 'Projects', path: '/', hash: 'projects' },
      { label: 'Telemetry', path: '/', hash: 'telemetry' },
      { label: 'Engineering', path: '/', hash: 'engineering' },
      { label: 'Certs', path: '/', hash: 'certs' },
      { label: 'Approach', path: '/', hash: 'from-problem-to-system' },
      { label: 'Work with me', path: '/', hash: 'work-with-me' },
      { label: 'Contact', path: '/', hash: 'contact' },
      { label: 'More', path: '/', hash: 'explore' },
    ] as const,
  },

  certificationsPage: {
    backToHomeLabel: '← Back to home',
  },

  profile: {
    name: 'Habin Rahman',
    title: 'Backend Systems & Cloud Automation Engineer',
    headline: 'I build systems that run.',
    contact: {
      email: 'habin936@gmail.com',
      github: 'https://github.com/habinrahman',
      linkedin: 'https://www.linkedin.com/in/habinrahman/',
    },
    githubUsername: 'habinrahman',
    freelance: {
      startingFromUsd: 1_500,
    },
  },

  hero: {
    /** Scan-friendly: headline + one supporting line + kicker (no duplicate taglines) */
    lines: {
      h1: 'I build systems that run.',
      subhead: 'Backends, automation, and cloud operations — built to stay up.',
      kicker: '',
    },
    consoleHintLine: '> Explore the system → Ctrl + K',
    commandBarLabel: 'Open system controls (Ctrl + K)',
    ctaSeeWork: 'See the work',
    ctaWorkWithMe: 'Work with me',
    ctaGithub: 'View GitHub',
  },

  authority: {
    title: 'Production systems',
    items: [
      'Certificate verification — used by real users',
      'Email automation — live pipelines & tracking',
      'Intrusion detection — real-time alerts',
    ],
  },

  whatIDo: {
    heading: 'What I do',
    body: ['Backend systems that handle real workloads — not demos.'],
    liveTelemetryLabel: 'Live telemetry',
    activeReposLine: 'Active GitHub projects',
    footerLineBeforeGithub: 'Backend, automation, AI —',
    exploreLinkText: 'more in progress & unlocks',
    githubLinkText: 'GitHub',
  },

  techStack: {
    primarySectionLabel: 'Primary',
    secondarySectionLabel: 'Secondary',
    primary: [
      { id: 'fastapi', label: 'FastAPI' },
      { id: 'supabase', label: 'Supabase' },
      { id: 'postgres', label: 'PostgreSQL' },
      { id: 'docker', label: 'Docker' },
      { id: 'aws', label: 'AWS' },
    ] as const satisfies readonly TechStackEntry[],
    secondary: [
      { id: 'mysql', label: 'MySQL' },
      { id: 'react', label: 'React' },
      { id: 'java', label: 'Java' },
      { id: 'spring', label: 'Spring Boot' },
    ] as const satisfies readonly TechStackEntry[],
  },

  engineeringStack: {
    heading: 'Engineering stack & systems',
    subheading: 'Design, deploy, operate — tools support the work.',
    groups: [
      {
        title: 'Backend',
        items: ['FastAPI services', 'Postgres / Supabase, auth, queues'],
      },
      {
        title: 'Infrastructure',
        items: ['Dockerized services', 'AWS / DO, cron & workers'],
      },
      {
        title: 'Systems Thinking',
        items: ['Retries, idempotency, failure modes', 'Logging, metrics, pipelines'],
      },
    ],
  },

  projectsSection: {
    eyebrow: '',
    featuredHeading: 'Featured Systems',
    featuredSubtitle:
      'Production-grade platforms and automation systems engineered for real-world impact.',
    moreHeading: 'More Systems & Experiments',
    moreSubtitle: 'Additional builds, experiments, and supporting work.',
    viewAllSystemsLabel: 'View All Systems →',
    supporting: '',
    featuredEyebrow: 'Featured case study',
    featuredAside: 'Repo and live link above — full write-up unlocks in Progress.',
    featuredProjectId: 'mycareer-ai',
    unlockHintToast: 'Unlock via Progress & unlocks (level + XP). Opening it.',
  },

  liveTelemetry: {
    title: 'Live system telemetry',
    subtitle: 'Deploy-style logs and health — representative, not a tenant.',
    /** Shown above the terminal grid — sets intent before the animated logs */
    logsIntro: 'Live system telemetry — representative of real service workloads.',
    disclaimer: 'Sample output; typical ops monitoring view.',
    terminalTitle: 'Terminal',
    serverTitle: 'Server output',
    statusTitle: 'System status',
    terminalBody: `$ git push origin main
Enumerating objects: 42, done.
Delta compression using up to 8 threads
To github.com:org/api-service.git
   a1b2c3d..e4f5g6h  main -> main

$ docker compose -f docker-compose.prod.yml build api
[+] Building 24.3s (14/14) FINISHED
 => exporting to image                                    2.1s
 => naming to docker.io/org/api:1.4.2                     0.0s
$ `,
    statusRows: [
      { label: 'api', status: 'healthy', detail: 'p95 42ms' },
      { label: 'worker', status: 'healthy', detail: 'queue depth 1' },
      { label: 'scheduler', status: 'healthy', detail: 'last tick 12s ago' },
      { label: 'postgres', status: 'healthy', detail: 'replication lag 0' },
    ],
    /** Timestamps are computed as now − offset (reads like recent log tail) */
    runtimeLogEntries: [
      { offsetMs: 17_000, message: 'INFO  worker-2 job=digest_emails status=started' },
      { offsetMs: 12_000, message: 'INFO  http  GET /healthz 200 3ms' },
      { offsetMs: 9000, message: 'INFO  db      pool=primary active=6 idle=4' },
      { offsetMs: 4000, message: 'WARN  queue   depth=2 lag_ms=840 threshold=1000' },
      { offsetMs: 0, message: 'INFO  worker-2 job=digest_emails status=completed duration=17.2s' },
    ] as const,
    /** Appended every tick with current time — reads like a live scrape line */
    liveTailMessage: 'INFO  metrics  scrape_interval=15s  targets=4  up=4',
  },

  /** Section copy + proof blocks (credentials list is `certifications` below) */
  certificationSection: {
    sectionTitle: 'Certifications & Expertise',
    sectionSubtitle: 'Cloud, security, delivery — tied to shipped systems.',
    viewAllOnPageLabel: 'Open full page',
    viewAllOnPagePath: '/certifications',
    /** Homepage preview: CTA below the grid */
    previewViewAllLabel: 'View all certifications →',
    appliedInSystems: ['Outreach automation', 'Certificate verification', 'Intrusion detection'],
    verificationProof: certificateLiveVerificationProof,
    footerTagline: 'Credential-backed — applied work, not coursework only.',
    appliedHeading: 'Applied in',
    modalTitle: 'Certifications',
  },

  /**
   * All credentialed items with image paths (order = priority; first 3 show on homepage preview).
   * Add assets under `public/` (e.g. `public/images/certs/aws.png` → `/images/certs/aws.png`).
   */
  certifications: [
    {
      id: 'aws-solutions-architect',
      title: 'AWS Solutions Architect - Amazon Web Services ',
      org: 'MicroDegree',
      image: '/credentials/aws.jpeg',
      category: 'Cloud',
    },
    {
      id: 'ea-software-simulation',
      title: 'Software Engineering Job Simulation',
      org: 'Electronic Arts',
      image: '/credentials/ea.jpeg',
      category: 'Cloud',
    },
    {
      id: 'critical-infrastructure',
      title: 'Critical Infrastructure Protection',
      org: 'OPSWAT',
      image: '/credentials/pro.png',
      category: 'Security',
    },
    {
      id: 'azure-solutions-architect-expert',
      title: 'Azure Solutions Architect Expert - Microsoft',
      org: 'Microdegree',
      image: '/credentials/azure.jpeg',
      category: 'Cloud',
    },
    
    {
      id: 'genai-live',
      title: 'GenAI Live Certification',
      org: 'MicroDegree',
      image: '/credentials/genai.jpeg',
      category: 'AI',
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      org: 'MicroDegree',
      image: '/credentials/devops.jpeg',
      category: 'Cloud',
    },
    
    {
      id: 'coursera-flutter-dart',
      title: 'Getting Started With Flutter & Dart',
      org: 'Coursera',
      image: '/credentials/fd.jpeg',
      category: 'Cloud',
    },
    {
      id: 'cybersecurity-mastercard',
      title: 'Cybersecurity',
      org: 'Mastercard',
      image: '/credentials/cyb.jpeg',
      category: 'Security',
    },
    
  ] as const satisfies readonly CertificationItem[],

  stats: {
    projectsBuiltLabel: 'Systems built',
    /** When set, first telemetry card counts up to this floor (e.g. public ships beyond listed repos). */
    projectsBuiltHeroCap: 20,
    systemsDeployedLabel: 'Systems deployed',
    automationsTitle: 'Automations',
    automationsBody: 'Automations running on a schedule — hands off.',
  },

  problemToSystem: {
    heading: 'From problem to system',
    transforms: [
      { from: 'Manual process', to: 'Automated system' },
      { from: 'Unreliable scripts', to: 'Hardened backend' },
      { from: 'Local-only code', to: 'Deployed cloud system' },
    ],
  },

  workWithMe: {
    heading: 'For teams that need systems that stay up.',
    bullets: ['Real load, not demo data', 'Automation instead of manual loops', 'Always-on operations'],
    ctaLead: "If you're building something real — let's talk.\nSystems should run.",
    ctaBold: '',
    button: 'Get in touch',
  },

  contact: {
    heading: 'Contact',
    body: 'Email is fastest — what you’re shipping and what must stay up.',
    emailButton: 'Email me',
    githubButton: 'GitHub',
    linkedinButton: 'LinkedIn',
    mailtoSubject: 'Building something real',
  },

  closing: {
    lines: ["I don't build for portfolios.", 'I build systems that run.'],
  },

  explore: {
    eyebrow: 'Extra',
    title: 'Progress & unlocks',
    description: 'XP and deeper case studies — opt-in.',
    /**
     * XP / case-study unlock graph: `id` values must match `PROJECTS[].id` in `portfolio.projects.build.ts`.
     * Node labels use each project’s `displayTitle` in the UI (not slugs).
     */
    unlockGraph: {
      nodes: [
        { id: 'mycareer-ai', x: 50, y: 10 },
        { id: 'certificate-system', x: 22, y: 34 },
        { id: 'automated-email-job', x: 78, y: 34 },
        { id: 'competition-tracker', x: 50, y: 56 },
        { id: 'ai-job-application-tracker', x: 28, y: 76 },
        { id: 'finguard', x: 72, y: 76 },
      ],
      edges: [
        ['mycareer-ai', 'certificate-system'],
        ['mycareer-ai', 'automated-email-job'],
        ['certificate-system', 'automated-email-job'],
        ['certificate-system', 'competition-tracker'],
        ['automated-email-job', 'finguard'],
        ['competition-tracker', 'ai-job-application-tracker'],
        ['finguard', 'ai-job-application-tracker'],
        ['automated-email-job', 'competition-tracker'],
        ['certificate-system', 'ai-job-application-tracker'],
        ['mycareer-ai', 'competition-tracker'],
      ],
    },
  },

  footer: {
    line: 'Habin Rahman · Backend & cloud automation · systems that stay up',
  },

  /** Command palette “why hire” full-screen pitch */
  hirePitch: {
    primary: 'I build systems that run.',
    secondary: 'Not demos.',
    dismissHint: 'tap anywhere · esc',
  },

  commandPalette: {
    ariaLabel: 'Command palette',
    inputAriaLabel: 'Filter commands',
    inputPlaceholder: 'type command…',
    emptyState: '∅ no matches',
    shortcutDesktop: '⌘K',
    shortcutMobile: '/',
    escKeyHint: 'esc',
    footerHint:
      '↑↓ nav · home end jump · ↵ run · esc close',
  },

  /** Deprecated: repo cards — project listings now come from `PROJECTS` in `portfolio.projects.build.ts`. */
  moreExperiments: EMPTY_EXPERIMENT_REPOS,
} as const


/** @deprecated Use `portfolioConfig.profile` — kept for gradual migration */
export const PROFILE = portfolioConfig.profile

export type { PortfolioProjectConfig } from './portfolio.projects.build'
export {
  PORTFOLIO_PROJECT_BUILDS,
  PROJECTS,
  PROJECT_BY_ID,
  certificateLiveVerificationProof,
} from './portfolio.projects.build'

export const MORE_EXPERIMENT_REPOS = portfolioConfig.moreExperiments
export const SURFACED_GITHUB_REPO_COUNT = portfolioConfig.moreExperiments.length

export function experimentRepoGithubUrl(repo: string): string {
  return `${portfolioConfig.profile.contact.github}/${repo}`
}
