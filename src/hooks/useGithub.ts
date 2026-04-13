import { useMemo } from 'react'
import { useSyncExternalStore } from 'react'
import { fetchGithub, getGithubSnapshot, subscribeGithub } from '../state/githubStore'

export function useGithub(username: string) {
  // Kick off fetch during render is not allowed; call once via memoized microtask.
  // We schedule the fetch after render without setState-in-effect usage.
  useMemo(() => {
    if (!username) return
    queueMicrotask(() => fetchGithub(username))
    return undefined
  }, [username])

  return useSyncExternalStore(subscribeGithub, getGithubSnapshot, getGithubSnapshot)
}

