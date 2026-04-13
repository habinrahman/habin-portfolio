import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SYSTEMS_BUILT } from '../data/systemsBuilt'
import { sfxTick } from '../utils/sfx'
import { cn } from '../utils/cn'

function SystemCard({ item }: { item: (typeof SYSTEMS_BUILT)[number] }) {
  return (
    <motion.article
      className="flex h-full flex-col rounded-lg border border-slate-200/80 bg-white/90 px-4 py-3.5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-slate-300/90 hover:shadow md:px-4 md:py-3.5"
      whileHover={{ y: -2, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-slate-900 md:text-base">{item.name}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600 md:text-sm">{item.description}</p>
      <p className="mt-auto pt-3 text-[11px] font-medium text-slate-500 md:text-xs">{item.tech.join(' · ')}</p>
    </motion.article>
  )
}

export default function SystemsBuiltSection() {
  const [spotlight, setSpotlight] = useState(false)

  useEffect(() => {
    let clearSpotlight: ReturnType<typeof setTimeout> | undefined
    const onSpotlight = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id
      if (id !== 'systems-built') return
      if (clearSpotlight) window.clearTimeout(clearSpotlight)
      setSpotlight(true)
      clearSpotlight = window.setTimeout(() => setSpotlight(false), 2800)
    }
    window.addEventListener('portfolio:section-spotlight', onSpotlight)
    return () => {
      window.removeEventListener('portfolio:section-spotlight', onSpotlight)
      if (clearSpotlight) window.clearTimeout(clearSpotlight)
    }
  }, [])

  useEffect(() => {
    if (!spotlight) return
    sfxTick()
  }, [spotlight])

  return (
    <section
      id="systems-built"
      aria-labelledby="systems-built-heading"
      className={cn(
        'scroll-mt-4 border-t border-slate-200/60 bg-zinc-50/40 px-4 py-12 transition-[background-color] duration-500 md:px-8 md:py-14',
        spotlight ? 'systems-built-spotlight rounded-none bg-white/95 md:rounded-sm' : '',
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center md:max-w-3xl">
          <h2 id="systems-built-heading" className="heading-support">
            Systems I&apos;ve Built
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:mt-4 md:text-base">
            More systems than the featured case studies — tools and experiments that still ship.
          </p>
        </div>

        <ul
          className="mt-8 grid list-none grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4"
          role="list"
        >
          {SYSTEMS_BUILT.map((item) => (
            <li key={item.id}>
              <SystemCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
