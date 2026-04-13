import { useEffect, useMemo, useState } from 'react'

type Status = 'idle' | 'loading' | 'ready' | 'error'

type GithubUserResponse = {
  public_repos?: number
}

export type GithubProjectsSnapshot = {
  status: Status
  repoCount: number | null
  error?: string
}

/**
 * Fetches GitHub repo count for a user (public repos).
 * Intended for lightweight stats display; falls back in UI when status === 'error'.
 */
export function useGithubProjects(username: string): GithubProjectsSnapshot {
  const stableUsername = useMemo(() => username.trim(), [username])
  const [state, setState] = useState<GithubProjectsSnapshot>({
    status: stableUsername ? 'loading' : 'idle',
    repoCount: null,
  })

  useEffect(() => {
    if (!stableUsername) {
      setState({ status: 'idle', repoCount: null })
      return
    }

    const controller = new AbortController()
    setState({ status: 'loading', repoCount: null })

    fetch(`https://api.github.com/users/${encodeURIComponent(stableUsername)}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`GitHub API failed: ${res.status}`)
        const json = (await res.json()) as GithubUserResponse
        const count = typeof json?.public_repos === 'number' ? json.public_repos : null
        if (count === null) throw new Error('GitHub API missing public_repos')
        setState({ status: 'ready', repoCount: Math.max(0, Math.floor(count)) })
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return
        const msg = e instanceof Error ? e.message : 'GitHub fetch failed'
        setState({ status: 'error', repoCount: null, error: msg })
      })

    return () => controller.abort()
  }, [stableUsername])

  return state
}

