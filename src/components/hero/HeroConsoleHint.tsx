import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePortfolioStore } from '../../state/usePortfolioStore'
import { hintPresenceAnimate, hintPresenceInitial, hintPresenceTransition } from '../../motion/micro'

const START_DELAY_MS = 0
const TYPE_MS = 52
const HOLD_MS = 3200
const FADE_MS = 500

export default function HeroConsoleHint() {
  const LINE = usePortfolioStore().portfolio.hero.consoleHintLine
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  const [faded, setFaded] = useState(false)
  const [gone, setGone] = useState(false)
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let startT: ReturnType<typeof setTimeout>
    let typeI: ReturnType<typeof setInterval> | null = null

    startT = window.setTimeout(() => {
      if (reduceMotion) {
        setCount(LINE.length)
        holdRef.current = window.setTimeout(() => setFaded(true), HOLD_MS)
        return
      }
      let n = 0
      typeI = window.setInterval(() => {
        n += 1
        setCount(n)
        if (n >= LINE.length) {
          if (typeI) window.clearInterval(typeI)
          typeI = null
          holdRef.current = window.setTimeout(() => setFaded(true), HOLD_MS)
        }
      }, TYPE_MS)
    }, START_DELAY_MS)

    return () => {
      window.clearTimeout(startT)
      if (typeI) window.clearInterval(typeI)
      if (holdRef.current) window.clearTimeout(holdRef.current)
    }
  }, [reduceMotion, LINE])

  useEffect(() => {
    if (!faded) return
    const t = window.setTimeout(() => setGone(true), FADE_MS + 80)
    return () => window.clearTimeout(t)
  }, [faded])

  if (gone) return null

  const text = LINE.slice(0, count)
  const typing = count < LINE.length
  const showCursor = !faded && (typing || count >= LINE.length)

  return (
    <motion.div
      className="mt-7 max-w-xl rounded-xl border border-white/10 bg-white/30 px-3 py-2.5 backdrop-blur-md md:mt-8"
      initial={hintPresenceInitial}
      animate={hintPresenceAnimate}
      transition={hintPresenceTransition}
    >
      <motion.p
        className="m-0 font-mono text-[11px] font-normal leading-relaxed tracking-tight text-slate-600 md:text-xs"
        initial={false}
        animate={{ opacity: faded ? 0 : 1 }}
        transition={{ duration: FADE_MS / 1000, ease: 'easeOut' }}
        aria-label={LINE}
      >
        <span>{text}</span>
        {showCursor ? (
          <motion.span
            className="ml-px inline-block h-[0.95em] w-px translate-y-[0.08em] align-middle bg-slate-400/70"
            aria-hidden
            animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.38, 0.62, 0.38] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        ) : null}
      </motion.p>
    </motion.div>
  )
}
