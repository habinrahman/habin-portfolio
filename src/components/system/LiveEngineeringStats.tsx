import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePortfolioStore } from '../../state/usePortfolioStore'
import { useLiveMetrics } from '../../hooks/useLiveMetrics'
import { useGithubProjects } from '../../hooks/useGithubProjects'
import { getLiveMetricsSnapshot } from '../../state/liveSystemStore'
import { cn } from '../../utils/cn'
import { hoverLiftSubtle, springSnappy } from '../../motion/micro'

function formatInt(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n))
}

function formatProjectsBuiltHero(n: number, cap: number) {
  const safeCap = Math.max(0, Math.round(cap))
  if (safeCap <= 0) return '0'
  if (n < safeCap) return formatInt(n)
  return `${formatInt(safeCap)}+`
}

export function SystemStatusBadge({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01, boxShadow: '0 4px 16px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.05)' }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 shadow-sm cursor-default',
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_1px_rgba(255,255,255,0.8)]" />
      </span>
      <span className="whitespace-nowrap">
        System status<span className="text-slate-300 mx-1">·</span>
        <span className="text-emerald-700/90">Live</span>
      </span>
    </motion.div>
  )
}

type LiveEngineeringStatsProps = {
  className?: string
  /** Smaller type and tighter padding for secondary placement */
  compact?: boolean
}

/** Minimal monospace strip — uses existing simulated service metrics */
export function LiveSystemPulse({ className }: { className?: string }) {
  const live = useLiveMetrics()
  return (
    <p
      className={cn(
        'text-left text-[11px] text-slate-500 font-mono tabular-nums tracking-tight',
        className,
      )}
    >
      <span className="text-slate-400">signal</span>
      <span className="mx-1.5 text-slate-300">·</span>
      p95 {live.latencyP95Ms}ms
      <span className="mx-1.5 text-slate-300">·</span>
      depth {live.queueDepth}
    </p>
  )
}

export default function LiveEngineeringStats({ className, compact }: LiveEngineeringStatsProps) {
  const { portfolio, projects } = usePortfolioStore()
  const { stats: st } = portfolio
  const live = useLiveMetrics()
  const github = useGithubProjects(portfolio.profile.githubUsername)
  const fallbackProjectsBuilt = projects.length
  const computedProjectsBuiltCap =
    github.status === 'ready' && github.repoCount !== null ? github.repoCount : fallbackProjectsBuilt
  const explicitCap = st.projectsBuiltHeroCap
  const projectsBuiltCap =
    typeof explicitCap === 'number' && explicitCap > 0 ? explicitCap : computedProjectsBuiltCap

  const [displayP, setDisplayP] = useState(0)
  const [displayS, setDisplayS] = useState(0)
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1250
    let raf = 0

    const easeOut = (x: number) => 1 - (1 - x) ** 2.4

    const tickFrame = (now: number) => {
      const raw = Math.min(1, (now - start) / duration)
      const e = easeOut(raw)
      const snap = getLiveMetricsSnapshot()
      setDisplayP(Math.max(0, Math.round(projectsBuiltCap * e)))
      setDisplayS(Math.max(0, Math.round(snap.systemsDeployed * e)))
      if (raw < 1) {
        raf = requestAnimationFrame(tickFrame)
      } else {
        setDisplayP(projectsBuiltCap)
        setDisplayS(snap.systemsDeployed)
        setIntroDone(true)
      }
    }

    raf = requestAnimationFrame(tickFrame)
    return () => cancelAnimationFrame(raf)
  }, [projectsBuiltCap])

  useEffect(() => {
    if (!introDone) return
    setDisplayP(projectsBuiltCap)
    setDisplayS(live.systemsDeployed)
  }, [introDone, live.systemsDeployed, live.tick, projectsBuiltCap])

  const metricCards = [
    {
      label: st.projectsBuiltLabel,
      value: displayP,
      motionKey: `p-${displayP}-${projectsBuiltCap}-${github.status}`,
      format: (n: number) => formatProjectsBuiltHero(n, projectsBuiltCap),
    },
    {
      label: st.systemsDeployedLabel,
      value: displayS,
      motionKey: `s-${live.systemsDeployed}`,
      format: (n: number) => formatInt(n),
    },
  ] as const

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 max-w-2xl sm:max-w-none',
        compact && 'max-w-3xl gap-3 sm:gap-4',
        className,
      )}
    >
      {metricCards.map(({ label, value, motionKey, format }) => (
        <motion.div
          key={label}
          className={cn(
            'rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm cursor-default',
            compact && 'py-3 px-3',
          )}
          whileHover={hoverLiftSubtle}
          transition={springSnappy}
        >
          <div className={cn('text-[11px] font-semibold uppercase tracking-wider text-slate-400', compact && 'text-[10px]')}>
            {label}
          </div>
          <motion.div
            className={cn(
              'mt-1.5 tabular-nums font-bold text-slate-900 tracking-tight',
              compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl',
            )}
            initial={false}
            animate={{ opacity: [0.94, 1] }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            key={motionKey}
          >
            {format(value)}
          </motion.div>
        </motion.div>
      ))}
      <motion.div
        className={cn(
          'rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm cursor-default sm:col-span-1',
          compact && 'py-3 px-3',
        )}
        whileHover={hoverLiftSubtle}
        transition={springSnappy}
      >
        <div className={cn('text-[11px] font-semibold uppercase tracking-wider text-slate-400', compact && 'text-[10px]')}>
          {st.automationsTitle}
        </div>
        <p className="mt-2 text-sm font-semibold leading-snug text-slate-800 md:text-[15px] md:leading-snug">
          {st.automationsBody}
        </p>
      </motion.div>
    </div>
  )
}
