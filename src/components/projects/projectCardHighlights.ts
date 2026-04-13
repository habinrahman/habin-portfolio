import type { Project } from '../../data/types'

/** Prefer key features, else usage highlights — max 3, else tagline. */
export function projectCardHighlights(project: Project): string[] {
  const features = project.keyFeatures.filter(Boolean)
  const usage = project.usageHighlights.filter(Boolean)
  const pick = features.length ? features : usage
  const top = pick.slice(0, 3)
  if (top.length) return top
  return [project.tagline].filter(Boolean)
}

export function projectCardDescription(project: Project): string {
  return (project.description ?? project.tagline).trim()
}

export function projectLiveUrl(project: Project): string | undefined {
  const u = (project.live ?? project.demo ?? '').trim()
  return u || undefined
}

function normalizeUrl(u: string): string {
  return u.replace(/\/+$/, '').toLowerCase()
}

/** Demo link only when it adds something beyond the primary Live URL (avoids duplicate CTAs). */
export function projectCardDemoHref(project: Project): string | undefined {
  const demo = (project.demo ?? '').trim()
  if (!demo) return undefined
  const live = (project.live ?? '').trim()
  if (live && normalizeUrl(live) === normalizeUrl(demo)) return undefined
  return demo
}

export function projectRepoSlug(project: Project): string {
  if (project.repoSlug?.trim()) return project.repoSlug.trim()
  const url = project.github?.trim()
  if (url) {
    const m = url.match(/github\.com\/[^/]+\/([^/#?]+)/i)
    if (m?.[1]) return decodeURIComponent(m[1].replace(/\.git$/i, ''))
  }
  return project.title.trim()
}

export function projectDisplayTitle(project: Project): string {
  return (project.displayTitle ?? project.title).trim()
}
