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
    title: 'Habin Rahman | Backend & AI Systems Engineer',
    description:
      'Backend & AI Systems Engineer building backend infrastructure, LLM-integrated platforms, and cloud automation — deployed and running in production.',
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
      { label: 'Verified', path: '/', hash: 'verified' },
      { label: 'Projects', path: '/', hash: 'projects' },
      { label: 'Engineering', path: '/', hash: 'engineering' },
      { label: 'Certs', path: '/', hash: 'certs' },
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
    title: 'Backend & AI Systems Engineer',
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
      subhead:
        'Backend systems, distributed architecture, and applied AI — designed with explicit state, guarded permissions, and swappable AI providers.',
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
    body: ['Backend and AI systems that handle real workloads, not demos.'],
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
      { id: 'typescript', label: 'TypeScript' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'supabase', label: 'Supabase' },
      { id: 'postgres', label: 'PostgreSQL' },
      { id: 'docker', label: 'Docker' },
    ] as const satisfies readonly TechStackEntry[],
    secondary: [
      { id: 'nuxt', label: 'Nuxt' },
      { id: 'vue', label: 'Vue' },
      { id: 'react', label: 'React' },
      { id: 'mysql', label: 'MySQL' },
      { id: 'aws', label: 'AWS' },
      { id: 'spring', label: 'Spring Boot' },
    ] as const satisfies readonly TechStackEntry[],
  },

  engineeringStack: {
    heading: 'Engineering stack',
    subheading: 'What each system is built, deployed, and operated with.',
    groups: [
      {
        title: 'Backend',
        items: ['FastAPI services', 'Postgres / Supabase, auth, queues'],
      },
      {
        title: 'AI Systems',
        items: [
          'LLM orchestration & agentic workflows',
          'OpenAI integrations, RAG, vector search',
          'AI-assisted classification pipelines',
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          'Dockerized services & containers',
          'DigitalOcean & Render deploy targets',
          'CI/CD with GitHub Actions',
          'Cron jobs, queues & background workers',
        ],
      },
      {
        title: 'Systems Thinking',
        items: [
          'Retries, idempotency, failure modes',
          'Logging, metrics, pipelines',
          'Provider-swappable facades & deep modules (single seam behind AI providers, guarded state transitions)',
        ],
      },
    ],
  },

  projectsSection: {
    eyebrow: '',
    featuredHeading: 'Featured Systems',
    featuredSubtitle:
      'Four systems, four distinct engineering capabilities — each proving something the others don\'t.',
    moreHeading: 'More Projects',
    moreSubtitle: 'Additional projects, experiments, and supporting engineering work.',
    moreCollapsedLabel: 'Show More Projects',
    moreExpandedLabel: 'Hide More Projects',
    supporting: '',
    featuredEyebrow: 'Featured case study',
    featuredAside: 'Repo and live link above — full write-up unlocks in Progress.',
    featuredProjectId: 'foundry',
    unlockHintToast: 'Unlock via Progress & unlocks (level + XP). Opening it.',
  },

  /** Standalone proof section — real, verifiable, placed high on the homepage */
  verifiedProof: {
    eyebrow: 'Verified, not claimed',
    heading: 'A credential you can check yourself.',
    proof: certificateLiveVerificationProof,
  },

  /** Section copy + proof blocks (credentials list is `certifications` below) */
  certificationSection: {
    sectionTitle: 'Certifications & Expertise',
    sectionSubtitle: 'Cloud, security, delivery tied to shipped systems.',
    viewAllOnPageLabel: 'Open full page',
    viewAllOnPagePath: '/certifications',
    /** Homepage preview: CTA below the grid */
    previewViewAllLabel: 'View all certifications →',
    appliedInSystems: ['Outreach automation', 'Certificate verification', 'Intrusion detection'],
    verificationProof: certificateLiveVerificationProof,
    footerTagline: 'Credential-backed applied work, not coursework only.',
    appliedHeading: 'Applied in',
    modalTitle: 'Certifications',
  },

  /**
   * All credentialed items with image paths (order = priority; first 3 show on homepage preview).
   * Add assets under `public/` (e.g. `public/images/certs/aws.png` → `/images/certs/aws.png`).
   */
  certifications: [
    {
      id: 'cybersecurity-mastercard',
      title: 'Cybersecurity',
      org: 'Mastercard',
      image: '/credentials/cyb.jpeg',
      category: 'Security',
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
      id: 'aws-solutions-architect',
      title: 'AWS Solutions Architect - Amazon Web Services ',
      org: 'MicroDegree',
      image: '/credentials/aws.jpeg',
      category: 'Cloud',
    },
   
    
  ] as const satisfies readonly CertificationItem[],

  stats: {
    projectsBuiltLabel: 'Systems built',
    /** When set, first telemetry card counts up to this floor (e.g. public ships beyond listed repos). */
    projectsBuiltHeroCap: 20,
    systemsDeployedLabel: 'Systems deployed',
    automationsTitle: 'Automations',
    automationsBody: 'Automations running on a schedule hands off.',
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
    heading: 'For teams shipping AI-integrated systems.',
    bullets: ['Real load, not demo data', 'Automation instead of manual loops', 'Always-on operations'],
    ctaLead: "If you're building something real, let's talk.",
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
    lines: ['Not a demo. Not a tutorial project.', 'Production systems — including the AI ones.'],
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
        { id: 'microdegree-hub', x: 50, y: 10 },
        { id: 'certificate-system', x: 22, y: 34 },
        { id: 'ollive-inference-platform', x: 78, y: 34 },
        { id: 'mycareer-ai', x: 50, y: 56 },
        { id: 'ai-job-application-tracker', x: 28, y: 76 },
        { id: 'automated-email-job', x: 72, y: 76 },
      ],
      edges: [
        ['microdegree-hub', 'certificate-system'],
        ['microdegree-hub', 'ollive-inference-platform'],
        ['certificate-system', 'ollive-inference-platform'],
        ['certificate-system', 'mycareer-ai'],
        ['ollive-inference-platform', 'automated-email-job'],
        ['mycareer-ai', 'ai-job-application-tracker'],
        ['automated-email-job', 'ai-job-application-tracker'],
        ['ollive-inference-platform', 'mycareer-ai'],
        ['certificate-system', 'ai-job-application-tracker'],
        ['microdegree-hub', 'mycareer-ai'],
      ],
    },
  },

  footer: {
    line: 'Habin Rahman · Backend & AI Systems Engineer · backend, automation, applied AI',
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
