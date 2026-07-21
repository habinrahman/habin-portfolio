import VerificationProofSection from '../components/projects/VerificationProofSection'
import { usePortfolioStore } from '../state/usePortfolioStore'

export default function VerifiedProofSection() {
  const { portfolio } = usePortfolioStore()
  const v = portfolio.verifiedProof
  return (
    <section
      id="verified"
      aria-labelledby="verified-heading"
      className="scroll-mt-4 border-b border-slate-200/90 bg-zinc-50/60 px-4 py-14 md:px-10 md:py-16 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{v.eyebrow}</p>
        <h2 id="verified-heading" className="mt-3 heading-support text-slate-950">
          {v.heading}
        </h2>

        <div className="mt-8 max-w-xl md:mt-9">
          <VerificationProofSection proof={v.proof} />
        </div>
      </div>
    </section>
  )
}
