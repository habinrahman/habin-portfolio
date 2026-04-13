import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePortfolioProgress } from '../../state/usePortfolioProgress'
import { useLiveMetrics } from '../../hooks/useLiveMetrics'

function formatDeploy(ts: number) {
  const d = new Date(ts)
  return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const LAST_DEPLOY_TS = new Date('2026-03-26T18:20:00Z').getTime()

export default function HeroSystemPanel() {
  const { unlockedProjectIds, bestScrollProgress } = usePortfolioProgress()
  const live = useLiveMetrics()

  const activeServices = useMemo(() => {
    const base = 7
    const maturity = Math.round(bestScrollProgress * 4)
    const wobble = Math.round(Math.sin(live.tick / 5) * 2)
    return base + unlockedProjectIds.length + maturity + wobble
  }, [bestScrollProgress, unlockedProjectIds.length, live.tick])

  const lastDeployTs = useMemo(() => LAST_DEPLOY_TS, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="w-full max-w-md mx-auto mt-12 rounded-2xl border border-slate-200/90 bg-white shadow-card p-5"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-slate-500">System panel</div>
        <motion.span
          className="text-[11px] rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700"
          animate={{ boxShadow: ['0 0 0 0 rgba(16,185,129,0)', '0 0 0 6px rgba(16,185,129,0.06)', '0 0 0 0 rgba(16,185,129,0)'] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          Operational
        </motion.span>
      </div>

      <div className="mt-3 grid gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Active services</span>
          <motion.span
            key={activeServices}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="text-slate-900 font-semibold tabular-nums"
          >
            {activeServices}
          </motion.span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Latency (p95)</span>
          <motion.span
            key={live.latencyP95Ms}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="text-slate-800 tabular-nums"
          >
            {live.latencyP95Ms}ms
          </motion.span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Queue depth</span>
          <motion.span
            key={live.queueDepth}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="text-slate-800 tabular-nums"
          >
            {live.queueDepth}
          </motion.span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Last deploy</span>
          <motion.span
            initial={{ opacity: 0.85 }}
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="text-slate-800 tabular-nums text-[13px]"
          >
            {formatDeploy(lastDeployTs)}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
