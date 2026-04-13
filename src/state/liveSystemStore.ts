export type LiveMetrics = {
  latencyP95Ms: number
  queueDepth: number
  tick: number
  /** Subtle live wobble — deployed environments / services */
  systemsDeployed: number
  /** Large counter with tiny fluctuations (automation volume feel) */
  automationTasksExecuted: number
}

let metrics: LiveMetrics = {
  latencyP95Ms: 84,
  queueDepth: 12,
  tick: 0,
  systemsDeployed: 18,
  automationTasksExecuted: 847_320,
}

const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function step() {
  // Deterministic-ish “noise” without Math.random during render.
  const t = metrics.tick + 1
  const wave = Math.sin(t / 7) * 10 + Math.sin(t / 17) * 7
  const wave2 = Math.cos(t / 11) * 4

  const latency = clamp(Math.round(92 + wave + wave2), 55, 180)
  const q = clamp(Math.round(14 + Math.sin(t / 5) * 6 + Math.cos(t / 13) * 5), 0, 48)

  const sysWave = Math.sin(t / 11) * 1.25 + Math.cos(t / 19) * 0.85 + Math.sin(t / 29) * 0.45
  const systemsDeployed = clamp(Math.round(18 + sysWave), 15, 22)

  const taskWave =
    Math.sin(t / 16) * 88 + Math.cos(t / 23) * 62 + Math.sin(t / 31) * 44 + Math.cos(t / 37) * 28
  const automationTasksExecuted = Math.max(800_000, Math.round(847_320 + taskWave))

  metrics = { latencyP95Ms: latency, queueDepth: q, tick: t, systemsDeployed, automationTasksExecuted }
  emit()
}

// Background simulation.
window.setInterval(step, 900)

export function subscribeLiveMetrics(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getLiveMetricsSnapshot() {
  return metrics
}

