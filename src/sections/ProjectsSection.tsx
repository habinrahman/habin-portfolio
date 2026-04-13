import { useEffect, useMemo, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/types'
import { usePortfolioProgress } from '../state/usePortfolioProgress'
import { usePortfolioStore } from '../state/usePortfolioStore'
import ProjectModal from '../components/projects/ProjectModal'
import CompactProjectCard from '../components/projects/CompactProjectCard'
import { LiveSystemPulse } from '../components/system/LiveEngineeringStats'
import { scrollElementIntoView } from '../utils/scrollToId'
import { ProjectCard } from '../components/projects/ProjectShowcaseCards'

const HOMEPAGE_FEATURED_LIMIT = 5

type Props = {
  exploreDetailsRef?: RefObject<HTMLDetailsElement | null>
}

type ProjectsSectionCopy = {
  eyebrow?: string
  featuredHeading?: string
  featuredSubtitle?: string
  moreHeading?: string
  moreSubtitle?: string
  supporting?: string
  unlockHintToast: string
  viewAllSystemsLabel?: string
}

export default function ProjectsSection({ exploreDetailsRef }: Props) {
  const { portfolio, projects: PROJECTS } = usePortfolioStore()
  const ps = portfolio.projectsSection as ProjectsSectionCopy
  const { isProjectUnlocked } = usePortfolioProgress()
  const [active, setActive] = useState<Project | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const onFocusProject = (e: Event) => {
      const id = (e as CustomEvent<{ projectId: string }>).detail?.projectId
      if (!id) return
      const p = PROJECTS.find((x) => x.id === id)
      if (!p || !isProjectUnlocked(p.id)) return
      setActive(p)
    }
    window.addEventListener('portfolio:focus-project', onFocusProject)
    return () => window.removeEventListener('portfolio:focus-project', onFocusProject)
  }, [PROJECTS, isProjectUnlocked])

  const { featuredProjects, moreProjects } = useMemo(() => {
    const orderedFeatured = PROJECTS.filter((p) => p.featured)
    const featured = orderedFeatured.slice(0, HOMEPAGE_FEATURED_LIMIT)
    const featuredIds = new Set(featured.map((p) => p.id))
    const more = PROJECTS.filter((p) => !featuredIds.has(p.id))
    return { featuredProjects: featured, moreProjects: more }
  }, [PROJECTS])

  const openExplore = () => {
    const details = exploreDetailsRef?.current
    if (!details) return
    details.toggleAttribute('open', true)
    scrollElementIntoView(details, { block: 'nearest' })
  }

  const onViewProject = (project: Project) => {
    if (!isProjectUnlocked(project.id)) {
      setToast(ps.unlockHintToast)
      window.setTimeout(() => setToast(null), 2400)
      openExplore()
      return
    }
    setActive(project)
  }

  const featuredHeading = ps.featuredHeading ?? 'Featured Systems'
  const featuredSubtitle =
    ps.featuredSubtitle ??
    'Production-grade platforms and automation systems engineered for real-world impact.'
  const moreHeading = ps.moreHeading ?? 'More Systems & Experiments'
  const moreSubtitle =
    ps.moreSubtitle ?? 'Additional builds, experiments, and supporting work.'
  const viewAllLabel = ps.viewAllSystemsLabel ?? 'View All Systems →'

  return (
    <section
      id="projects"
      className="relative scroll-mt-4 border-t-[3px] border-slate-900/88 bg-white px-4 pb-20 pt-20 shadow-[0_-28px_56px_-28px_rgba(15,23,42,0.08)] md:px-10 md:pb-24 md:pt-28 lg:px-14"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" aria-hidden />

      <div className="mx-auto max-w-6xl text-left">
        {ps.eyebrow?.trim() ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800">{ps.eyebrow}</p>
        ) : null}
        <h2 className={ps.eyebrow?.trim() ? 'mt-3 heading-projects' : 'heading-projects'}>{featuredHeading}</h2>
        <p className="mt-5 max-w-2xl text-lg font-medium text-slate-800 md:mt-6 md:text-xl">{featuredSubtitle}</p>
        <LiveSystemPulse className="mt-5" />
        {ps.supporting?.trim() ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:mt-5 md:text-[15px]">{ps.supporting}</p>
        ) : null}
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 md:mt-16">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            unlocked={isProjectUnlocked(project.id)}
            onViewProject={onViewProject}
          />
        ))}
      </div>

      {moreProjects.length ? (
        <div className="mx-auto mt-20 max-w-6xl md:mt-24">
          <h3 className="heading-projects text-[clamp(1.25rem,2.5vw,1.75rem)] leading-tight">{moreHeading}</h3>
          <p className="mt-5 max-w-2xl text-base font-medium text-slate-800 md:mt-6 md:text-lg">{moreSubtitle}</p>

          <ul
            className="mt-10 grid list-none grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4"
            role="list"
          >
            {moreProjects.map((project) => (
              <li key={project.id}>
                <CompactProjectCard project={project} onRequestUnlock={() => onViewProject(project)} />
              </li>
            ))}
          </ul>

          <p className="mt-10 text-left">
            <Link
              to="/projects"
              className="text-sm font-semibold text-violet-800 underline-offset-2 hover:text-violet-950 hover:underline md:text-[15px]"
            >
              {viewAllLabel}
            </Link>
          </p>
        </div>
      ) : (
        <p className="mx-auto mt-12 max-w-6xl text-left">
          <Link
            to="/projects"
            className="text-sm font-semibold text-violet-800 underline-offset-2 hover:text-violet-950 hover:underline md:text-[15px]"
          >
            {viewAllLabel}
          </Link>
        </p>
      )}

      {toast ? (
        <div className="fixed left-1/2 bottom-24 z-[60] max-w-sm -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm text-slate-800 shadow-card md:bottom-8">
          {toast}
        </div>
      ) : null}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
