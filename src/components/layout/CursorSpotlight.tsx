import { useEffect, useRef } from 'react'

/** Soft radial glow following the pointer — desktop only, very low opacity. */
export default function CursorSpotlight() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = layerRef.current
    if (!el) return

    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')

    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--sx', `${e.clientX}px`)
      el.style.setProperty('--sy', `${e.clientY}px`)
    }

    const sync = () => {
      if (mq.matches) {
        window.addEventListener('mousemove', onMove, { passive: true })
      } else {
        window.removeEventListener('mousemove', onMove)
      }
    }

    sync()
    mq.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-[1] hidden lg:block"
      style={{
        background:
          'radial-gradient(520px circle at var(--sx, 70%) var(--sy, 35%), rgba(109, 40, 217, 0.045), transparent 52%)',
      }}
      aria-hidden
    />
  )
}
