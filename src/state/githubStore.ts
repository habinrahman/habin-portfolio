type Repo = {
  id: number
  name: string
  html_url: string
  stargazers_count: number
  updated_at: string
  description: string | null
  fork: boolean
}

export type GithubSnapshot = {
  status: 'idle' | 'loading' | 'ready' | 'error'
  username: string
  repos: Repo[]
  error?: string
  lastFetchedAt?: number
}

let snapshot: GithubSnapshot = {
  status: 'idle',
  username: '',
  repos: [],
}

const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

export function subscribeGithub(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getGithubSnapshot() {
  return snapshot
}

let inflight: Promise<void> | null = null

export function fetchGithub(username: string) {
  if (!username) return
  if (snapshot.status === 'ready' && snapshot.username === username) return
  if (snapshot.status === 'loading' && snapshot.username === username) return
  if (inflight) return

  snapshot = { ...snapshot, status: 'loading', username }
  emit()

  inflight = fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`GitHub API failed: ${res.status}`)
      const json = (await res.json()) as Repo[]
      const repos = (Array.isArray(json) ? json : [])
        .filter((r) => r && !r.fork)
        .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
        .slice(0, 6)
      snapshot = {
        status: 'ready',
        username,
        repos,
        lastFetchedAt: Date.now(),
      }
      emit()
    })
    .catch((e: unknown) => {
      const msg = e instanceof Error ? e.message : 'GitHub fetch failed'
      snapshot = { status: 'error', username, repos: [], error: msg }
      emit()
    })
    .finally(() => {
      inflight = null
    })
}

