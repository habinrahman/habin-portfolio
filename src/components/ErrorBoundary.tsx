import { Component } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  message?: string
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: unknown) {
    const message = error instanceof Error ? error.message : 'Something went wrong.'
    return { hasError: true, message }
  }

  componentDidCatch() {
    // Intentionally no-op: avoid noisy console logs in production bundles.
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-[60svh] flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200/90 bg-white shadow-card px-6 py-8">
          <div className="text-2xl font-bold text-slate-900">Portfolio failed to load</div>
          <div className="mt-2 text-slate-600">{this.state.message ?? 'An unexpected error occurred.'}</div>
          <div className="mt-6 flex gap-3">
            <button
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition font-medium text-slate-800"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload
            </button>
            <a
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition font-medium text-slate-800"
              href="#projects"
            >
              Skip to content
            </a>
          </div>
        </div>
      </div>
    )
  }
}
