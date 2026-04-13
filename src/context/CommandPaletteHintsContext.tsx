import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

/** Permanent: user opened the command palette at least once. */
export const CMD_SEEN_KEY = 'cmd_seen'

/** One XP palette tip per session (first scroll). */
const XP_SCROLL_SESSION_KEY = 'portfolio-xp-palette-hint-shown'

const FLOATING_DELAY_MS = 3000
const FLOATING_DURATION_MS = 5500
const TYPING_DELAY_MS = 6000
const XP_TIP_DURATION_MS = 3000

type Ctx = {
  cmdSeen: boolean
  markPaletteSeen: () => void
  /** Corner chip — after delay, then auto-hide. */
  showFloatingHint: boolean
  /** Hero console typing — only if idle until delay (no scroll / unsafe click / key). */
  showTypingHint: boolean
  /** XPHud tooltip — first scroll this session only, short dwell. */
  showXpPaletteTip: boolean
}

const CommandPaletteHintsContext = createContext<Ctx | null>(null)

function readCmdSeen(): boolean {
  try {
    return localStorage.getItem(CMD_SEEN_KEY) === 'true'
  } catch {
    return false
  }
}

export function CommandPaletteHintsProvider({ children }: { children: React.ReactNode }) {
  const [cmdSeen, setCmdSeen] = useState(readCmdSeen)
  const [showFloatingHint, setShowFloatingHint] = useState(false)
  const [showTypingHint, setShowTypingHint] = useState(false)
  const [showXpPaletteTip, setShowXpPaletteTip] = useState(false)

  const cmdSeenRef = useRef(cmdSeen)
  cmdSeenRef.current = cmdSeen

  const floatingAppearRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const floatingHideRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingAppearRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const xpHideRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollPrimedRef = useRef(false)
  /** After any scroll past threshold, floating/typing must not appear. */
  const postScrollMuteRef = useRef(false)

  const clearAllHintTimers = useCallback(() => {
    ;[floatingAppearRef, floatingHideRef, typingAppearRef, xpHideRef].forEach((r) => {
      if (r.current != null) {
        window.clearTimeout(r.current)
        r.current = null
      }
    })
  }, [])

  const markPaletteSeen = useCallback(() => {
    try {
      localStorage.setItem(CMD_SEEN_KEY, 'true')
    } catch {
      /* private mode */
    }
    clearAllHintTimers()
    setShowFloatingHint(false)
    setShowTypingHint(false)
    setShowXpPaletteTip(false)
    setCmdSeen(true)
  }, [clearAllHintTimers])

  /** Any engagement — clears pending timers and dismisses transient hints. */
  const onEngagement = useCallback(() => {
    if (cmdSeenRef.current) return
    clearAllHintTimers()
    setShowFloatingHint(false)
    setShowTypingHint(false)
    setShowXpPaletteTip(false)
  }, [clearAllHintTimers])

  useEffect(() => {
    if (cmdSeen) return
    clearAllHintTimers()
    postScrollMuteRef.current = false
    scrollPrimedRef.current = false
    setShowFloatingHint(false)
    setShowTypingHint(false)
    setShowXpPaletteTip(false)

    floatingAppearRef.current = window.setTimeout(() => {
      floatingAppearRef.current = null
      if (cmdSeenRef.current || postScrollMuteRef.current) return
      setShowFloatingHint(true)
      floatingHideRef.current = window.setTimeout(() => {
        floatingHideRef.current = null
        setShowFloatingHint(false)
      }, FLOATING_DURATION_MS)
    }, FLOATING_DELAY_MS)

    typingAppearRef.current = window.setTimeout(() => {
      typingAppearRef.current = null
      if (cmdSeenRef.current || postScrollMuteRef.current) return
      setShowTypingHint(true)
    }, TYPING_DELAY_MS)

    return () => {
      clearAllHintTimers()
    }
  }, [cmdSeen, clearAllHintTimers])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) return
      const t = e.target
      if (t instanceof HTMLElement && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      postScrollMuteRef.current = true
      onEngagement()
    }

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      if (el?.closest('[data-cmd-palette-hint-safe]')) return
      postScrollMuteRef.current = true
      onEngagement()
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onClick, true)
    }
  }, [onEngagement])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 12) return

      clearAllHintTimers()
      setShowFloatingHint(false)
      setShowTypingHint(false)

      if (!scrollPrimedRef.current) {
        scrollPrimedRef.current = true
        postScrollMuteRef.current = true

        let showXp = false
        try {
          if (!sessionStorage.getItem(XP_SCROLL_SESSION_KEY)) {
            sessionStorage.setItem(XP_SCROLL_SESSION_KEY, '1')
            showXp = true
          }
        } catch {
          showXp = true
        }

        if (showXp) {
          setShowXpPaletteTip(true)
          xpHideRef.current = window.setTimeout(() => {
            xpHideRef.current = null
            setShowXpPaletteTip(false)
          }, XP_TIP_DURATION_MS)
        }
        return
      }

      setShowXpPaletteTip(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [clearAllHintTimers])

  const value: Ctx = {
    cmdSeen,
    markPaletteSeen,
    showFloatingHint,
    showTypingHint,
    showXpPaletteTip,
  }

  return <CommandPaletteHintsContext.Provider value={value}>{children}</CommandPaletteHintsContext.Provider>
}

export function useCommandPaletteHints(): Ctx {
  const c = useContext(CommandPaletteHintsContext)
  if (!c) throw new Error('useCommandPaletteHints must be used within CommandPaletteHintsProvider')
  return c
}
