import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioStore } from '../state/usePortfolioStore'
import { sectionStaggerChildGentle, sectionStaggerParent } from '../motion/micro'

type LiveTelemetry = ReturnType<typeof usePortfolioStore>['portfolio']['liveTelemetry']

function useNowInterval(ms: number) {
  const [t, setT] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setT(Date.now()), ms)
    return () => window.clearInterval(id)
  }, [ms])
  return t
}

function isoLogTs(ts: number) {
  return new Date(ts).toISOString().replace('T', ' ').slice(0, 19) + 'Z'
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

function useAutoScroll(ref: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const tick = () => {
      el.scrollTop += 0.65
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) el.scrollTop = 0
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled, ref])
}

function LogPanel({
  title,
  children,
  autoScroll,
}: {
  title: string
  children: ReactNode
  autoScroll: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  useAutoScroll(scrollRef, autoScroll)

  return (
    <motion.article
      className="flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-slate-200/95 bg-white shadow-md md:min-h-[260px]"
      whileHover={{ y: -2, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <div className="border-b border-slate-200/90 bg-slate-100 px-4 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</p>
      </div>
      <div
        ref={scrollRef}
        className="max-h-[200px] flex-1 overflow-y-auto overflow-x-auto bg-white p-4 [scrollbar-width:thin]"
      >
        <pre className="m-0 font-mono text-[11px] leading-relaxed text-slate-600 md:text-xs">
          <code className="block text-left whitespace-pre-wrap break-words sm:whitespace-pre">{children}</code>
        </pre>
      </div>
    </motion.article>
  )
}

function StatusCard({ lt }: { lt: LiveTelemetry }) {
  return (
    <motion.article
      className="flex min-h-[220px] flex-col rounded-2xl border border-slate-200/90 bg-white shadow-md ring-1 ring-emerald-500/10 md:min-h-[260px]"
      whileHover={{ y: -2, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <div className="border-b border-slate-200/90 bg-slate-100 px-4 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">{lt.statusTitle}</p>
      </div>
      <ul className="flex flex-1 flex-col gap-3 p-4 font-mono text-[11px] md:text-xs">
        {lt.statusRows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 text-left last:border-0 last:pb-0">
            <span className="font-semibold text-slate-700">{r.label}</span>
            <span className="flex items-center gap-2 text-slate-500">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
              <span className="text-emerald-700">{r.status}</span>
              <span className="hidden text-slate-400 sm:inline">{r.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function LiveSystemTelemetrySection() {
  const { portfolio } = usePortfolioStore()
  const lt = portfolio.liveTelemetry
  const now = useNowInterval(1000)
  const reducedMotion = useReducedMotion()
  const scroll = !reducedMotion

  const serverLog = useMemo(() => {
    const body = lt.runtimeLogEntries
      .map((e) => `[${isoLogTs(now - e.offsetMs)}] ${e.message}`)
      .join('\n')
    return `${body}\n[${isoLogTs(now)}] ${lt.liveTailMessage}`
  }, [now, lt])

  return (
    <section
      id="telemetry"
      aria-labelledby="telemetry-heading"
      className="scroll-mt-4 border-t border-slate-200/90 bg-white px-4 py-14 md:px-10 md:py-16 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionStaggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="flex flex-col"
        >
          <motion.div variants={sectionStaggerChildGentle} className="text-left">
            <h2 id="telemetry-heading" className="heading-support text-slate-950">
              {lt.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{lt.subtitle}</p>
            <p className="mt-2 max-w-xl text-[11px] leading-relaxed text-slate-400 md:text-xs">{lt.disclaimer}</p>
          </motion.div>

          {lt.logsIntro?.trim() ? (
            <motion.p
              variants={sectionStaggerChildGentle}
              className="mt-8 max-w-3xl text-sm font-semibold leading-snug text-slate-800 md:mt-9 md:text-base"
            >
              {lt.logsIntro}
            </motion.p>
          ) : null}

          <motion.div variants={sectionStaggerChildGentle} className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3 md:gap-6">
            <LogPanel title={lt.terminalTitle} autoScroll={scroll}>
              <>
                {lt.terminalBody}
                <span className="telemetry-cursor-blink inline-block h-[1.1em] w-2 translate-y-[0.1em] bg-slate-800 align-middle" aria-hidden />
              </>
            </LogPanel>
            <LogPanel title={lt.serverTitle} autoScroll={scroll}>
              <>
                {serverLog}
                {'\n'}
                <span className="telemetry-cursor-blink inline-block h-[1.1em] w-2 translate-y-[0.1em] bg-slate-700 align-middle" aria-hidden />
              </>
            </LogPanel>
            <div className="min-w-0">
              <StatusCard lt={lt} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
