import { motion } from 'framer-motion'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  /** Shown when `src` fails to load (e.g. missing `public/headshot.png`) */
  fallbackInitials: string
  /** Small circle for tight UI; medium rounded frame for hero column */
  variant?: 'compact' | 'featured'
}

export default function HeroHeadshot({ src, alt, fallbackInitials, variant = 'featured' }: Props) {
  const [ok, setOk] = useState(true)

  const frameClass =
    variant === 'compact'
      ? 'shrink-0 [transform-origin:center]'
      : 'w-full max-w-[200px] shrink-0 sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] [transform-origin:center]'

  return (
    <motion.div
      className={frameClass}
      initial={{ opacity: 0, y: variant === 'compact' ? 6 : 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.06 }}
      whileHover={variant === 'featured' ? { scale: 1.03, transition: { duration: 0.22, ease: 'easeOut' } } : undefined}
    >
      {ok ? (
        <img
          src={src}
          alt={alt}
          width={variant === 'compact' ? 72 : 520}
          height={variant === 'compact' ? 72 : 650}
          decoding="async"
          loading="eager"
          fetchPriority={variant === 'compact' ? 'low' : 'high'}
          onError={() => setOk(false)}
          className={
            variant === 'compact'
              ? 'h-14 w-14 select-none rounded-full border border-white/10 bg-zinc-100 object-cover object-center shadow-md md:h-[72px] md:w-[72px]'
              : 'aspect-[4/5] w-full select-none rounded-2xl border border-white/10 bg-zinc-100 object-cover object-top shadow-md md:rounded-3xl md:shadow-lg'
          }
        />
      ) : (
        <div
          className={
            variant === 'compact'
              ? 'flex h-14 w-14 select-none items-center justify-center rounded-full border border-violet-200/80 bg-gradient-to-br from-violet-100 to-slate-100 text-sm font-bold text-violet-900 shadow-md md:h-[72px] md:w-[72px] md:text-base'
              : 'flex aspect-[4/5] w-full select-none items-center justify-center rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-100 via-white to-slate-100 text-3xl font-bold tracking-tight text-violet-900 shadow-md md:rounded-3xl md:text-4xl md:shadow-lg'
          }
          role="img"
          aria-label={alt}
        >
          {fallbackInitials.slice(0, 3)}
        </div>
      )}
    </motion.div>
  )
}
