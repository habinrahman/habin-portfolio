import { motion } from 'framer-motion'
import type { Project } from '../../data/types'
import { cn } from '../../utils/cn'

const SYSTEM_TYPE_BY_CATEGORY: Record<Project['category'], string> = {
  Backend: 'Backend Service',
  Systems: 'Automation System',
  Frontend: 'UI System',
  DevOps: 'Platform',
}

export function projectTypeLabel(project: Project): string {
  return project.systemTypeLabel?.trim() || SYSTEM_TYPE_BY_CATEGORY[project.category]
}

export function projectSystemSignals(project: Project) {
  const type = projectTypeLabel(project)
  let running = project.status !== 'In Progress'
  let productionMode = running
  if (project.lifecycleStatus === 'running') {
    running = true
    productionMode = false
  } else if (project.lifecycleStatus === 'production') {
    running = true
    productionMode = true
  } else {
    productionMode = running
  }
  return {
    status: running ? 'Running' : 'Building',
    mode: productionMode ? 'Production' : 'Development',
    type,
  }
}

function TypeGlyph({ className }: { className?: string }) {
  return (
    <span
      className={cn('inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-[11px] leading-none text-slate-500', className)}
      aria-hidden
    >
      ⚙
    </span>
  )
}

type Props = { project: Project; className?: string; hideSystemType?: boolean }

/** Compact live-system strip: Running · Production · type — minimal, not flashy */
export default function ProjectSystemSignals({ project, className = '', hideSystemType = false }: Props) {
  const { status, mode, type } = projectSystemSignals(project)
  const isRunning = status === 'Running'
  const isProduction = mode === 'Production'

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-medium leading-none text-slate-700 md:gap-x-3 md:text-xs',
        className,
      )}
      role="status"
      aria-label={`${status}, ${mode}, ${type}`}
    >
      <span className="inline-flex items-center gap-1.5">
        {isRunning ? (
          <motion.span
            className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.55)]"
            aria-hidden
            animate={{ opacity: [1, 0.65, 1], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.45)]"
            aria-hidden
          />
        )}
        <span className="tabular-nums tracking-tight">
          <span className="mr-1" aria-hidden>
            🟢
          </span>
          {status}
        </span>
      </span>

      <span className="text-slate-300 select-none" aria-hidden>
        ·
      </span>

      <span className="inline-flex items-center gap-1.5">
        {isProduction ? (
          <motion.span
            className="h-2 w-2 shrink-0 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.45)]"
            aria-hidden
            animate={{ opacity: [1, 0.82, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <span className="h-2 w-2 shrink-0 rounded-full bg-slate-300" aria-hidden />
        )}
        <span className="tabular-nums tracking-tight">
          <span className="mr-1" aria-hidden>
            🔵
          </span>
          {mode}
        </span>
      </span>

      {hideSystemType ? null : (
        <>
          <span className="text-slate-300 select-none" aria-hidden>
            ·
          </span>

          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <TypeGlyph />
            <span className="tracking-tight">{type}</span>
          </span>
        </>
      )}
    </div>
  )
}
