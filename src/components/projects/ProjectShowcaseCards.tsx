import type { Project } from '../../data/types'
import { usePointerGlow } from '../../hooks/usePointerGlow'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import Card from '../ui/Card'
import ProjectSystemSignals, { projectTypeLabel } from './ProjectSystemSignals'
import SafeImage from '../ui/SafeImage'
import { projectCardHighlights, projectDisplayTitle, projectLiveUrl, projectRepoSlug } from './projectCardHighlights'
import { usePortfolioStore } from '../../state/usePortfolioStore'

const cardHoverShell =
  'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300/95'

type CardCallbacks = {
  unlocked: boolean
  onViewProject: (p: Project) => void
}

function CardMetaLine({ project }: { project: Project }) {
  const tech = project.techStack.slice(0, 6).join(' · ')
  const type = projectTypeLabel(project)
  return (
    <p className="text-[11px] leading-relaxed text-slate-500 md:text-xs">
      <span className="text-slate-600">Tech:</span> <span>{tech}</span>
      <span className="whitespace-pre">{' · '}</span>
      <span className="text-slate-600">Type:</span> <span>{type}</span>
    </p>
  )
}

function ProblemSolutionLines({ project }: { project: Project }) {
  const p = project.problem.trim()
  const s = project.solution.trim()
  if (!p && !s) return null
  return (
    <div className="mt-3 space-y-1">
      {p ? (
        <p className="line-clamp-1 text-[12px] leading-snug text-slate-600 md:text-[13px]">
          <span className="font-semibold text-slate-800">Problem</span> <span className="text-slate-600">{p}</span>
        </p>
      ) : null}
      {s ? (
        <p className="line-clamp-1 text-[12px] leading-snug text-slate-600 md:text-[13px]">
          <span className="font-semibold text-slate-800">Solution</span> <span className="text-slate-600">{s}</span>
        </p>
      ) : null}
    </div>
  )
}

function FeaturedBulletList({ project }: { project: Project }) {
  const bullets = projectCardHighlights(project)
  if (!bullets.length) return null
  return (
    <ul className="mt-4 list-none space-y-2 md:mt-5" role="list">
      {bullets.map((line) => (
        <li
          key={line}
          className="flex gap-2.5 text-[13px] font-medium leading-snug text-slate-800 md:text-[14px]"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" aria-hidden />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function GithubLiveRow({
  project,
  unlocked,
  onViewProject,
  unlockTitle,
  className,
}: {
  project: Project
  unlocked: boolean
  onViewProject: (p: Project) => void
  unlockTitle: string
  className?: string
}) {
  const liveHref = projectLiveUrl(project)
  const hasGithub = Boolean(project.github?.trim())

  return (
    <div className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {hasGithub ? (
        unlocked ? (
          <Button
            href={project.github}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="sm"
            className="group-hover/card:shadow-md group-hover/card:ring-2 group-hover/card:ring-violet-500/25"
          >
            GitHub →
          </Button>
        ) : (
          <Button variant="primary" size="sm" type="button" onClick={() => onViewProject(project)} title={unlockTitle}>
            GitHub →
          </Button>
        )
      ) : null}
      {liveHref ? (
        unlocked ? (
          <Button href={liveHref} target="_blank" rel="noreferrer" variant="secondary" size="sm">
            Live →
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => onViewProject(project)}
            title={unlockTitle}
          >
            Live →
          </Button>
        )
      ) : null}
    </div>
  )
}

export function FeaturedProjectCard({ project, unlocked, onViewProject }: CardCallbacks & { project: Project }) {
  const copy = usePortfolioStore().portfolio.projectsSection
  const glowRef = usePointerGlow<HTMLDivElement>()
  const slug = projectRepoSlug(project)
  const displayTitle = projectDisplayTitle(project)

  return (
    <div id={`project-${project.id}`}>
      <div ref={glowRef} className="group/card">
        <Card className={cn('overflow-x-hidden border-slate-200/90 p-0', cardHoverShell)}>
          {project.thumbnail ? (
            <div className="border-b border-slate-200/90 bg-slate-100">
              <SafeImage
                src={project.thumbnail}
                alt={`${displayTitle} preview`}
                fallbackLabel={displayTitle}
                className="aspect-[21/9] w-full object-cover"
                wrapperClassName="aspect-[21/9] w-full"
              />
            </div>
          ) : null}
          <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative flex min-h-[260px] flex-col justify-center border-b border-slate-200 bg-zinc-50 p-8 md:min-h-[340px] md:border-b-0 md:border-r md:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-slate-800/90" aria-hidden />
              <div className="relative text-left">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{copy.featuredEyebrow}</p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl md:text-[1.75rem] md:leading-tight">
                    {displayTitle}
                  </h3>
                  <ProjectSystemSignals project={project} className="shrink-0 sm:pt-1" hideSystemType />
                </div>
                <p className="mt-2 font-mono text-[11px] text-slate-500 md:text-xs">
                  Repository: <span className="text-slate-700">{slug}</span>
                </p>
                <GithubLiveRow
                  project={project}
                  unlocked={unlocked}
                  onViewProject={onViewProject}
                  unlockTitle="Unlock full access below"
                  className="mt-3"
                />
                <ProblemSolutionLines project={project} />
                <FeaturedBulletList project={project} />
                <div className="mt-4">
                  <CardMetaLine project={project} />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-5 bg-white p-8 text-left md:p-10 lg:p-11">
              <p className="text-sm font-medium leading-snug text-slate-600">{copy.featuredAside}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function ProjectCardBulletList({ project }: { project: Project }) {
  const bullets = projectCardHighlights(project)
  if (!bullets.length) return null
  return (
    <ul className="mt-3 list-none space-y-2" role="list">
      {bullets.map((line) => (
        <li key={line} className="flex gap-2 text-[12px] font-medium leading-snug text-slate-700 md:text-[13px]">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-700" aria-hidden />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProjectCard({ project, unlocked, onViewProject }: CardCallbacks & { project: Project }) {
  const glowRef = usePointerGlow<HTMLDivElement>()
  const slug = projectRepoSlug(project)
  const displayTitle = projectDisplayTitle(project)

  return (
    <div id={`project-${project.id}`}>
      <div ref={glowRef} className="group/card h-full">
        <Card className={cn('flex h-full flex-col border-slate-200/90 p-5 text-left md:p-6', cardHoverShell)}>
          {project.thumbnail ? (
            <div className="-mx-1 mb-4 overflow-hidden rounded-lg border border-slate-200/80 bg-slate-50 md:-mx-1">
              <SafeImage
                src={project.thumbnail}
                alt={`${displayTitle} thumbnail`}
                fallbackLabel={displayTitle}
                className="aspect-[16/10] w-full object-cover"
                wrapperClassName="aspect-[16/10] w-full min-h-[120px]"
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-950 md:text-lg">{displayTitle}</h3>
            <ProjectSystemSignals project={project} className="shrink-0 sm:pt-0.5" hideSystemType />
          </div>
          <p className="mt-1 font-mono text-[10px] text-slate-500 md:text-[11px]">
            Repository: <span className="text-slate-700">{slug}</span>
          </p>

          <GithubLiveRow
            project={project}
            unlocked={unlocked}
            onViewProject={onViewProject}
            unlockTitle="Unlock in Progress & unlocks"
            className="mt-3"
          />

          <ProblemSolutionLines project={project} />
          <ProjectCardBulletList project={project} />

          <div className="mt-3">
            <CardMetaLine project={project} />
          </div>
        </Card>
      </div>
    </div>
  )
}
