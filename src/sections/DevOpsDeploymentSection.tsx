import { motion } from 'framer-motion'
import { sectionStaggerChildGentle, sectionStaggerParent } from '../motion/micro'
import { cn } from '../utils/cn'

const PIPELINE = [
  {
    key: 'code',
    title: 'Code',
    desc: 'Services, APIs, scripts — version controlled.',
  },
  {
    key: 'build',
    title: 'Build',
    desc: 'Docker images. Repeatable artifacts.',
  },
  {
    key: 'deploy',
    title: 'Deploy',
    desc: 'Roll to cloud and VPS.',
  },
  {
    key: 'monitor',
    title: 'Monitor',
    desc: 'Logs, metrics, health checks — live.',
  },
  {
    key: 'improve',
    title: 'Improve',
    desc: 'Ship again from signals and incidents.',
  },
] as const

const DEPLOYMENT_EXPERIENCE = [
  'Docker-based environments',
  'DigitalOcean droplet deployments',
  'AWS-based cloud concepts',
  'Cron jobs and automation systems',
  'Background services and schedulers',
] as const

/** Representative deploy posture — believable SLOs, not live telemetry from this site. */
const PRODUCTION_STATUS_BADGES = [
  { label: 'Deployment Status', value: 'Active', dot: true as const },
  { label: 'Environment', value: 'Live', dot: false as const },
  { label: 'Uptime', value: '99.9%', dot: false as const },
] as const

function ProductionStatusStrip() {
  return (
    <div
      className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-2 md:mt-8 md:gap-2.5"
      role="status"
      aria-label="Deployment-style status indicators"
    >
      {PRODUCTION_STATUS_BADGES.map((item) => (
        <div
          key={item.label}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200/90 bg-white px-3 py-1.5 shadow-sm"
        >
          {item.dot ? (
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
            </span>
          ) : null}
          <span className="text-[11px] text-slate-600">
            <span className="font-medium">{item.label}:</span>{' '}
            <span className="font-semibold tabular-nums text-slate-900">{item.value}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

const TERMINAL_SAMPLE = `$ git push origin main
Enumerating objects: 42, done.
Delta compression using up to 8 threads
To github.com:org/api-service.git
   a1b2c3d..e4f5g6h  main -> main

$ docker compose -f docker-compose.prod.yml build api
[+] Building 24.3s (14/14) FINISHED
 => exporting to image                                    2.1s
 => naming to docker.io/org/api:1.4.2                     0.0s`

const SERVER_LOG_SAMPLE = `[2026-03-29T14:22:01Z] INFO  worker-2 job=digest_emails status=started
[2026-03-29T14:22:03Z] INFO  http  GET /healthz 200 3ms
[2026-03-29T14:22:08Z] INFO  db      pool=primary active=6 idle=4
[2026-03-29T14:22:15Z] WARN  queue   depth=2 lag_ms=840 threshold=1000
[2026-03-29T14:22:18Z] INFO  worker-2 job=digest_emails status=completed duration=17.2s`

function ArrowDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center text-slate-300 md:flex-col md:py-0',
        className,
      )}
      aria-hidden
    >
      <svg className="h-5 w-5 md:h-4 md:w-4 md:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </div>
  )
}

function LogCard({
  title,
  children,
  glowClass = '',
}: {
  title: string
  children: string
  glowClass?: string
}) {
  return (
    <motion.article
      className={cn(
        'flex h-full flex-col overflow-x-hidden rounded-2xl border border-slate-200/95 bg-white shadow-card',
      )}
      whileHover={{ y: -2, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <div className={cn('border-b border-slate-200/90 bg-slate-100 px-4 py-2.5', glowClass)}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</p>
      </div>
      <pre
        className={cn(
          'm-0 flex-1 overflow-x-auto bg-white p-4 font-mono text-[11px] leading-relaxed text-slate-600 md:text-xs',
          'shadow-[inset_0_1px_0_rgba(15,23,42,0.06)]',
        )}
      >
        <code className="block whitespace-pre text-left">{children}</code>
      </pre>
    </motion.article>
  )
}

function StatusCard() {
  const rows = [
    { label: 'api', status: 'healthy', detail: 'p95 42ms' },
    { label: 'worker', status: 'healthy', detail: 'queue depth 1' },
    { label: 'scheduler', status: 'healthy', detail: 'last tick 12s ago' },
    { label: 'postgres', status: 'healthy', detail: 'replication lag 0' },
  ] as const
  return (
    <motion.article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_12px_36px_rgba(15,23,42,0.06)]',
        'ring-1 ring-emerald-500/10',
      )}
      whileHover={{ y: -2, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <div className="border-b border-slate-200/90 bg-slate-100 px-4 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">System status</p>
      </div>
      <ul className="flex flex-1 flex-col gap-3 p-4 font-mono text-[11px] md:text-xs">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
            <span className="font-semibold text-slate-700">{r.label}</span>
            <span className="flex items-center gap-2 text-slate-500">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
              <span className="text-emerald-700">{r.status}</span>
              <span className="hidden text-slate-400 sm:inline">{r.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function DevOpsDeploymentSection({ bundle = false }: { bundle?: boolean }) {
  const Tag = bundle ? 'div' : 'section'
  const shellProps = bundle
    ? {
        id: 'devops-deployment' as const,
        className: 'relative scroll-mt-4 px-0 pt-4 pb-0 md:pt-6',
      }
    : {
        id: 'devops-deployment' as const,
        'aria-labelledby': 'devops-deployment-heading' as const,
        className:
          'relative scroll-mt-4 border-t border-slate-200/90 bg-zinc-50 px-4 pt-16 pb-16 md:px-8 md:pt-20 md:pb-20',
      }

  return (
    <Tag {...shellProps}>
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          variants={sectionStaggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.07, margin: '0px 0px -36px 0px' }}
          className="flex flex-col"
        >
          <motion.div variants={sectionStaggerChildGentle} className="text-center">
            <h2 id="devops-deployment-heading" className={bundle ? 'heading-support' : 'heading-page'}>
              DevOps &amp; Deployment
            </h2>
            <p
              className={cn(
                'mx-auto max-w-2xl leading-[1.72] text-slate-600',
                bundle ? 'mt-3 text-sm md:text-base' : 'mt-5 text-lead',
              )}
            >
              From commit to live: build, deploy, maintain.
            </p>
            <p
              className={cn(
                'mx-auto max-w-2xl leading-[1.68] text-slate-700',
                bundle
                  ? 'mt-3 text-sm md:mt-4 md:text-[15px] md:leading-[1.65]'
                  : 'mt-6 text-base md:text-[17px] md:leading-[1.7]',
              )}
            >
              Reliable deploys. Heavy automation. Observable systems.
            </p>
            <ProductionStatusStrip />
            <p className="mx-auto mt-3 max-w-md text-center text-[10px] leading-relaxed text-slate-500">
              Example posture — not live telemetry from this page.
            </p>
          </motion.div>

          {/* Pipeline */}
          <motion.div variants={sectionStaggerChildGentle} className="mt-12 md:mt-14">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Delivery pipeline</p>
            <div className="mt-6 flex flex-col gap-1 md:grid md:grid-cols-5 md:gap-3">
              {PIPELINE.map((step, i) => (
                <div key={step.key} className="flex flex-col">
                  {i > 0 ? (
                    <div className="flex justify-center py-2 md:hidden">
                      <ArrowDivider />
                    </div>
                  ) : null}
                  <motion.div
                    className={cn(
                      'flex min-h-[7.5rem] flex-col justify-center rounded-2xl border border-slate-200/90 bg-white p-4 text-center shadow-sm',
                      'ring-1 ring-slate-100/80 md:min-h-[8.5rem] md:px-2 md:py-4',
                    )}
                    whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(15, 23, 42, 0.08)' }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-900">{step.title}</span>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            variants={sectionStaggerChildGentle}
            className="mt-12 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_40px_rgba(15,23,42,0.06)] md:mt-14 md:p-8"
          >
            <h3 className="text-lg font-semibold text-slate-900">Deployment experience</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {DEPLOYMENT_EXPERIENCE.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600"
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Deployment evidence */}
          <motion.div variants={sectionStaggerChildGentle} className="mt-12 md:mt-14">
            <h3 className="text-center text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              Deployment evidence
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-slate-500">
              Sample build / runtime / health output — typical CI/CD workflow.
            </p>
            <motion.div
              className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6"
              variants={sectionStaggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={sectionStaggerChildGentle} className="min-w-0">
                <LogCard title="Terminal">
                  {TERMINAL_SAMPLE}
                </LogCard>
              </motion.div>
              <motion.div variants={sectionStaggerChildGentle} className="min-w-0">
                <LogCard title="Server output">
                  {SERVER_LOG_SAMPLE}
                </LogCard>
              </motion.div>
              <motion.div variants={sectionStaggerChildGentle} className="min-w-0">
                <StatusCard />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Tag>
  )
}
