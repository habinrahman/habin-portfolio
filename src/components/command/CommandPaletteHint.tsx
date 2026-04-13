import { AnimatePresence, motion } from 'framer-motion'
import { useCommandPaletteHints } from '../../context/CommandPaletteHintsContext'
import {
  hintPresenceAnimate,
  hintPresenceExit,
  hintPresenceInitial,
  hintPresenceTransition,
} from '../../motion/micro'

function modifierKeyLabel() {
  if (typeof navigator === 'undefined') return 'Ctrl'
  return /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent) ? '⌘' : 'Ctrl'
}

type Props = {
  onOpen: () => void
}

/** Floating hint — auto-hides after a few seconds (see CommandPaletteHintsContext). */
export default function CommandPaletteHint({ onOpen }: Props) {
  const { cmdSeen, showFloatingHint } = useCommandPaletteHints()
  const visible = !cmdSeen && showFloatingHint
  const label = `Press ${modifierKeyLabel()}K to explore`

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed right-4 z-[52] max-w-[min(calc(100vw-2rem),18rem)] md:right-6"
          style={{ bottom: 'calc(5.25rem + env(safe-area-inset-bottom, 0px))' }}
          initial={hintPresenceInitial}
          animate={hintPresenceAnimate}
          exit={hintPresenceExit}
          transition={hintPresenceTransition}
        >
          <motion.button
            type="button"
            data-cmd-palette-hint-safe
            onClick={() => onOpen()}
            className="pointer-events-auto w-full rounded-full border border-slate-200/80 bg-white/85 px-4 py-2.5 text-left shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-md transition-colors duration-300 hover:bg-white/95"
            aria-label={`Open command palette. ${label}`}
          >
            <span className="block text-[12px] font-medium leading-snug tracking-tight text-slate-700 md:text-[13px]">
              {label}
            </span>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
