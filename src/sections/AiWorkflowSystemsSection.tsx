import { usePortfolioStore } from '../state/usePortfolioStore'

export default function AiWorkflowSystemsSection() {
  const { portfolio } = usePortfolioStore()
  const s = portfolio.aiWorkflowSystems
  return (
    <section
      id="ai-workflow-systems"
      aria-labelledby="ai-workflow-systems-heading"
      className="scroll-mt-4 border-t border-slate-200/80 bg-white px-4 py-14 md:px-10 md:py-16 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="ai-workflow-systems-heading" className="heading-page text-slate-950">
          {s.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{s.subheading}</p>

        <ul className="mt-10 max-w-2xl list-none space-y-3 md:mt-12" role="list">
          {s.items.map((line) => (
            <li
              key={line}
              className="flex gap-3 text-left text-[15px] leading-relaxed text-slate-700 md:text-base"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
