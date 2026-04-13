import { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import CommandPalette from '../components/command/CommandPalette'
import CommandPaletteHint from '../components/command/CommandPaletteHint'
import HirePitchOverlay from '../components/command/HirePitchOverlay'
import ScrollToTop from '../components/ScrollToTop'
import XPHud from '../components/game/XPHud'
import Footer from '../components/layout/Footer'
import TopNav from '../components/layout/TopNav'
import CursorSpotlight from '../components/layout/CursorSpotlight'
import { usePortfolioStore } from '../state/usePortfolioStore'
import { useCommandPaletteHotkeys } from '../hooks/useCommandPaletteHotkeys'
import AuthorityStripSection from '../sections/AuthorityStripSection'
import CertificationsSection from '../sections/CertificationsSection'
import ContactSection from '../sections/ContactSection'
import EngineeringStackSystemsSection from '../sections/EngineeringStackSystemsSection'
import ExploreWorkSection from '../sections/ExploreWorkSection'
import HeroSection from '../sections/HeroSection'
import LiveSystemTelemetrySection from '../sections/LiveSystemTelemetrySection'
import ProblemToSystemSection from '../sections/ProblemToSystemSection'
import ProjectsSection from '../sections/ProjectsSection'
import WhatIDoStackSection from '../sections/WhatIDoStackSection'
import WorkWithMeSection from '../sections/WorkWithMeSection'
import { useCommandPaletteHints } from '../context/CommandPaletteHintsContext'

export default function HomePage() {
  const { portfolio } = usePortfolioStore()
  const { meta, closing, explore } = portfolio
  const exploreRef = useRef<HTMLDetailsElement>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const { markPaletteSeen } = useCommandPaletteHints()
  useCommandPaletteHotkeys(openPalette)

  useEffect(() => {
    if (paletteOpen) markPaletteSeen()
  }, [paletteOpen, markPaletteSeen])

  return (
    <MotionConfig reducedMotion="never">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <ScrollToTop />

      <div className="relative min-h-screen w-full">
        <CursorSpotlight />
        <div className="relative z-10">
          <TopNav />
          <XPHud />
          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
          <CommandPaletteHint onOpen={openPalette} />
          <HirePitchOverlay />

          <HeroSection onOpenCommandPalette={openPalette} />
          <AuthorityStripSection />
          <WhatIDoStackSection />
          <ProblemToSystemSection />
          <ProjectsSection exploreDetailsRef={exploreRef} />
          <LiveSystemTelemetrySection />
          <EngineeringStackSystemsSection />
          <CertificationsSection preview />
          <WorkWithMeSection />
          <ContactSection />

          <div className="border-t border-slate-200/60 bg-zinc-100/90 px-4 py-8 md:px-10 md:py-10 lg:px-14">
            <details
              ref={exploreRef}
              id="explore"
              className="group mx-auto max-w-6xl border-t border-slate-200/70 pt-8 md:pt-9"
            >
              <summary className="flex cursor-pointer list-none flex-col text-left select-none [&::-webkit-details-marker]:hidden transition-colors duration-300 hover:text-slate-950">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{explore.eyebrow}</span>
                <span className="mt-1.5 text-base font-semibold text-slate-800 group-open:text-slate-950 transition-colors">
                  {explore.title}
                </span>
                <span className="mt-1 max-w-md text-xs text-slate-500 md:text-sm">{explore.description}</span>
              </summary>
              <ExploreWorkSection embedded />
            </details>
          </div>

          <section
            className="border-t border-slate-200/80 bg-white px-4 py-14 md:px-10 md:py-16 lg:px-14"
            aria-label="Closing statement"
          >
            <div className="mx-auto max-w-3xl text-left">
              {closing.lines.map((line) => (
                <p
                  key={line}
                  className="text-lg font-bold leading-snug tracking-tight text-slate-950 md:text-xl md:leading-snug [&:not(:first-child)]:mt-3"
                >
                  {line}
                </p>
              ))}
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}
