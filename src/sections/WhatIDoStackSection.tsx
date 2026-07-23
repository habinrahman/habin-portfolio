import TechStackGrid from '../components/about/TechStackGrid'
import { usePortfolioStore } from '../state/usePortfolioStore'

export default function WhatIDoStackSection() {
  const { portfolio } = usePortfolioStore()
  const { whatIDo: w, profile } = portfolio
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

        <div className="mt-10 max-w-xl text-left md:mt-12">
          <p className="text-[11px] leading-relaxed text-slate-500 md:text-xs">
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
