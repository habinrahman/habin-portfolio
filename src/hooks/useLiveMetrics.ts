import { useSyncExternalStore } from 'react'
import { getLiveMetricsSnapshot, subscribeLiveMetrics } from '../state/liveSystemStore'

export function useLiveMetrics() {
  return useSyncExternalStore(subscribeLiveMetrics, getLiveMetricsSnapshot, getLiveMetricsSnapshot)
}

