import type { VerificationProof } from '../../data/types'
import { cn } from '../../utils/cn'

type Props = {
  proof: VerificationProof
  compact?: boolean
}

export default function VerificationProofSection({ proof, compact }: Props) {
  return (
    <section
      className={cn(
        'rounded-xl border border-slate-200/90 bg-white p-4 md:p-5',
        compact && 'p-3.5 md:p-4',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h4
          className={cn(
            'text-sm font-semibold tracking-tight text-slate-900',
            compact && 'text-xs',
          )}
        >
          {proof.sectionTitle}
        </h4>
        {proof.tag ? (
          <span
            className={cn(
              'rounded-full border border-slate-200/90 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600',
              compact && 'text-[9px] px-2',
            )}
          >
            {proof.tag}
          </span>
        ) : null}
      </div>
      <p className={cn('mt-3 text-sm leading-relaxed text-slate-700', compact && 'text-[13px]')}>{proof.lead}</p>
      <div className="mt-4">
        <a
          href={proof.ctaUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50',
            compact && 'px-3 py-1.5 text-xs',
          )}
        >
          {proof.ctaLabel} ↗
        </a>
        {proof.ctaMicrocopy ? (
          <p
            className={cn(
              'mt-2 text-[11px] font-medium leading-snug tracking-tight text-slate-500',
              compact && 'text-[10px]',
            )}
          >
            {proof.ctaMicrocopy}
          </p>
        ) : null}
      </div>
      <p className={cn('mt-3 text-xs leading-relaxed text-slate-600', compact && 'text-[11px]')}>{proof.supporting}</p>
      <p className={cn('mt-3 text-sm font-medium leading-relaxed text-slate-800', compact && 'text-[13px]')}>
        {proof.connection}
      </p>
    </section>
  )
}
