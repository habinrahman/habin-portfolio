export type BuiltSystemItem = {
  id: string
  name: string
  /** Single line — what it does */
  description: string
  tech: readonly string[]
}

/** Smaller builds & experiments — breadth beyond featured portfolio case studies */
export const SYSTEMS_BUILT: readonly BuiltSystemItem[] = [
  {
    id: 'job-email-agent',
    name: 'Job Application Email Agent',
    description: 'Automated email sending, reply tracking, and status classification',
    tech: ['Python', 'SMTP', 'SQLite'],
  },
  {
    id: 'competitor-research',
    name: 'Competitor Research Automation',
    description: 'Scrapes and tracks competitor signals, outputs structured insights',
    tech: ['Python', 'scraping', 'JSON/Markdown'],
  },
  {
    id: 'certificate-fastapi',
    name: 'Certificate Backend (FastAPI version)',
    description: 'Lightweight API for certificate verification and validation',
    tech: ['FastAPI', 'Supabase'],
  },
  {
    id: 'image-pipeline',
    name: 'Image Processing Pipeline',
    description: 'Face detection + alerting system with OpenCV',
    tech: ['Python', 'OpenCV'],
  },
  {
    id: 'outreach-scheduler',
    name: 'Outreach Campaign Scheduler',
    description: 'Cron-based system for timed email campaigns',
    tech: ['Python', 'cron jobs'],
  },
]
