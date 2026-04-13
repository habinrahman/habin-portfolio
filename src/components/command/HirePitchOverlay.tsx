import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePortfolioStore } from '../../state/usePortfolioStore'
import { springSnappy } from '../../motion/micro'
import { sfxUnlock } from '../../utils/sfx'

const EVENT = 'portfolio:hire-pitch'
const AUTO_MS = 3200

export default function HirePitchOverlay() {
  const hp = usePortfolioStore().portfolio.hirePitch
  const [open, setOpen] = useState(false)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismiss = useCallback(() => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current)
    dismissTimer.current = null
    setOpen(false)
  }, [])

  useEffect(() => {
    const onPitch = () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current)
      sfxUnlock()
      setOpen(true)
      dismissTimer.current = window.setTimeout(() => {
        dismissTimer.current = null
        setOpen(false)
      }, AUTO_MS)
    }
    window.addEventListener(EVENT, onPitch)
    return () => {
      window.removeEventListener(EVENT, onPitch)
      if (dismissTimer.current) clearTimeout(dismissTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 px-4 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismiss}
          role="presentation"
        >
          <motion.div
            role="status"
            aria-live="polite"
            aria-label="Why hire pitch"
            initial={{ opacity: 0, scale: 0.9, y: 16, rotateX: 4 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
              boxShadow: [
                '0 0 0 1px rgba(139,92,246,0.15), 0 24px 80px rgba(0,0,0,0.5), 0 0 0 0 rgba(139,92,246,0)',
                '0 0 0 1px rgba(167,139,250,0.35), 0 32px 100px rgba(0,0,0,0.55), 0 0 72px -8px rgba(109,40,217,0.45)',
                '0 0 0 1px rgba(139,92,246,0.2), 0 28px 90px rgba(0,0,0,0.52), 0 0 48px -12px rgba(109,40,217,0.28)',
              ],
            }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ ...springSnappy, boxShadow: { duration: 0.85, times: [0, 0.45, 1] } }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md rounded-2xl border border-violet-400/40 bg-zinc-950 px-8 py-10 [transform-style:preserve-3d] [perspective:900px]"
          >
            <motion.span
              className="pointer-events-none absolute -left-px top-6 bottom-6 w-1 rounded-l-2xl bg-gradient-to-b from-violet-300/95 via-violet-500 to-violet-900/85"
              aria-hidden
              initial={{ scaleY: 0.6, opacity: 0.5 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.06, ...springSnappy }}
            />
            <motion.span
              className="pointer-events-none absolute -inset-px rounded-2xl ring-2 ring-violet-500/0"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.35], boxShadow: ['0 0 0 0 rgba(139,92,246,0)', '0 0 0 3px rgba(139,92,246,0.45)', '0 0 28px 6px rgba(139,92,246,0.2)'] }}
              transition={{ duration: 0.9, times: [0, 0.35, 1], ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="relative text-center text-xl font-semibold leading-snug tracking-tight text-zinc-50 md:text-2xl md:leading-snug">
              {hp.primary}
              <span className="mt-2 block font-mono text-[15px] font-medium text-violet-200/95 md:text-[17px]">
                {hp.secondary}
              </span>
            </p>
            <p className="relative mt-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              {hp.dismissHint}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
