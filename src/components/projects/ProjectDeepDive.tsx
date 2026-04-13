import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { Project } from '../../data/types'
import { buttonHoverSecondary, springSnappy } from '../../motion/micro'
import { cn } from '../../utils/cn'
import VerificationProofSection from './VerificationProofSection'

type Props = {
  project: Project
  className?: string
  /** Slightly smaller type for grid cards */
  compact?: boolean
}

export default function ProjectDeepDive({ project, className, compact }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn(className)}>
      <motion.button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        whileHover={buttonHoverSecondary}
        whileTap={{ scale: 0.985 }}
        transition={springSnappy}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40',
          compact && 'text-xs py-1.5 px-3',
        )}
      >
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="text-slate-400" aria-hidden>
          ▼
        </motion.span>
        {open ? 'Hide details' : 'Engineering details'}
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-x-hidden"
          >
            <div
              className={cn(
                'mt-4 space-y-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 md:p-5 text-left',
                compact && 'p-3.5 space-y-4',
              )}
            >
              {project.productionNotes ? (
                <section
                  className={cn(
                    'rounded-xl border border-slate-200/90 bg-white/90 p-3.5 md:p-4',
                    compact && 'p-3',
                  )}
                >
                  <h4 className={cn('text-xs font-bold uppercase tracking-wider text-slate-600', compact && 'text-[10px]')}>
                    Systems context
                  </h4>
                  <p className={cn('mt-2 text-sm leading-relaxed text-slate-700', compact && 'text-[13px]')}>
                    {project.productionNotes.context}
                  </p>
                  {project.productionNotes.positioning ? (
                    <p className={cn('mt-3 text-sm font-medium leading-relaxed text-slate-800', compact && 'text-[13px]')}>
                      {project.productionNotes.positioning}
                    </p>
                  ) : null}
                  <p className={cn('mt-3 text-sm font-medium leading-relaxed text-slate-800', compact && 'text-[13px]')}>
                    {project.productionNotes.comparison}
                  </p>
                  {project.productionNotes.kicker ? (
                    <p className={cn('mt-2 text-xs text-slate-600', compact && 'text-[11px]')}>
                      {project.productionNotes.kicker}
                    </p>
                  ) : null}
                </section>
              ) : null}

              {project.verificationProof ? (
                <VerificationProofSection proof={project.verificationProof} compact={compact} />
              ) : null}

              <section>
                <h4 className={cn('text-xs font-bold uppercase tracking-wider text-violet-700', compact && 'text-[10px]')}>
                  Architecture overview
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-600 leading-relaxed">
                  {project.architectureOverview.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-slate-400 shrink-0">→</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className={cn('text-xs font-bold uppercase tracking-wider text-violet-700', compact && 'text-[10px]')}>
                  Engineering decisions
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-600 leading-relaxed">
                  {project.engineeringDecisions.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-slate-400 shrink-0">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className={cn('text-xs font-bold uppercase tracking-wider text-violet-700', compact && 'text-[10px]')}>
                  Trade-offs
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-600 leading-relaxed">
                  {project.tradeoffs.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-slate-400 shrink-0">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
