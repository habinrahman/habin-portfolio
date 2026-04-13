import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../../data/types'
import Button from '../ui/Button'
import { usePortfolioProgress } from '../../state/usePortfolioProgress'
import HighlightText from '../ui/HighlightText'
import MiniArchitectureDiagram from './MiniArchitectureDiagram'
import ProjectSystemSignals from './ProjectSystemSignals'
import VerificationProofSection from './VerificationProofSection'

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const { lastUnlockedProjectId, level } = usePortfolioProgress()
  const keywords = ['idempotency', 'retries', 'SLO', 'OpenTelemetry', 'trace', 'queue', 'deterministic']

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/50 p-3 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:p-9"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{project.category}</div>
                <h3 className="mt-1 text-2xl font-semibold text-slate-950">{project.title}</h3>
                <ProjectSystemSignals project={project} className="mt-2.5" />
                <p className="mt-3 text-slate-600">{project.tagline}</p>
                <div className="mt-3 flex flex-col gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1 font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                      >
                        GitHub ↗
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1 font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                      >
                        {(project.demoLabel ?? 'Demo') + ' ↗'}
                      </a>
                    ) : null}
                  </div>
                  {project.demoReferenceNote && project.demo ? (
                    <p className="text-[11px] font-medium leading-snug text-slate-500">{project.demoReferenceNote}</p>
                  ) : null}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                initial={false}
                animate={
                  lastUnlockedProjectId === project.id
                    ? { backgroundColor: 'rgba(244, 244, 245, 0.95)', borderColor: 'rgba(15, 23, 42, 0.12)' }
                    : undefined
                }
                transition={{ duration: 0.35 }}
              >
                <span className="text-emerald-700">✓</span>
                Unlocked (L{level})
              </motion.span>
            </div>

            <div className="mt-6 grid gap-5">
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Problem</h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  <HighlightText text={project.problem} keywords={keywords} />
                </p>
              </section>
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Solution</h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  <HighlightText text={project.solution} keywords={keywords} />
                </p>
              </section>
              {project.productionNotes ? (
                <section className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
                  <h4 className="text-sm font-semibold text-slate-900">Real-world verification</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{project.productionNotes.context}</p>
                  {project.productionNotes.positioning ? (
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800">
                      {project.productionNotes.positioning}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800">
                    {project.productionNotes.comparison}
                  </p>
                  {project.productionNotes.kicker ? (
                    <p className="mt-2 text-xs text-slate-600">{project.productionNotes.kicker}</p>
                  ) : null}
                </section>
              ) : null}
              {project.verificationProof ? (
                <VerificationProofSection proof={project.verificationProof} />
              ) : null}
              <MiniArchitectureDiagram project={project} />
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Architecture overview</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {project.architectureOverview.map((item) => (
                    <li key={item}>
                      - <HighlightText text={item} keywords={keywords} />
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Engineering decisions</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {project.engineeringDecisions.map((item) => (
                    <li key={item}>
                      - <HighlightText text={item} keywords={keywords} />
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Trade-offs</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {project.tradeoffs.map((item) => (
                    <li key={item}>
                      - <HighlightText text={item} keywords={keywords} />
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Tech stack</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.techStack.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Key features</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="text-sm font-semibold text-slate-900">Impact</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {project.impact.map((entry) => (
                    <li key={entry.metric}>
                      <span className="font-semibold text-slate-900">{entry.metric}:</span> {entry.description}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
