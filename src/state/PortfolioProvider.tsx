import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Project } from '../data/types'
import { clamp } from '../utils/math'
import { readJsonFromStorage, writeJsonToStorage } from '../utils/storage'
import { usePortfolioStore } from './usePortfolioStore'
import { PortfolioProgressContext } from './PortfolioContext'
import type { PortfolioProgressContextValue } from './PortfolioContext'
import { sfxUnlock } from '../utils/sfx'

const STORAGE_KEY = 'habin_portfolio_progress_v1'

type PersistedProgress = {
  version: 1
  unlockedProjectIds: string[]
  scrollEarnedXp: number
  bestScrollProgress: number // 0..1 monotonic
  bonusXp: number
  fullScrollUnlocked: boolean
}

type ProgressState = {
  unlockedProjectIds: string[]
  scrollEarnedXp: number
  bestScrollProgress: number
  bonusXp: number
  fullScrollUnlocked: boolean
}

const LEVEL_THRESHOLDS: number[] = [
  0, // L1
  200, // L2
  400, // L3
  700, // L4
  1100, // L5
]

function computeLevel(totalXp: number): { level: 1 | 2 | 3 | 4 | 5; current: number; next: number } {
  if (totalXp >= LEVEL_THRESHOLDS[4]) return { level: 5, current: LEVEL_THRESHOLDS[4], next: Infinity }
  if (totalXp >= LEVEL_THRESHOLDS[3]) return { level: 4, current: LEVEL_THRESHOLDS[3], next: LEVEL_THRESHOLDS[4] }
  if (totalXp >= LEVEL_THRESHOLDS[2]) return { level: 3, current: LEVEL_THRESHOLDS[2], next: LEVEL_THRESHOLDS[3] }
  if (totalXp >= LEVEL_THRESHOLDS[1]) return { level: 2, current: LEVEL_THRESHOLDS[1], next: LEVEL_THRESHOLDS[2] }
  return { level: 1, current: LEVEL_THRESHOLDS[0], next: LEVEL_THRESHOLDS[1] }
}

function readInitialProgress(): ProgressState {
  const persisted = readJsonFromStorage<PersistedProgress>(STORAGE_KEY)
  if (!persisted || persisted.version !== 1) {
    return {
      unlockedProjectIds: [],
      scrollEarnedXp: 0,
      bestScrollProgress: 0,
      bonusXp: 0,
      fullScrollUnlocked: false,
    }
  }

  return {
    unlockedProjectIds: Array.isArray(persisted.unlockedProjectIds) ? persisted.unlockedProjectIds : [],
    scrollEarnedXp: Number.isFinite(persisted.scrollEarnedXp) ? persisted.scrollEarnedXp : 0,
    bestScrollProgress: Number.isFinite(persisted.bestScrollProgress) ? persisted.bestScrollProgress : 0,
    bonusXp: Number.isFinite(persisted.bonusXp) ? persisted.bonusXp : 0,
    fullScrollUnlocked: Boolean(persisted.fullScrollUnlocked),
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { projects } = usePortfolioStore()
  const projectById = useMemo(
    () => projects.reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, Project>),
    [projects],
  )

  const [progress, setProgress] = useState<ProgressState>(() => readInitialProgress())
  const [lastUnlockedProjectId, setLastUnlockedProjectId] = useState<string | null>(null)

  const bestScrollProgressRef = useRef(progress.bestScrollProgress)
  useEffect(() => {
    bestScrollProgressRef.current = progress.bestScrollProgress
  }, [progress.bestScrollProgress])

  // Keep scroll earned XP monotonic with a best-progress approach.
  useEffect(() => {
    let rafId: number | null = null

    const onScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null

        const doc = document.documentElement
        const scrollTop = window.scrollY || doc.scrollTop || 0
        const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight)
        const scrollProgress = clamp(scrollTop / maxScroll, 0, 1)

        // Earn based on maximum progress seen so far.
        if (scrollProgress <= bestScrollProgressRef.current + 1e-6) return

        const scrollMaxXp = 700
        const earnedXpCandidate = Math.floor(scrollProgress * scrollMaxXp)

        bestScrollProgressRef.current = scrollProgress
        setProgress((prev) => ({
          ...prev,
          bestScrollProgress: scrollProgress,
          scrollEarnedXp: earnedXpCandidate,
          fullScrollUnlocked: prev.fullScrollUnlocked || scrollProgress >= 0.999,
        }))
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  // Persist progress (debounced via a small timeout).
  const persistTimeout = useRef<number | null>(null)
  useEffect(() => {
    if (persistTimeout.current) window.clearTimeout(persistTimeout.current)
    persistTimeout.current = window.setTimeout(() => {
      const payload: PersistedProgress = {
        version: 1,
        unlockedProjectIds: progress.unlockedProjectIds,
        scrollEarnedXp: progress.scrollEarnedXp,
        bestScrollProgress: progress.bestScrollProgress,
        bonusXp: progress.bonusXp,
        fullScrollUnlocked: progress.fullScrollUnlocked,
      }
      writeJsonToStorage<PersistedProgress>(STORAGE_KEY, payload)
    }, 250)

    return () => {
      if (persistTimeout.current) window.clearTimeout(persistTimeout.current)
    }
  }, [progress])

  const xpBase = useMemo(() => {
    let sum = 0
    for (const id of progress.unlockedProjectIds) {
      const p = projectById[id]
      if (p) sum += p.xpReward
    }
    return sum
  }, [progress.unlockedProjectIds, projectById])

  const totalXp = xpBase + progress.scrollEarnedXp + progress.bonusXp

  const levelInfo = computeLevel(totalXp)
  const level = levelInfo.level
  const currentLevelXp = levelInfo.current
  const nextLevelXp = levelInfo.next
  const levelProgress = Number.isFinite(nextLevelXp)
    ? clamp((totalXp - currentLevelXp) / Math.max(1e-6, nextLevelXp - currentLevelXp), 0, 1)
    : 1

  const badges = useMemo(() => {
    const list = [
      {
        id: 'backend-architect' as const,
        title: 'Backend Architect',
        description: 'Designs resilient systems with strong contracts and observability.',
        thresholdXp: 350,
      },
      {
        id: 'cloud-engineer' as const,
        title: 'Cloud Engineer',
        description: 'Deploys and runs backend systems on real cloud infrastructure.',
        thresholdXp: 500,
      },
      {
        id: 'automation-engineer' as const,
        title: 'Automation Engineer',
        description: 'Builds repeatable workflows that reduce toil and incidents.',
        thresholdXp: 650,
      },
      {
        id: 'systems-thinker' as const,
        title: 'Systems Thinker',
        description: 'Optimizes for reliability, trade-offs, and end-to-end impact.',
        thresholdXp: 950,
      },
    ]
    return list.map((b) => ({ ...b, unlocked: totalXp >= b.thresholdXp }))
  }, [totalXp])

  const lastBonusAtRef = useRef(0)

  const ctxValue: PortfolioProgressContextValue = useMemo(
    () => ({
      unlockedProjectIds: progress.unlockedProjectIds,
      xpBase,
      scrollEarnedXp: progress.scrollEarnedXp,
      bonusXp: progress.bonusXp,
      totalXp,
      bestScrollProgress: progress.bestScrollProgress,
      fullScrollUnlocked: progress.fullScrollUnlocked,
      level,
      levelProgress,
      currentLevelXp,
      nextLevelXp,
      badges,
      isProjectUnlocked: (projectId: string) => progress.unlockedProjectIds.includes(projectId),
      unlockProject: (projectId: string) => {
        const project = projectById[projectId]
        if (!project) return { unlockedNow: false, reason: 'Unknown project.' }
        if (progress.unlockedProjectIds.includes(projectId)) return { unlockedNow: false }

        // Allow unlocking once the user has reached the required level.
        if (level < project.levelRequired) {
          return { unlockedNow: false, reason: `Requires Level ${project.levelRequired}.` }
        }

        setProgress((prev) => {
          if (prev.unlockedProjectIds.includes(projectId)) return prev
          return { ...prev, unlockedProjectIds: [...prev.unlockedProjectIds, projectId] }
        })

        sfxUnlock()
        setLastUnlockedProjectId(projectId)
        window.setTimeout(() => {
          setLastUnlockedProjectId((prev) => (prev === projectId ? null : prev))
        }, 1600)

        return { unlockedNow: true }
      },
      unlockAllProjects: () => {
        const allIds = projects.map((p) => p.id)
        setProgress((prev) => ({ ...prev, unlockedProjectIds: allIds }))
        sfxUnlock()
        const last = allIds[allIds.length - 1] ?? null
        if (last) {
          setLastUnlockedProjectId(last)
          window.setTimeout(() => {
            setLastUnlockedProjectId((prev) => (prev === last ? null : prev))
          }, 1600)
        }
      },
      grantBonusXp: (amount: number, _source: 'logo' | 'easter-egg') => {
        const now = Date.now()
        const cooldown = _source === 'logo' ? 1200 : 2000
        if (now - lastBonusAtRef.current < cooldown) {
          return { granted: false, reason: 'Cooldown.' }
        }
        lastBonusAtRef.current = now
        const add = Math.max(1, Math.floor(amount))
        setProgress((prev) => ({ ...prev, bonusXp: prev.bonusXp + add }))
        return { granted: true }
      },
      lastUnlockedProjectId,
    }),
    [
      progress.unlockedProjectIds,
      progress.scrollEarnedXp,
      progress.bonusXp,
      progress.bestScrollProgress,
      progress.fullScrollUnlocked,
      xpBase,
      totalXp,
      level,
      currentLevelXp,
      nextLevelXp,
      levelProgress,
      lastUnlockedProjectId,
      badges,
      projectById,
      projects,
    ],
  )

  return <PortfolioProgressContext.Provider value={ctxValue}>{children}</PortfolioProgressContext.Provider>
}

