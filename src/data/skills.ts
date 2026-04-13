import type { SkillCategory } from './types'

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    description: 'Stays correct under load, failure, and retries.',
    skills: [
      { id: 'ts-backend', name: 'TypeScript backend architecture', level: 92 },
      { id: 'async', name: 'Async job systems & queues', level: 88 },
      { id: 'data', name: 'PostgreSQL modeling & migrations', level: 84 },
      { id: 'reliability', name: 'Idempotency, retries, and DLQs', level: 90 },
      { id: 'observability', name: 'Tracing-first observability', level: 86 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Premium UI engineering with performance and motion.',
    skills: [
      { id: 'react', name: 'React + state design', level: 86 },
      { id: 'perf', name: 'Performance-aware interactions', level: 80 },
      { id: 'ui', name: 'Design systems & reusable components', level: 82 },
      { id: 'animation', name: 'Framer Motion micro-interactions', level: 84 },
      { id: 'a11y', name: 'Accessibility & keyboard UX', level: 78 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'SLOs, canaries, automation — ship with confidence.',
    skills: [
      { id: 'k8s', name: 'Kubernetes-aware services', level: 74 },
      { id: 'ci', name: 'CI pipelines & release guardrails', level: 79 },
      { id: 'docker', name: 'Docker + container workflows', level: 76 },
      { id: 'alerts', name: 'SLO burn-rate alerting', level: 82 },
      { id: 'automation', name: 'Automation for safe rollouts', level: 85 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Stack I use to ship and debug hard problems.',
    skills: [
      { id: 'otel', name: 'OpenTelemetry instrumentation', level: 90 },
      { id: 'grafana', name: 'Grafana + PromQL dashboards', level: 80 },
      { id: 'redis', name: 'Redis (streams, caching, queues)', level: 86 },
      { id: 'git', name: 'Git workflows & PR quality', level: 82 },
      { id: 'testing', name: 'Deterministic tests & fixtures', level: 78 },
    ],
  },
]

