import type { ExperienceItem } from './types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'intern-backend-automation',
    title: 'Software Engineer (Backend Systems)',
    org: 'MicroDegree',
    timeframe: '2025 — Present',
    summary:
      'Built reliability-focused backend components for data movement, async job execution, and observability. Designed systems around idempotency, traceable retries, and automation ready for real load.',
    achievements: [
      'Implemented idempotent event processing with deterministic replay for incident recovery.',
      'Introduced trace propagation from API requests into async workers and scheduled jobs.',
      'Built deploy-aware dashboards to connect regressions to rollout context.',
      'Partnered with on-call to reduce alert noise by anchoring alerts to error budgets.',
    ],
  },
  {
    id: 'automation-projects',
    title: 'Automation Projects (Independent)',
    org: 'Developer Lab',
    timeframe: 'Ongoing',
    summary:
      'Developing a library of workflow automation patterns: resumable tasks, versioned definitions, and operational telemetry built into the workflow core.',
    achievements: [
      'Workflow runs produce audit-friendly summaries with step-level tracing.',
      'Created deterministic integration tests for automation workflows with controlled time.',
      'Containerized dev workflows to match deployed constraints early.',
    ],
  },
]

