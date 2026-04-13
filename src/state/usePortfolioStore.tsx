import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CertificationItem } from '../config/portfolio.config'
import { portfolioConfig as defaultPortfolioConfig } from '../config/portfolio.config'
import { PROJECTS as defaultProjects } from '../data/projects'
import type { Project } from '../data/types'

export const PORTFOLIO_STORAGE_KEY = 'habin_portfolio_admin_bundle_v1'
const BUNDLE_VERSION = 1 as const

/** JSON-backed editable config (widen literal unions to primitives; strip readonly). */
export type DeepMutable<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends ReadonlyArray<infer U>
        ? Array<DeepMutable<U>>
        : T extends object
          ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
          : T

export type MutablePortfolioConfig = DeepMutable<typeof defaultPortfolioConfig>

export type PortfolioBundleV1 = {
  version: typeof BUNDLE_VERSION
  portfolio: MutablePortfolioConfig
  projects: Project[]
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function deepMerge<T extends Record<string, unknown>>(base: T, patch: Record<string, unknown>): T {
  const out = { ...base } as T
  for (const key of Object.keys(patch)) {
    const p = patch[key]
    const b = (base as Record<string, unknown>)[key]
    if (p === undefined) continue
    if (isPlainObject(p) && isPlainObject(b)) {
      ;(out as Record<string, unknown>)[key] = deepMerge(b as Record<string, unknown>, p)
    } else {
      ;(out as Record<string, unknown>)[key] = p
    }
  }
  return out
}

export function cloneDefaultPortfolioBundle(): PortfolioBundleV1 {
  return {
    version: BUNDLE_VERSION,
    portfolio: JSON.parse(JSON.stringify(defaultPortfolioConfig)) as MutablePortfolioConfig,
    projects: JSON.parse(JSON.stringify(defaultProjects)) as Project[],
  }
}

function loadStoredBundle(): PortfolioBundleV1 {
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY)
    if (!raw) return cloneDefaultPortfolioBundle()
    const parsed = JSON.parse(raw) as Partial<PortfolioBundleV1>
    const def = cloneDefaultPortfolioBundle()
    if (!parsed || typeof parsed !== 'object') return def
    if (parsed.version !== BUNDLE_VERSION) {
      return {
        version: BUNDLE_VERSION,
        portfolio: deepMerge(
          def.portfolio as unknown as Record<string, unknown>,
          (parsed.portfolio ?? {}) as Record<string, unknown>,
        ) as MutablePortfolioConfig,
        projects:
          Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : def.projects,
      }
    }
    return {
      version: BUNDLE_VERSION,
      portfolio: deepMerge(
        def.portfolio as unknown as Record<string, unknown>,
        (parsed.portfolio ?? {}) as Record<string, unknown>,
      ) as MutablePortfolioConfig,
      projects:
        Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : def.projects,
    }
  } catch {
    return cloneDefaultPortfolioBundle()
  }
}

export type PersonalPatch = Partial<{
  name: string
  title: string
  tagline: string
  email: string
  photoUrl: string
}>

export type TextContentPatch = Partial<{
  metaTitle: string
  metaDescription: string
  heroH1: string
  heroSubhead: string
  heroKicker: string
  footerLine: string
}>

export type TechStackEntry = { id: string; label: string }

export type PortfolioStoreValue = {
  portfolio: PortfolioBundleV1['portfolio']
  projects: Project[]
  updatePersonal: (patch: PersonalPatch) => void
  updateTextContent: (patch: TextContentPatch) => void
  addProject: () => string
  updateProject: (id: string, patch: Partial<Project>) => void
  removeProject: (id: string) => void
  addCertification: (item: Omit<CertificationItem, 'id'> & { id?: string }) => void
  removeCertification: (id: string) => void
  updateCertification: (id: string, patch: Partial<CertificationItem>) => void
  updateTechStack: (primary: TechStackEntry[], secondary: TechStackEntry[]) => void
  saveToStorage: () => void
  resetToDefault: () => void
  lastSavedAt: number | null
}

const PortfolioDataContext = createContext<PortfolioStoreValue | null>(null)

function newProjectSkeleton(): Project {
  const id = `project-${Date.now()}`
  return {
    id,
    title: 'new-project',
    displayTitle: 'New project',
    repoSlug: 'new-project',
    description: 'One-line summary for cards.',
    tagline: 'Short description',
    usageHighlights: ['Highlight one', 'Highlight two', 'Highlight three'],
    category: 'Backend',
    status: 'Shipped',
    lifecycleStatus: 'production',
    featured: false,
    github: '',
    demo: '',
    live: '',
    problem: 'Problem statement',
    solution: 'Solution summary',
    techStack: ['TypeScript'],
    keyFeatures: ['Feature one'],
    impact: [{ metric: '—', description: 'Impact description' }],
    engineeringDecisions: ['Decision one'],
    tradeoffs: ['Tradeoff one'],
    architectureOverview: ['Step A → Step B'],
    levelRequired: 1,
    xpReward: 100,
  }
}

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<PortfolioBundleV1>(() => loadStoredBundle())
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)

  const updatePersonal = useCallback((patch: PersonalPatch) => {
    setBundle((b) => {
      const portfolio = JSON.parse(JSON.stringify(b.portfolio)) as MutablePortfolioConfig
      if (patch.name !== undefined) portfolio.profile.name = patch.name
      if (patch.title !== undefined) portfolio.profile.title = patch.title
      if (patch.tagline !== undefined) portfolio.profile.headline = patch.tagline
      if (patch.email !== undefined) portfolio.profile.contact.email = patch.email
      if (patch.photoUrl !== undefined) portfolio.personal.photo.src = patch.photoUrl
      return { ...b, portfolio }
    })
  }, [])

  const updateTextContent = useCallback((patch: TextContentPatch) => {
    setBundle((b) => {
      const portfolio = JSON.parse(JSON.stringify(b.portfolio)) as MutablePortfolioConfig
      if (patch.metaTitle !== undefined) portfolio.meta.title = patch.metaTitle
      if (patch.metaDescription !== undefined) portfolio.meta.description = patch.metaDescription
      if (patch.heroH1 !== undefined) portfolio.hero.lines.h1 = patch.heroH1
      if (patch.heroSubhead !== undefined) portfolio.hero.lines.subhead = patch.heroSubhead
      if (patch.heroKicker !== undefined) portfolio.hero.lines.kicker = patch.heroKicker
      if (patch.footerLine !== undefined) portfolio.footer.line = patch.footerLine
      return { ...b, portfolio }
    })
  }, [])

  const addProject = useCallback(() => {
    const skeleton = newProjectSkeleton()
    setBundle((b) => ({ ...b, projects: [...b.projects, skeleton] }))
    return skeleton.id
  }, [])

  const updateProject = useCallback((id: string, patch: Partial<Project>) => {
    setBundle((b) => ({
      ...b,
      projects: b.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const removeProject = useCallback((id: string) => {
    setBundle((b) => {
      const nextProjects = b.projects.filter((p) => p.id !== id)
      const portfolio = JSON.parse(JSON.stringify(b.portfolio)) as MutablePortfolioConfig
      if (portfolio.projectsSection.featuredProjectId === id) {
        portfolio.projectsSection.featuredProjectId =
          nextProjects[0]?.id ?? portfolio.projectsSection.featuredProjectId
      }
      return { ...b, projects: nextProjects, portfolio }
    })
  }, [])

  const addCertification = useCallback((item: Omit<CertificationItem, 'id'> & { id?: string }) => {
    const id = item.id?.trim() || `cert-${Date.now()}`
    setBundle((b) => {
      const portfolio = JSON.parse(JSON.stringify(b.portfolio)) as MutablePortfolioConfig
      const row: CertificationItem = {
        id,
        title: item.title,
        image: item.image,
        category: item.category,
        ...(item.org !== undefined && item.org !== '' ? { org: item.org } : {}),
      }
      portfolio.certifications = [...portfolio.certifications, row] as MutablePortfolioConfig['certifications']
      return { ...b, portfolio }
    })
  }, [])

  const removeCertification = useCallback((id: string) => {
    setBundle((b) => {
      const portfolio = JSON.parse(JSON.stringify(b.portfolio)) as MutablePortfolioConfig
      portfolio.certifications = portfolio.certifications.filter((c) => c.id !== id)
      return { ...b, portfolio }
    })
  }, [])

  const updateCertification = useCallback((id: string, patch: Partial<CertificationItem>) => {
    setBundle((b) => {
      const portfolio = JSON.parse(JSON.stringify(b.portfolio)) as MutablePortfolioConfig
      portfolio.certifications = portfolio.certifications.map((c) =>
        c.id === id ? ({ ...c, ...patch } as CertificationItem) : c,
      ) as MutablePortfolioConfig['certifications']
      return { ...b, portfolio }
    })
  }, [])

  const updateTechStack = useCallback((primary: TechStackEntry[], secondary: TechStackEntry[]) => {
    setBundle((b) => {
      const portfolio = JSON.parse(JSON.stringify(b.portfolio)) as MutablePortfolioConfig
      portfolio.techStack = {
        ...portfolio.techStack,
        primary: primary as MutablePortfolioConfig['techStack']['primary'],
        secondary: secondary as MutablePortfolioConfig['techStack']['secondary'],
      }
      return { ...b, portfolio }
    })
  }, [])

  const saveToStorage = useCallback(() => {
    const payload: PortfolioBundleV1 = { ...bundle, version: BUNDLE_VERSION }
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(payload))
    setLastSavedAt(Date.now())
  }, [bundle])

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(PORTFOLIO_STORAGE_KEY)
    const next = cloneDefaultPortfolioBundle()
    setBundle(next)
    setLastSavedAt(null)
  }, [])

  const value = useMemo<PortfolioStoreValue>(
    () => ({
      portfolio: bundle.portfolio,
      projects: bundle.projects,
      updatePersonal,
      updateTextContent,
      addProject,
      updateProject,
      removeProject,
      addCertification,
      removeCertification,
      updateCertification,
      updateTechStack,
      saveToStorage,
      resetToDefault,
      lastSavedAt,
    }),
    [
      bundle.portfolio,
      bundle.projects,
      updatePersonal,
      updateTextContent,
      addProject,
      updateProject,
      removeProject,
      addCertification,
      removeCertification,
      updateCertification,
      updateTechStack,
      saveToStorage,
      resetToDefault,
      lastSavedAt,
    ],
  )

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>
}

export function usePortfolioStore(): PortfolioStoreValue {
  const ctx = useContext(PortfolioDataContext)
  if (!ctx) {
    throw new Error('usePortfolioStore must be used within PortfolioDataProvider')
  }
  return ctx
}

/** Read-only: use when you might be outside provider (falls back to file config). */