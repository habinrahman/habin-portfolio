import { useEffect, useRef } from 'react'

export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / Math.max(1, r.width)) * 100
      const y = ((e.clientY - r.top) / Math.max(1, r.height)) * 100
      el.style.setProperty('--x', `${x}%`)
      el.style.setProperty('--y', `${y}%`)
    }

    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])

  return ref
}

