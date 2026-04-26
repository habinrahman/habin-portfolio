import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Card from '../components/ui/Card'
import { scrollToId } from '../utils/scrollToId'
import { usePortfolioProgress } from '../state/usePortfolioProgress'
import { usePortfolioStore } from '../state/usePortfolioStore'
import { projectDisplayTitle } from '../components/projects/projectCardHighlights'

type Props = {
  /** When true, omits outer section heading (used inside &lt;details&gt;). */
  embedded?: boolean
}

function openProjectOnHomePage(projectId: string) {
  scrollToId('projects')
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('portfolio:focus-project', { detail: { projectId } }))
  }, 160)
}

export default function ExploreWorkSection({ embedded = false }: Props) {
  const { portfolio, projects: PROJECTS } = usePortfolioStore()
  const { unlockProject, isProjectUnlocked, level, totalXp, levelProgress } = usePortfolioProgress()
  const [toast, setToast] = useState<string | null>(null)

  const unlockGraph = portfolio.explore.unlockGraph

  const nodeLayout = useMemo(() => {
    const byId = new Map(PROJECTS.map((p) => [p.id, p]))
    return unlockGraph.nodes.filter((n) => byId.has(n.id))
  }, [PROJECTS, unlockGraph.nodes])

  const lines = useMemo(() => [...unlockGraph.edges] as Array<[string, string]>, [unlockGraph.edges])

  const getNode = (id: string) => nodeLayout.find((n) => n.id === id)

  const inner = (
    <Card className={embedded ? 'p-5 md:p-6 mt-4' : 'mt-8 p-6 md:p-8'}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">Level {level}</div>
        <div className="text-sm font-medium text-slate-600 tabular-nums">{totalXp} XP</div>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-x-hidden">
        <motion.div
          className="h-full bg-violet-700"
          animate={{ width: `${Math.round(levelProgress * 100)}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        />
      </div>
      <p className="mt-3 text-xs text-slate-500 leading-relaxed">
        Scroll — earn XP. Hit a project&apos;s level — tap the node — unlock the full case study.
      </p>

      <div className="relative mt-6 overflow-x-hidden rounded-2xl border border-slate-200/95 bg-slate-50">

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {lines.map(([a, b], idx) => {
            const na = getNode(a)
            const nb = getNode(b)
            if (!na || !nb) return null
            return (
              <motion.line
                key={`${a}-${b}-${idx}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="rgba(15, 23, 42, 0.1)"
                strokeWidth="0.65"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 + idx * 0.04 }}
              />
            )
          })}
        </svg>

        <div className="relative min-h-[380px] px-3 py-6">
          {nodeLayout.map((node, idx) => {
            const project = PROJECTS.find((p) => p.id === node.id)
            if (!project) return null
            const unlocked = isProjectUnlocked(project.id)
            const canUnlock = level >= project.levelRequired
            const title = unlocked ? 'Open project' : canUnlock ? 'Unlock project' : `Requires Level ${project.levelRequired}`

            return (
              <motion.button
                key={node.id}
                type="button"
                aria-label={title}
                whileHover={unlocked ? { y: -2, scale: 1.02 } : { scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (unlocked) {
                    openProjectOnHomePage(project.id)
                    return
                  }

                  const res = unlockProject(project.id)
                  if (!res.unlockedNow) {
                    setToast(res.reason ?? 'Not unlocked yet.')
                    window.setTimeout(() => setToast(null), 1600)
                    return
                  }

                  setToast('Unlocked! Opening project…')
                  window.setTimeout(() => setToast(null), 1200)
                  window.setTimeout(() => openProjectOnHomePage(project.id), 450)
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 28, delay: idx * 0.05 }}
                className="absolute max-w-[min(42vw,200px)] rounded-xl border border-slate-200/95 bg-white px-3 py-3 text-left shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-700/30"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={
                  unlocked
                    ? { borderColor: 'rgba(15, 23, 42, 0.2)', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)' }
                    : canUnlock
                      ? { borderColor: 'rgba(15, 23, 42, 0.28)' }
                      : undefined
                }
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium text-slate-500 truncate">{project.category}</div>
                    <div className="mt-0.5 text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                      {projectDisplayTitle(project)}
                    </div>
                  </div>
                  <div className="shrink-0 text-[10px] font-semibold text-slate-700">{unlocked ? '✓' : `L${project.levelRequired}`}</div>
                </div>
                {!unlocked ? (
                  <div className="mt-2 text-[10px] text-slate-600 leading-snug">
                    {canUnlock ? 'Tap to unlock case study.' : `Reach level ${project.levelRequired} + XP.`}
                  </div>
                ) : (
                  <div className="mt-2 text-[10px] font-medium text-slate-700">Tap to open.</div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {toast ? (
        <div className="mt-4 text-sm text-slate-800 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5">{toast}</div>
      ) : null}
    </Card>
  )

  if (embedded) {
    return <div className="w-full">{inner}</div>
  }

  return (
    <section className="pt-12 md:pt-16">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Progress &amp; unlocks</h2>
      <p className="mt-2 text-sm text-slate-600 max-w-2xl">
        XP and levels. Unlock architecture, decisions, impact.
      </p>
      {inner}
    </section>
  )
}
