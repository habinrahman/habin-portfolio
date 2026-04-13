import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import type { CertificationItem } from '../../config/portfolio.config'
import CertificateImage from './CertificateImage'

const backdropTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }
const backdropExitTransition = { duration: 0.42, ease: [0.4, 0, 0.2, 1] as const }
const popTransition = { type: 'spring', stiffness: 420, damping: 34, mass: 0.82 } as const
const dialogExitTransition = { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const }

type Props = {
  open: boolean
  onClose: () => void
  items: CertificationItem[]
  /** Index shown when the modal opens (e.g. from a card click) */
  initialIndex?: number
  title?: string
}

export default function CertificationModal({
  open,
  onClose,
  items,
  initialIndex = 0,
  title = 'Certifications',
}: Props) {
  const [idx, setIdx] = useState(0)
  const slide = items[idx]
  const count = items.length
  const hasMany = count > 1

  useEffect(() => {
    if (!open) return
    const safe = count ? Math.min(Math.max(0, initialIndex), count - 1) : 0
    setIdx(safe)
  }, [open, initialIndex, count])

  const go = useCallback(
    (delta: number) => {
      if (count <= 0) return
      setIdx((i) => (i + delta + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, go])

  if (count === 0) return null

  return (
    <AnimatePresence mode="wait">
      {open && slide ? (
        <motion.div
          key="cert-overlay"
          className="fixed inset-0 z-[96] flex items-center justify-center px-4 py-10 sm:px-6 md:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: backdropExitTransition }}
          transition={backdropTransition}
          onClick={onClose}
          role="presentation"
        >
          <div
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-xl backdrop-saturate-125"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            className="relative z-[1] flex w-full max-w-[min(100%,42rem)] max-h-[min(92dvh,880px)] flex-col overflow-hidden rounded-2xl border border-white/25 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.45),0_0_0_1px_rgba(15,23,42,0.06)]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10, transition: dialogExitTransition }}
            transition={popTransition}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-100/90 bg-white px-4 py-3 md:px-5 md:py-3.5">
              <div className="min-w-0">
                <h2 id="cert-modal-title" className="text-base font-bold tracking-tight text-slate-950 md:text-lg">
                  {title}
                </h2>
                {hasMany ? (
                  <p className="mt-0.5 font-mono text-[11px] tabular-nums text-slate-400 md:text-xs">
                    {idx + 1} / {count}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {hasMany ? (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:text-[13px]"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:text-[13px]"
                    >
                      Next
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-white to-slate-50/90 px-4 pb-6 pt-5 md:px-6 md:pb-7">
              <div className="mx-auto w-full max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.28),0_0_0_1px_rgba(15,23,42,0.04)] md:p-4">
                      {hasMany ? (
                        <>
                          <button
                            type="button"
                            onClick={() => go(-1)}
                            className="absolute left-1 top-1/2 z-[1] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/95 bg-white/95 text-lg text-slate-700 shadow-md transition hover:bg-white md:left-2"
                            aria-label="Previous certificate"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            onClick={() => go(1)}
                            className="absolute right-1 top-1/2 z-[1] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/95 bg-white/95 text-lg text-slate-700 shadow-md transition hover:bg-white md:right-2"
                            aria-label="Next certificate"
                          >
                            ›
                          </button>
                        </>
                      ) : null}

                      <div className="flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl md:min-h-[240px]">
                        <motion.div
                          className="flex max-w-full justify-center"
                          initial={false}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <CertificateImage
                            primarySrc={slide.image}
                            alt={`${slide.title}${slide.org ? ` — ${slide.org}` : ''} certificate`}
                            className="max-h-[min(52dvh,480px)] w-auto max-w-full rounded-lg object-contain shadow-[0_12px_40px_-12px_rgba(15,23,42,0.35)]"
                            brokenClassName="flex max-h-[min(52dvh,480px)] min-h-[180px] max-w-md flex-col items-center justify-center gap-3 rounded-lg px-5 py-8 text-center"
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-200/80 pt-4 text-center md:mt-6 md:pt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700">{slide.category}</p>
                      <p className="mt-2 text-lg font-bold tracking-tight text-slate-950 md:text-xl">{slide.title}</p>
                      {slide.org ? (
                        <p className="mt-1 text-sm font-medium text-slate-500 md:text-[15px]">{slide.org}</p>
                      ) : null}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {hasMany ? (
                  <div className="mt-6 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {items.map((s, i) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setIdx(i)}
                          className={
                            i === idx
                              ? 'h-2 w-2 rounded-full bg-violet-700'
                              : 'h-2 w-2 rounded-full bg-slate-300 transition hover:bg-slate-400'
                          }
                          aria-label={`Show ${s.title}`}
                          aria-current={i === idx}
                        />
                      ))}
                    </div>
                    <p className="font-mono text-[10px] text-slate-400">
                      ← → · Esc
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
