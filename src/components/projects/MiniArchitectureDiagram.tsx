import type { Project } from '../../data/types'

export default function MiniArchitectureDiagram({ project }: { project: Project }) {
  const nodes = project.architectureOverview.slice(0, 3)
  const a = nodes[0] ?? 'Input'
  const b = nodes[1] ?? 'Process'
  const c = nodes[2] ?? 'Output'

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4">
      <div className="text-xs font-medium text-slate-500">Architecture (mini)</div>
      <svg viewBox="0 0 520 120" className="mt-2 w-full h-[110px]">
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(124,58,237,0.55)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.55)" />
          </linearGradient>
        </defs>

        {[
          { x: 18, label: a },
          { x: 190, label: b },
          { x: 362, label: c },
        ].map((n, idx) => (
          <g key={idx}>
            <rect x={n.x} y="28" rx="14" ry="14" width="140" height="64" fill="rgba(255,255,255,0.9)" stroke="rgba(148,163,184,0.5)" />
            <text x={n.x + 70} y="60" textAnchor="middle" fill="rgba(15,23,42,0.88)" fontSize="12" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
              {n.label.length > 18 ? `${n.label.slice(0, 18)}…` : n.label}
            </text>
          </g>
        ))}

        <path d="M160 60 C 175 60, 175 60, 190 60" stroke="url(#grad)" strokeWidth="3" fill="none" />
        <path d="M332 60 C 347 60, 347 60, 362 60" stroke="url(#grad)" strokeWidth="3" fill="none" />
        <polygon points="187,55 197,60 187,65" fill="rgba(14,165,233,0.75)" />
        <polygon points="359,55 369,60 359,65" fill="rgba(14,165,233,0.75)" />
      </svg>
    </div>
  )
}
