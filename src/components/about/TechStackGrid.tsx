import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioStore } from '../../state/usePortfolioStore'
import { hoverLiftSubtle, springSnappy } from '../../motion/micro'

const ICONS: Record<string, ReactNode> = {
  fastapi: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#0ea5e9" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M12 2 4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4Z" fill="#3ecf8e" fillOpacity={0.9} />
      <path d="M12 22V10l8-4v10c0 4.5-3.2 8.7-8 10Z" fill="#1f7a4d" fillOpacity={0.35} />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <path
        d="M12 3c-4 0-7 2.2-7 6v7.5c0 1.1.9 2 2 2h1V11h2v13.5c1.7.5 3.4.5 4 0V11h2v7.5h1c1.1 0 2-.9 2-2V9c0-3.8-3-6-7-6Z"
        fill="#336791"
      />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <path
        d="M4 10h2v2H4v-2zm4-2h2v2H8V8zm0 4h2v2H8v-2zm0 4h2v2H8v-2zm4-8h2v2h-2V8zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z"
        fill="#0ea5e9"
      />
      <path d="M20 14v2h-2v2h-8v-6h10z" fill="#38bdf8" />
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M6.5 12.5l2 3.5h-4l2-3.5zm5.5-6L8 17h3l4-10.5h-3zm6.5 3.5L18 17h-3l1.5-6.5h2.5z" fill="#f59e0b" />
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <ellipse cx="12" cy="5" rx="7" ry="2.5" fill="#0ea5e9" />
      <path d="M5 5v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" stroke="#0369a1" strokeWidth="1.2" fill="none" />
      <path d="M5 10v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-3" stroke="#0369a1" strokeWidth="1.2" fill="none" />
      <path d="M5 15v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-3" stroke="#0369a1" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <ellipse cx="12" cy="12" rx="2" ry="2" fill="#0ea5e9" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <path
        d="M8.85 18.5s-.85.5.6.67c1.75.2 2.65.17 4.58-.19 0 0 .51.32 1.22.6-4.33 1.85-9.8-.11-6.4-1.08zm-.51-2.35s-.95.7.5.84c1.87.2 3.35.22 5.9-.3 0 0 .35.36.91.55-5.24 1.53-11.08.12-7.31-1.09z"
        fill="#64748b"
      />
      <path
        d="M14.35 10.2c1.06 1.2-.27 2.28-.27 2.28s2.65-1.37 1.44-3.09c-1.15-1.64-2.03-2.45 2.74-5.25 0 0-7.48 1.87-4.91 6.06z"
        fill="#94a3b8"
      />
      <path
        d="M18.65 16.55s.62.51-.68.91c-2.47.75-10.28.97-12.45.03-.78-.34.68-.81 1.14-.91.48-.11.75-.09.75-.09-.86-.61-5.57 1.19-2.39 1.7 8.67 1.41 15.8-.63 13.63-1.64zM9.55 13.4s-3.95.94-1.4 1.28c1.08.14 3.22.11 5.22-.05 1.63-.13 3.27-.41 3.27-.41s-.58.25-.99.54c-4 1.05-11.73.56-9.5-.51 1.9-.91 3.4-.85 3.4-.85zm4.65-3.65c2.28-2.36-1.22-4.56-.53-3.38 1.55 2.65-1.55 3.18-.53 3.38.01 0 .07-.05.53-.38.46.33.53.38.53.38z"
        fill="#475569"
      />
    </svg>
  ),
  spring: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
      <path
        d="M12 3c-4.5 0-8 3.2-8 7.2 0 2.2 1.1 4.2 2.9 5.5-.2-1.5.1-3.1 1-4.4.1-.1.2-.2.3-.3 0 0 .1 0 .1.1.8 2.2 2.8 3.8 5.1 4.2.1 0 .2-.1.2-.2v-.8c0-.4-.1-.8-.3-1.1-.1-.2-.3-.4-.5-.5-.2-.2-.4-.4-.5-.7-.3-.6-.4-1.3-.2-2 .1-.3.3-.6.5-.8.4-.4 1-.6 1.6-.5.3 0 .6.2.8.4.2.2.3.5.3.8 0 .3-.1.6-.3.8-.2.2-.5.4-.8.4h-.2c-.1 0-.2.1-.2.2 0 .1 0 .2.1.3.3.2.6.4.8.7.4.5.6 1.1.6 1.8v.5c0 .1.1.2.2.2 2.3-.4 4.3-2 5.1-4.2 0-.1.1-.1.2-.1.1.1.2.2.3.3.9 1.3 1.2 2.9 1 4.4 1.8-1.3 2.9-3.3 2.9-5.5C20 6.2 16.5 3 12 3z"
        fill="#22c55e"
      />
    </svg>
  ),
}

function FallbackGlyph({ label }: { label: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600" aria-hidden>
      {label.slice(0, 2).toUpperCase()}
    </div>
  )
}

function StackRow({ label, entries }: { label: string; entries: readonly { id: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {entries.map(({ id, label: techLabel }) => (
          <motion.div
            key={id}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200/90 bg-white py-4 px-2 shadow-sm cursor-default"
            whileHover={hoverLiftSubtle}
            whileTap={{ scale: 0.99 }}
            transition={springSnappy}
          >
            {ICONS[id] ?? <FallbackGlyph label={techLabel} />}
            <span className="text-center text-xs font-semibold text-slate-700">{techLabel}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function TechStackGrid() {
  const { portfolio } = usePortfolioStore()
  const tc = portfolio.techStack
  return (
    <div className="mt-10 space-y-8">
      <StackRow label={tc.primarySectionLabel} entries={tc.primary} />
      <StackRow label={tc.secondarySectionLabel} entries={tc.secondary} />
    </div>
  )
}
