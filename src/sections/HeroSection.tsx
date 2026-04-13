import { motion } from 'framer-motion'
import HeroConsoleHint from '../components/hero/HeroConsoleHint'
import HeroHeadshot from '../components/hero/HeroHeadshot'
import Button from '../components/ui/Button'
import { usePortfolioStore } from '../state/usePortfolioStore'
import { useCommandPaletteHints } from '../context/CommandPaletteHintsContext'
import {
  hintPresenceAnimate,
  hintPresenceInitial,
  hintPresenceTransition,
  springSoft,
} from '../motion/micro'
import { scrollToId } from '../utils/scrollToId'

type Props = {
  onOpenCommandPalette?: () => void
}

export default function HeroSection({ onOpenCommandPalette }: Props) {
  const { portfolio } = usePortfolioStore()
  const { profile, hero, personal } = portfolio
  const { cmdSeen, showTypingHint } = useCommandPaletteHints()
  const showGhostBar = !cmdSeen

  return (
    <section className="relative flex min-h-screen items-center border-b border-slate-200/90 bg-zinc-50 px-4 py-24 md:px-10 md:py-32 lg:px-14">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,transparent_42%,rgba(244,244,245,0.9)_100%)]"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 md:gap-x-14 lg:gap-x-16">
          <motion.div
            className="order-2 mx-auto max-w-xl text-center md:order-1 md:mx-0 md:max-w-none md:text-left lg:max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springSoft}
          >
            <div className="mb-8 sm:mb-10 md:mb-12">
              <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-sm">
                <span className="text-slate-800">{profile.name}</span>
              </p>
              <p className="mx-auto max-w-xl text-sm font-normal leading-snug text-slate-500 md:mx-0 md:text-[15px] md:leading-snug">
                {profile.title}
              </p>
            </div>

            <h1 className="text-center text-4xl font-black leading-[1.05] tracking-[-0.03em] text-slate-950 sm:text-7xl sm:leading-[1.02] md:text-left md:text-8xl md:leading-[0.98] md:tracking-[-0.04em] lg:text-[6.25rem] lg:leading-[0.96]">
              {hero.lines.h1}
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg font-semibold leading-snug text-slate-800 sm:mt-10 sm:text-xl sm:leading-snug md:mx-0 md:mt-12 md:text-2xl md:leading-snug lg:mt-14 lg:max-w-3xl lg:text-[1.75rem] lg:leading-snug">
              {hero.lines.subhead}
            </p>

            {hero.lines.kicker?.trim() ? (
              <p className="mt-6 text-center text-xl font-bold leading-snug text-slate-900 sm:text-2xl md:mt-8 md:text-left md:text-3xl md:leading-tight">
                {hero.lines.kicker}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-11 md:justify-start">
              <Button onClick={() => scrollToId('projects')}>{hero.ctaSeeWork}</Button>
              <Button variant="secondary" onClick={() => scrollToId('contact')}>
                {hero.ctaWorkWithMe}
              </Button>
              <Button variant="secondary" href={profile.contact.github}>
                {hero.ctaGithub}
              </Button>
            </div>

            {onOpenCommandPalette && showGhostBar ? (
              <div className="mt-8 flex w-full justify-center md:mt-9 md:justify-start">
                <motion.button
                  type="button"
                  data-cmd-palette-hint-safe
                  onClick={onOpenCommandPalette}
                  initial={hintPresenceInitial}
                  animate={hintPresenceAnimate}
                  transition={hintPresenceTransition}
                  className="w-full max-w-md cursor-pointer rounded-xl border border-white/10 bg-white/35 px-4 py-2.5 text-left shadow-[0_2px_16px_rgba(15,23,42,0.04)] outline-none backdrop-blur-md transition-[background-color,box-shadow] duration-300 hover:bg-white/42 hover:shadow-[0_3px_20px_rgba(15,23,42,0.06)] focus-visible:ring-2 focus-visible:ring-slate-400/25 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                  aria-label="Open command palette"
                >
                  <span className="pointer-events-none font-mono text-[13px] tracking-tight text-slate-500 md:text-sm">
                    {hero.commandBarLabel}
                  </span>
                </motion.button>
              </div>
            ) : null}

            {showTypingHint ? <HeroConsoleHint /> : null}
          </motion.div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end md:pr-[2%] lg:pr-[4%]">
            <HeroHeadshot
              src={personal.photo.src}
              alt={personal.photo.alt}
              fallbackInitials={personal.photoFallbackInitials}
              variant="featured"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
