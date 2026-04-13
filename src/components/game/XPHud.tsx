import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useCommandPaletteHints } from '../../context/CommandPaletteHintsContext'
import {
  hintPresenceAnimate,
  hintPresenceExit,
  hintPresenceInitial,
  hintPresenceTransition,
} from '../../motion/micro'
import { usePortfolioProgress } from '../../state/usePortfolioProgress'

export default function XPHud() {
  const [open, setOpen] = useState(false)
  const { cmdSeen, showXpPaletteTip } = useCommandPaletteHints()
  const showPaletteTip = !cmdSeen && showXpPaletteTip
  const { level, levelProgress, totalXp, nextLevelXp, fullScrollUnlocked } = usePortfolioProgress()
  const next = Number.isFinite(nextLevelXp) ? nextLevelXp : totalXp
  const remaining = Math.max(0, next - totalXp)

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={hintPresenceInitial}
            animate={hintPresenceAnimate}
            exit={hintPresenceExit}
            transition={hintPresenceTransition}
            className="pointer-events-auto w-[min(100vw-2rem,18rem)] rounded-2xl border border-white/10 bg-white/55 p-4 shadow-[0_4px_28px_rgba(15,23,42,0.07)] backdrop-blur-md"
          >
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Level {level}</span>
              <span className="tabular-nums text-slate-800">{totalXp} XP</span>
            </div>
            <div className="mt-2 h-2 overflow-x-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full bg-violet-700"
                animate={{ width: `${Math.round(levelProgress * 100)}%` }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              {Number.isFinite(nextLevelXp) ? `${remaining} XP to level ${level + 1}` : 'Max level reached'}
            </div>
            {fullScrollUnlocked ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-800">
                Scroll mastery unlocked
              </div>
            ) : null}
            <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
              Scroll for XP. Deep case studies live under Progress &amp; unlocks.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative pointer-events-auto" data-cmd-palette-hint-safe>
        <AnimatePresence>
          {showPaletteTip ? (
            <motion.div
              role="status"
              aria-live="polite"
              initial={hintPresenceInitial}
              animate={hintPresenceAnimate}
              exit={hintPresenceExit}
              transition={hintPresenceTransition}
              className="absolute bottom-[calc(100%+10px)] right-0 z-10 max-w-[13.5rem] origin-bottom-right rounded-xl border border-white/10 bg-white/45 px-3 py-2 shadow-[0_2px_18px_rgba(15,23,42,0.06)] backdrop-blur-md"
            >
              <p className="text-[10px] font-medium leading-snug tracking-tight text-slate-600">
                This is not a portfolio → Ctrl + K
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Hide progress' : 'Show progress and XP'}
          onClick={() => setOpen((v) => !v)}
          whileHover={{ y: -1 }}
          transition={hintPresenceTransition}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/55 text-slate-600 shadow-[0_2px_14px_rgba(15,23,42,0.06)] backdrop-blur-md transition-colors hover:border-slate-300/40 hover:text-slate-800"
        >
          <span className="text-lg font-semibold tabular-nums">{level}</span>
        </motion.button>
      </div>
    </div>
  )
}
