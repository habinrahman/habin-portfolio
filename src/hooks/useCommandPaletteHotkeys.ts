import { useEffect } from 'react'

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  return tag === 'input' || tag === 'textarea' || target.isContentEditable
}

export function useCommandPaletteHotkeys(open: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const cmdK = (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || false
      const slash = e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey
      if (cmdK) {
        e.preventDefault()
        open()
        return
      }
      if (slash && !isTypingTarget(e.target)) {
        e.preventDefault()
        open()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])
}

