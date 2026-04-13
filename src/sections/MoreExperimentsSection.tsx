import { motion } from 'framer-motion'
import { usePortfolioStore } from '../state/usePortfolioStore'

type ExperimentItem = {
  id: string
  repo: string
  displayName: string
  description: string
  tech: readonly string[]
}

function RepoCard({ item, githubBase }: { item: ExperimentItem; githubBase: string }) {
  const href = `${githubBase.replace(/\/$/, '')}/${item.repo}`
  return (
    <motion.article
      className="flex h-full flex-col rounded-xl border border-slate-200/95 bg-white px-4 py-4 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-slate-300 hover:shadow-md md:px-4 md:py-4"
      whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <h3 className="break-all font-mono text-[13px] font-semibold leading-snug tracking-tight text-slate-900 md:text-[14px]">
        {item.displayName}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600 md:text-sm">{item.description}</p>
      <p className="mt-3 text-[11px] font-medium text-slate-500 md:text-xs">{item.tech.join(' · ')}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-auto pt-3 text-[12px] font-semibold text-violet-800 hover:text-violet-950"
      >
        GitHub →
      </a>
    </motion.article>
  )
}

type Props = {
  embedded?: boolean
}

export default function MoreExperimentsSection({ embedded = false }: Props) {
  const { portfolio } = usePortfolioStore()
  const repos = portfolio.moreExperiments
  const githubBase = portfolio.profile.contact.github

  return (
    <section
      id="more-experiments"
      aria-labelledby="more-experiments-heading"
      className={
        embedded
          ? 'scroll-mt-4 bg-transparent px-0 py-0'
          : 'scroll-mt-4 border-t border-slate-200/60 bg-zinc-50/30 px-4 py-12 md:px-8 md:py-14'
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className={embedded ? 'max-w-2xl text-left' : 'mx-auto max-w-2xl text-center md:max-w-3xl'}>
          <h2 id="more-experiments-heading" className="heading-support">
            More Systems &amp; Experiments
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:mt-4 md:text-base">
            Public repos — backend, automation, AI — depth beyond the flagship projects.
          </p>
        </div>

        <ul
          className="mt-8 grid list-none grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4"
          role="list"
        >
          {repos.map((item) => (
            <li key={item.id}>
              <RepoCard item={item} githubBase={githubBase} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
