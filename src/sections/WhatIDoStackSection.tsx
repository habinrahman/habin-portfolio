import TechStackGrid from '../components/about/TechStackGrid'
import LiveEngineeringStats from '../components/system/LiveEngineeringStats'
import { usePortfolioStore } from '../state/usePortfolioStore'

export default function WhatIDoStackSection() {
  const { portfolio, projects } = usePortfolioStore()
  const { whatIDo: w, profile } = portfolio
  const surfacedRepoCount = projects.length
  return (
    <section
      id="what-i-do"
      aria-labelledby="what-i-do-heading"
      className="scroll-mt-4 border-b border-slate-100 bg-white px-4 py-12 md:px-10 md:py-14 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="what-i-do-heading" className="heading-support text-slate-800">
          {w.heading}
        </h2>
        <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-700 md:mt-6 md:text-lg md:leading-relaxed">
          {w.body[0]}
        </p>
        {w.body[1] ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">{w.body[1]}</p>
        ) : null}

        <TechStackGrid />

        <p className="mt-10 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 md:mt-12">
          {w.liveTelemetryLabel}
        </p>
        <LiveEngineeringStats compact className="mt-3 opacity-95" />

        <div className="mt-8 max-w-xl text-left md:mt-9">
          <p className="text-xs font-semibold tracking-tight text-slate-600 md:text-[13px]">
            {w.activeReposLine}: {surfacedRepoCount}+
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500 md:text-xs">
            {w.footerLineBeforeGithub}{' '}
            <a href="#explore" className="font-medium text-violet-800 underline-offset-2 hover:text-violet-950 hover:underline">
              {w.exploreLinkText}
            </a>{' '}
            ·{' '}
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-violet-800 underline-offset-2 hover:text-violet-950 hover:underline"
            >
              {w.githubLinkText}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
