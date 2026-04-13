import { motion } from 'framer-motion'
import type { Project } from '../../data/types'
import { usePortfolioProgress } from '../../state/usePortfolioProgress'
import Button from '../ui/Button'
import { projectDisplayTitle } from './projectCardHighlights'

type Props = {
  project: Project
  onRequestUnlock: (project: Project) => void
}

export default function CompactProjectCard({ project, onRequestUnlock }: Props) {
  const { isProjectUnlocked } = usePortfolioProgress()
  const unlocked = isProjectUnlocked(project.id)
  const title = projectDisplayTitle(project)
  const tech = project.techStack.join(' · ')
  const hasGithub = Boolean(project.github?.trim())
  const unlockTitle = 'Unlock in Progress & unlocks'

  return (
    <motion.article
      className="flex h-full flex-col rounded-xl border border-slate-200/95 bg-white px-4 py-4 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-slate-300 hover:shadow-md md:px-4 md:py-4"
      whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-950 md:text-[17px]">{title}</h3>
      <p className="mt-3 text-[11px] font-medium leading-relaxed text-slate-500 md:text-xs">
        <span className="text-slate-600">Tech:</span> {tech}
      </p>
      <div className="mt-auto pt-3">
        {hasGithub ? (
          unlocked ? (
            <Button href={project.github} target="_blank" rel="noreferrer" variant="primary" size="sm">
              GitHub →
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => onRequestUnlock(project)}
              title={unlockTitle}
            >
              GitHub →
            </Button>
          )
        ) : null}
      </div>
    </motion.article>
  )
}
