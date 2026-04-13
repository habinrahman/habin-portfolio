import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollElementIntoView } from '../utils/scrollToId'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    const raw = location.hash ?? ''
    const id = raw.startsWith('#') ? raw.slice(1) : raw

    if (id) {
      let cancelled = false
      const tryScroll = (attempt: number) => {
        if (cancelled) return
        const el = document.getElementById(id)
        if (el) {
          scrollElementIntoView(el)
          return
        }
        if (attempt < 12) {
          window.setTimeout(() => tryScroll(attempt + 1), 50)
        }
      }
      requestAnimationFrame(() => tryScroll(0))
      return () => {
        cancelled = true
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return null
}

