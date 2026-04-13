import { createContext } from 'react'

export type PortfolioProgressContextValue = {
  unlockedProjectIds: string[]
  isProjectUnlocked: (projectId: string) => boolean
  unlockProject: (projectId: string) => { unlockedNow: boolean; reason?: string }
  /** Command palette / dev: unlock every project regardless of level */
  unlockAllProjects: () => void
  grantBonusXp: (amount: number, source: 'logo' | 'easter-egg') => { granted: boolean; reason?: string }

  // XP is the sum of unlocked rewards + scroll-earned XP.
  xpBase: number
  scrollEarnedXp: number
  bonusXp: number
  totalXp: number
  bestScrollProgress: number // 0..1
  fullScrollUnlocked: boolean

  level: 1 | 2 | 3 | 4 | 5
  levelProgress: number // 0..1 towards next level
  nextLevelXp: number
  currentLevelXp: number

  // For subtle UI messaging (e.g. unlock highlight animation).
  lastUnlockedProjectId: string | null

  badges: Array<{
    id: 'backend-architect' | 'cloud-engineer' | 'automation-engineer' | 'systems-thinker'
    title: string
    description: string
    unlocked: boolean
    thresholdXp: number
  }>
}

export const PortfolioProgressContext = createContext<PortfolioProgressContextValue | null>(null)

