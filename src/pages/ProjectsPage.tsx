import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import TopNav from '../components/layout/TopNav'
import ProjectModal from '../components/projects/ProjectModal'
import { ProjectCard } from '../components/projects/ProjectShowcaseCards'
import type { Project } from '../data/types'
import { usePortfolioProgress } from '../state/usePortfolioProgress'
import { usePortfolioStore } from '../state/usePortfolioStore'

export default function ProjectsPage() {
  const { portfolio, projects } = usePortfolioStore()
  const { meta, certificationsPage } = portfolio
  const { isProjectUnlocked } = usePortfolioProgress()
  const [active, setActive] = useState<Project | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const onViewProject = useCallback(
    (project: Project) => {
      if (!isProjectUnlocked(project.id)) {
        setToast(portfolio.projectsSection.unlockHintToast)
        window.setTimeout(() => setToast(null), 2400)
        return
      }
      setActive(project)
    },
    [isProjectUnlocked, portfolio.projectsSection.unlockHintToast],
  )

  return (
    <>
      <Helmet>
        <title>Systems &amp; projects | {meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <div className="relative min-h-screen w-full bg-white">
        <div className="relative z-10">
          <TopNav />
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-10 md:pt-14 lg:px-14">
            <p className="text-sm font-medium text-slate-600">
              <Link to="/" className="text-violet-800 underline-offset-2 hover:text-violet-950 hover:underline">
                {certificationsPage.backToHomeLabel}
              </Link>
            </p>
            <h1 className="mt-6 heading-projects">All systems</h1>
            <p className="mt-5 max-w-2xl text-lg font-medium text-slate-800 md:text-xl">
              Full project grid — same cards as the homepage. Unlock deep dives via Progress &amp; unlocks on the home
              page.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  unlocked={isProjectUnlocked(project.id)}
                  onViewProject={onViewProject}
                />
              ))}
            </div>
          </main>

          <Footer />
        </div>
      </div>

      {toast ? (
        <div className="fixed left-1/2 bottom-24 z-[60] max-w-sm -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm text-slate-800 shadow-card md:bottom-8">
          {toast}
        </div>
      ) : null}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  )
}
