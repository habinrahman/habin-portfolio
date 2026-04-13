import { usePortfolioStore } from '../state/usePortfolioStore'

export default function EngineeringStackSystemsSection() {
  const { portfolio } = usePortfolioStore()
  const es = portfolio.engineeringStack
  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="scroll-mt-4 border-t border-slate-200/80 bg-zinc-50/50 px-4 py-14 md:px-10 md:py-16 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="engineering-heading" className="heading-page text-slate-950">
          {es.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">{es.subheading}</p>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {es.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">{group.title}</h3>
              <ul className="mt-4 list-none space-y-3" role="list">
                {group.items.map((line) => (
                  <li key={line} className="flex gap-3 text-left text-[15px] leading-relaxed text-slate-700 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
