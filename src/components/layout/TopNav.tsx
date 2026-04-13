import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioProgress } from '../../state/usePortfolioProgress'
import { usePortfolioStore } from '../../state/usePortfolioStore'
import { sfxTick } from '../../utils/sfx'
import { GitHubIcon, LinkedInIcon } from '../icons/SocialIcons'

const MotionLink = motion(Link)

function SocialLinks({
  className,
  nav,
  profile,
}: {
  className?: string
  nav: ReturnType<typeof usePortfolioStore>['portfolio']['nav']
  profile: ReturnType<typeof usePortfolioStore>['portfolio']['profile']
}) {
  return (
    <div className={className}>
      <motion.a
        href={profile.contact.github}
        target="_blank"
        rel="noreferrer"
        aria-label={nav.githubAriaLabel}
        whileTap={{ scale: 0.95 }}
        className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <GitHubIcon />
      </motion.a>
      <motion.a
        href={profile.contact.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label={nav.linkedinAriaLabel}
        whileTap={{ scale: 0.95 }}
        className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <LinkedInIcon />
      </motion.a>
    </div>
  )
}

export default function TopNav() {
  const { portfolio } = usePortfolioStore()
  const { nav, profile } = portfolio
  const { grantBonusXp } = usePortfolioProgress()
  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <nav className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex h-14 md:h-16 items-center justify-between">
          <button
            type="button"
            className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-slate-700"
            onClick={() => {
              const res = grantBonusXp(50, 'logo')
              if (!res.granted) return
              setToast(nav.easterEggToast)
              window.setTimeout(() => setToast(null), 1200)
            }}
          >
            {nav.brand}
          </button>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex lg:gap-6">
            {nav.links.map((item) => (
              <MotionLink
                key={item.label}
                to={{ pathname: item.path, hash: item.hash }}
                whileHover={{ y: -1 }}
                className="whitespace-nowrap text-[13px] font-medium text-slate-600 transition hover:text-slate-900 lg:text-sm"
                onMouseEnter={() => sfxTick()}
              >
                {item.label}
              </MotionLink>
            ))}
          </div>

          <SocialLinks className="hidden items-center gap-0.5 md:flex" nav={nav} profile={profile} />
          <SocialLinks className="flex items-center gap-0.5 md:hidden" nav={nav} profile={profile} />
        </div>

        <div className="-mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-1 pb-3 md:hidden">
          {nav.links.map((item) => (
            <Link
              key={item.label}
              to={{ pathname: item.path, hash: item.hash }}
              className="text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {toast ? (
        <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-card">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
