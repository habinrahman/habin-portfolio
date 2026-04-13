import { useContext } from 'react'
import { PortfolioProgressContext } from './PortfolioContext'

export function usePortfolioProgress() {
  const ctx = useContext(PortfolioProgressContext)
  if (!ctx) throw new Error('usePortfolioProgress must be used within PortfolioProvider.')
  return ctx
}

