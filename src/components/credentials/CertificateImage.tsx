import { useEffect, useState } from 'react'

/** Ships in repo; used when `image` under public/credentials/ is missing */
export const CERTIFICATE_IMAGE_PLACEHOLDER = '/credentials/placeholder-certificate.svg'

type Tier = 0 | 1 | 2

type Props = {
  primarySrc: string
  alt: string
  className?: string
  /** Shown after primary + placeholder both fail to load */
  brokenClassName?: string
}

/**
 * Tries configured asset, then bundled SVG placeholder, then a minimal inline block.
 */
export default function CertificateImage({ primarySrc, alt, className, brokenClassName }: Props) {
  const [tier, setTier] = useState<Tier>(0)

  useEffect(() => {
    setTier(0)
  }, [primarySrc])

  const src = tier === 0 ? primarySrc : tier === 1 ? CERTIFICATE_IMAGE_PLACEHOLDER : null

  if (tier === 2 || !src) {
    return (
      <div
        className={
          brokenClassName ??
          'flex h-full min-h-[120px] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-violet-50 px-3 text-center'
        }
        role="img"
        aria-label={alt}
      >
        <svg className="h-10 w-10 text-slate-400" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs font-semibold text-slate-600">Certificate unavailable</span>
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
      onError={() => setTier((t) => (t === 0 ? 1 : 2))}
    />
  )
}
