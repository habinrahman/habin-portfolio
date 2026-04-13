import { PROJECTS } from '../config/projects.config'
import { SYSTEMS_BUILT } from './systemsBuilt'

/**
 * Everything counted on this site (featured case studies + “Systems I’ve Built” catalog).
 */
export const LISTED_SYSTEMS_COUNT = PROJECTS.length + SYSTEMS_BUILT.length

/**
 * Shipped systems *not* listed under `PROJECTS` or `SYSTEMS_BUILT` but still real
 * (internal tools, short engagements, etc.). Keep at **0** unless every increment is defensible.
 */
export const UNLISTED_SHIPPED_SYSTEMS_COUNT = 0

/**
 * Hero “Projects built” floor — featured work + systems catalog + optional unlisted ships.
 * To reach a higher total, add `BuiltSystemItem`s in `systemsBuilt.ts` or bump `UNLISTED_SHIPPED_SYSTEMS_COUNT`.
 */
export const PROJECTS_BUILT_TOTAL = LISTED_SYSTEMS_COUNT + UNLISTED_SHIPPED_SYSTEMS_COUNT

/** When > 0, hero shows "{total}+" to reflect ships not on the public lists */
export function projectsBuiltHeroShowsPlus(): boolean {
  return UNLISTED_SHIPPED_SYSTEMS_COUNT > 0
}
