import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'

type Props = {
  src: string
  alt: string
  className?: string
  /** Shown inside fallback (e.g. initials). */
  fallbackLabel?: string
  wrapperClassName?: string
}

/**
 * URL or data URL; on error shows a compact placeholder (no broken img icon).
 */
export default function SafeImage({ src, alt, className, fallbackLabel, wrapperClassName }: Props) {
  const [ok, setOk] = useState(true)

  useEffect(() => {
    setOk(true)
  }, [src])

  if (!src || !ok) {
    const label = (fallbackLabel ?? '?').trim().slice(0, 3).toUpperCase() || '?'
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-slate-100 to-violet-50 text-violet-900/80',
          wrapperClassName,
        )}
        role="img"
        aria-label={alt}
      >
        <svg className="h-8 w-8 opacity-40" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[11px] font-bold tabular-nums">{label}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setOk(false)}
    />
  )
}
