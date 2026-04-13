import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolioProgress } from '../../state/usePortfolioProgress'
import type { MutablePortfolioConfig } from '../../state/usePortfolioStore'
import { usePortfolioStore } from '../../state/usePortfolioStore'
import { scrollToId } from '../../utils/scrollToId'
import { springSnappy } from '../../motion/micro'
import { sfxTick } from '../../utils/sfx'

type CommandItem =
  | {
      id: string
      kind: 'nav'
      title: string
      subtitle: string
      sectionId: string
      haystack: string
      badge: string
    }
  | {
      id: string
      kind: 'link'
      title: string
      subtitle: string
      href: string
      haystack: string
      badge: string
    }
  | {
      id: string
      kind: 'action'
      title: string
      subtitle: string
      action: 'unlock-all' | 'architecture' | 'show-systems' | 'why-hire'
      haystack: string
      badge: string
    }
  | {
      id: string
      kind: 'project'
      title: string
      subtitle: string
      projectId: string
      haystack: string
      badge: string
    }

const SHOW_ADMIN_IN_PALETTE =
  import.meta.env.DEV || String(import.meta.env.VITE_SHOW_ADMIN_IN_PALETTE ?? '') === '1'

/** Power commands first — reads like a dev CLI when palette opens. */
function buildStaticCommands(pc: MutablePortfolioConfig): CommandItem[] {
  const list: CommandItem[] = [
  {
    id: 'act-architecture',
    kind: 'action',
    title: 'show architecture',
    subtitle: 'Progress map · project graph · unlocks',
    action: 'architecture',
    haystack:
      'show architecture architecture map diagram graph system map explore unlocks progress visual portfolio:focus',
    badge: 'run',
  },
  {
    id: 'link-github',
    kind: 'link',
    title: 'open github',
    subtitle: `${pc.profile.githubUsername} · new tab`,
    href: pc.profile.contact.github,
    haystack: 'open github view github repository code profile git remote',
    badge: 'url',
  },
  {
    id: 'link-certifications-page',
    kind: 'link',
    title: 'open certifications page',
    subtitle: 'Full grid · credentials',
    href: pc.certificationSection.viewAllOnPagePath,
    haystack: 'certifications page credentials grid aws azure badges route',
    badge: 'url',
  },
  {
    id: 'act-show-systems',
    kind: 'action',
    title: 'show systems',
    subtitle: 'Engineering stack & systems depth',
    action: 'show-systems',
    haystack:
      'show systems engineering stack depth backend infrastructure automation observability where engineering section',
    badge: 'run',
  },
  {
    id: 'act-why-hire',
    kind: 'action',
    title: 'why hire me',
    subtitle: 'One-line pitch · full-screen card',
    action: 'why-hire',
    haystack:
      'why hire me hire pitch elevator value recruit interview why you should reasons stamp differentiator',
    badge: 'run',
  },
  {
    id: 'nav-engineering-stack',
    kind: 'nav',
    title: 'go engineering',
    subtitle: 'Engineering stack & systems',
    sectionId: 'engineering',
    haystack: 'engineering stack systems backend infrastructure docker aws postgres supabase',
    badge: 'go',
  },
  {
    id: 'act-unlock-all',
    kind: 'action',
    title: 'unlock all',
    subtitle: 'Grant full case study access (palette)',
    action: 'unlock-all',
    haystack: 'unlock all projects access dev cheat grant keys',
    badge: 'run',
  },
  {
    id: 'nav-projects',
    kind: 'nav',
    title: 'go projects',
    subtitle: 'Flagship case studies',
    sectionId: 'projects',
    haystack: 'go to projects jump projects work portfolio case studies',
    badge: 'go',
  },
  {
    id: 'nav-more-experiments',
    kind: 'nav',
    title: 'go experiments',
    subtitle: 'Public GitHub depth',
    sectionId: 'more-experiments',
    haystack: 'more experiments github repos labs exploration backend automation ai',
    badge: 'go',
  },
  {
    id: 'nav-contact',
    kind: 'nav',
    title: 'go contact',
    subtitle: 'Hire / collaborate',
    sectionId: 'contact',
    haystack: 'go to contact email hire message',
    badge: 'go',
  },
  {
    id: 'nav-what-i-do',
    kind: 'nav',
    title: 'go what i do',
    subtitle: 'Stack · live telemetry',
    sectionId: 'what-i-do',
    haystack: 'go to about intro what i do tech stack primary secondary fastapi',
    badge: 'go',
  },
  {
    id: 'nav-live-telemetry',
    kind: 'nav',
    title: 'go telemetry',
    subtitle: 'Live logs · deploy output',
    sectionId: 'telemetry',
    haystack: 'telemetry logs deployment live system terminal server output monitoring',
    badge: 'go',
  },
  {
    id: 'nav-work-with-me',
    kind: 'nav',
    title: 'go work with me',
    subtitle: 'Teams · shipped systems',
    sectionId: 'work-with-me',
    haystack: 'work with me hire collaborate teams shipped backend',
    badge: 'go',
  },
  {
    id: 'nav-certifications',
    kind: 'nav',
    title: 'go certs',
    subtitle: 'Credentials · proofs · verification',
    sectionId: 'certifications',
    haystack: 'certifications credentials aws azure devops expertise badges',
    badge: 'go',
  },
  {
    id: 'nav-explore',
    kind: 'nav',
    title: 'go progress',
    subtitle: 'XP · tiers · unlock graph',
    sectionId: 'explore',
    haystack: 'progress unlocks xp level gamification',
    badge: 'go',
  },
]

  if (SHOW_ADMIN_IN_PALETTE) {
    list.push({
      id: 'link-admin',
      kind: 'link',
      title: 'open admin',
      subtitle: 'Edit content (this browser)',
      href: '/admin',
      haystack: 'admin panel edit portfolio local storage cms',
      badge: 'url',
    })
  }

  return list
}

type PaletteRow = { type: 'header'; id: string; label: string } | { type: 'item'; item: CommandItem }

function groupCommandsForPalette(items: CommandItem[]): PaletteRow[] {
  const nav = items.filter((i) => i.kind === 'nav')
  const projects = items.filter((i) => i.kind === 'project')
  const rest = items.filter((i) => i.kind !== 'nav' && i.kind !== 'project')
  const rows: PaletteRow[] = []
  if (nav.length) {
    rows.push({ type: 'header', id: 'h-nav', label: 'Navigation' })
    nav.forEach((item) => rows.push({ type: 'item', item }))
  }
  if (projects.length) {
    rows.push({ type: 'header', id: 'h-projects', label: 'Projects' })
    projects.forEach((item) => rows.push({ type: 'item', item }))
  }
  if (rest.length) {
    rows.push({ type: 'header', id: 'h-commands', label: 'Commands' })
    rest.forEach((item) => rows.push({ type: 'item', item }))
  }
  return rows
}

function score(haystack: string, q: string) {
  const h = haystack.toLowerCase()
  const query = q.toLowerCase().trim()
  if (!query) return 1
  if (h === query) return 100
  if (h.startsWith(query)) return 50
  const idx = h.indexOf(query)
  if (idx >= 0) return 25 - idx * 0.05
  return 0
}

function openExploreSection() {
  window.setTimeout(() => {
    const el = document.getElementById('explore')
    if (el instanceof HTMLDetailsElement) {
      el.open = true
    }
    scrollToId('explore')
  }, 0)
}

function goToSection(sectionId: string) {
  window.setTimeout(() => scrollToId(sectionId), 0)
}

function focusProjectInPage(projectId: string) {
  goToSection('projects')
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('portfolio:focus-project', { detail: { projectId } }))
  }, 140)
}

function runItem(
  item: CommandItem,
  ctx: {
    onClose: () => void
    unlockAllProjects: () => void
    navigate: (to: string) => void
  },
) {
  const { onClose, unlockAllProjects, navigate } = ctx
  onClose()

  switch (item.kind) {
    case 'nav':
      if (item.sectionId === 'explore') {
        openExploreSection()
        return
      }
      goToSection(item.sectionId)
      return
    case 'link':
      if (item.href.startsWith('/') && !item.href.startsWith('//')) {
        navigate(item.href)
        return
      }
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    case 'action':
      if (item.action === 'show-systems') {
        goToSection('engineering')
        return
      }
      if (item.action === 'why-hire') {
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent('portfolio:hire-pitch'))
        }, 260)
        return
      }
      if (item.action === 'unlock-all') {
        unlockAllProjects()
        return
      }
      if (item.action === 'architecture') {
        openExploreSection()
        return
      }
      return
    case 'project':
      focusProjectInPage(item.projectId)
      return
    default:
      return
  }
}

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const navigate = useNavigate()
  const { portfolio, projects } = usePortfolioStore()
  const { commandPalette: cp } = portfolio
  const { unlockAllProjects } = usePortfolioProgress()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  const items = useMemo(() => {
    const projectItems: CommandItem[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      kind: 'project' as const,
      title: p.title,
      subtitle: `${p.category} · +${p.xpReward} XP · L${p.levelRequired}`,
      projectId: p.id,
      haystack: `${p.title} ${p.tagline} ${p.category} project open focus`,
      badge: 'open',
    }))
    return [...buildStaticCommands(portfolio), ...projectItems]
  }, [portfolio, projects])

  const visibleLimit = 24

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    return [...items]
      .map((it) => ({
        it,
        s: Math.max(score(it.haystack, query), score(it.title, query), score(it.subtitle, query)),
      }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.it)
  }, [items, query])

  const limited = useMemo(() => filtered.slice(0, visibleLimit), [filtered])

  const groupedRows = useMemo(() => {
    if (query.trim()) return null
    return groupCommandsForPalette(limited)
  }, [query, limited])

  const selectable = useMemo(() => {
    if (groupedRows) return groupedRows.filter((r): r is Extract<PaletteRow, { type: 'item' }> => r.type === 'item').map((r) => r.item)
    return limited
  }, [groupedRows, limited])

  useEffect(() => {
    if (!open) return
    setActiveIdx(0)
  }, [open, query])

  useEffect(() => {
    if (!open || selectable.length === 0) return
    setActiveIdx((i) => Math.min(i, selectable.length - 1))
  }, [open, selectable.length])

  useEffect(() => {
    if (!open) return
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        sfxTick()
        setActiveIdx((i) => {
          if (selectable.length === 0) return 0
          return Math.min(selectable.length - 1, i + 1)
        })
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        sfxTick()
        setActiveIdx((i) => {
          if (selectable.length === 0) return 0
          return Math.max(0, i - 1)
        })
        return
      }
      if (e.key === 'Home') {
        e.preventDefault()
        sfxTick()
        setActiveIdx(0)
        return
      }
      if (e.key === 'End') {
        e.preventDefault()
        sfxTick()
        setActiveIdx(selectable.length === 0 ? 0 : selectable.length - 1)
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const picked = selectable[activeIdx]
        if (!picked) return
        runItem(picked, { onClose, unlockAllProjects, navigate })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, selectable, activeIdx, onClose, unlockAllProjects, navigate])

  useEffect(() => {
    if (!open || selectable.length === 0) return
    const root = listRef.current
    if (!root) return
    const row = root.querySelector(`[data-palette-idx="${activeIdx}"]`)
    row?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [open, activeIdx, selectable])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const ctx = { onClose, unlockAllProjects, navigate }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          data-cmd-palette-hint-safe
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 px-3 pt-[min(12vh,6.5rem)] pb-8 md:px-6 md:pt-[min(14vh,7.5rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="w-full max-w-xl overflow-x-hidden rounded-2xl border border-zinc-700/90 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(139,92,246,0.09)]"
            initial={{ y: 14, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.985 }}
            transition={springSnappy}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={cp.ariaLabel}
          >
            <div className="flex items-center gap-3 border-b border-zinc-800/90 bg-zinc-900/85 px-4 py-3 md:px-4">
              <span className="hidden text-violet-400/90 sm:inline" aria-hidden>
                <span className="select-none text-sm font-mono leading-none">≡</span>
              </span>
              <span className="hidden sm:inline text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-500">
                {cp.shortcutDesktop}
              </span>
              <span className="sm:hidden text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-500">
                {cp.shortcutMobile}
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={cp.inputPlaceholder}
                className="flex-1 bg-transparent py-1 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                aria-label={cp.inputAriaLabel}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="hidden shrink-0 text-[10px] font-mono text-zinc-500 sm:inline">{cp.escKeyHint}</span>
            </div>

            <div
              ref={listRef}
              className="max-h-[min(55vh,440px)] overflow-y-auto overscroll-contain [scrollbar-width:thin]"
            >
              {groupedRows
                ? (() => {
                    let rowIdx = 0
                    return groupedRows.map((row) => {
                      if (row.type === 'header') {
                        return (
                          <div
                            key={row.id}
                            className="border-b border-zinc-800/60 bg-zinc-900/40 px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-500"
                          >
                            {row.label}
                          </div>
                        )
                      }
                      const idx = rowIdx++
                      const it = row.item
                      return (
                        <button
                          key={it.id}
                          type="button"
                          data-palette-idx={idx}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => runItem(it, ctx)}
                          className={[
                            'flex w-full border-b border-zinc-800/80 py-2.5 pl-3 pr-4 text-left transition-[background-color,border-color,transform] duration-150 last:border-b-0',
                            idx === activeIdx
                              ? 'border-l-2 border-l-violet-500 bg-violet-500/[0.12] [box-shadow:inset_0_0_0_1px_rgba(139,92,246,0.12)]'
                              : 'border-l-2 border-l-transparent hover:bg-zinc-800/55 active:scale-[0.998]',
                          ].join(' ')}
                        >
                          <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate font-mono text-[13px] font-medium tracking-tight text-zinc-100">
                                {it.title}
                              </div>
                              <div className="mt-0.5 text-xs leading-snug text-zinc-500">{it.subtitle}</div>
                            </div>
                            <span className="shrink-0 rounded border border-zinc-700/90 bg-zinc-900/90 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wide text-zinc-400">
                              {it.badge}
                            </span>
                          </div>
                        </button>
                      )
                    })
                  })()
                : selectable.map((it, idx) => (
                    <button
                      key={it.id}
                      type="button"
                      data-palette-idx={idx}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => runItem(it, ctx)}
                      className={[
                        'flex w-full border-b border-zinc-800/80 py-2.5 pl-3 pr-4 text-left transition-[background-color,border-color,transform] duration-150 last:border-b-0',
                        idx === activeIdx
                          ? 'border-l-2 border-l-violet-500 bg-violet-500/[0.12] [box-shadow:inset_0_0_0_1px_rgba(139,92,246,0.12)]'
                          : 'border-l-2 border-l-transparent hover:bg-zinc-800/55 active:scale-[0.998]',
                      ].join(' ')}
                    >
                      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate font-mono text-[13px] font-medium tracking-tight text-zinc-100">
                            {it.title}
                          </div>
                          <div className="mt-0.5 text-xs leading-snug text-zinc-500">{it.subtitle}</div>
                        </div>
                        <span className="shrink-0 rounded border border-zinc-700/90 bg-zinc-900/90 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wide text-zinc-400">
                          {it.badge}
                        </span>
                      </div>
                    </button>
                  ))}
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center font-mono text-sm text-zinc-500">{cp.emptyState}</div>
              ) : null}
            </div>

            <div className="border-t border-zinc-800/90 bg-zinc-900/55 px-4 py-2">
              <p className="text-center text-[10px] font-mono leading-relaxed text-zinc-600">{cp.footerHint}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
