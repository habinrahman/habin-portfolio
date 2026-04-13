import { usePortfolioStore } from '../state/usePortfolioStore'

export default function ProblemToSystemSection() {
  const { portfolio } = usePortfolioStore()
  const p = portfolio.problemToSystem
  return (
    <section
      id="from-problem-to-system"
      aria-labelledby="problem-to-system-heading"
      className="scroll-mt-4 border-t border-slate-200/80 bg-gradient-to-b from-zinc-100/90 via-white to-white px-4 py-14 md:px-10 md:py-16 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="problem-to-system-heading"
          className="text-left text-3xl font-bold tracking-tight text-slate-950 md:text-[2.25rem] md:leading-tight"
        >
          {p.heading}
        </h2>

        <ul className="mt-10 space-y-4 md:mt-12 md:space-y-4" role="list">
          {p.transforms.map(({ from, to }) => (
            <li key={from}>
              <article className="overflow-hidden rounded-2xl border border-slate-200/95 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
                <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] sm:items-stretch">
                  <div className="flex items-center border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:border-b-0 sm:border-r sm:py-5 sm:pr-4">
                    <p className="w-full text-left text-[15px] font-medium leading-snug text-slate-500 sm:text-right md:text-base">
                      {from}
                    </p>
                  </div>

                  <div
                    className="flex items-center justify-center bg-violet-50/90 py-3 sm:flex-col sm:border-r sm:border-slate-100 sm:bg-violet-50 sm:py-0"
                    aria-hidden
                  >
                    <span className="font-mono text-lg font-bold leading-none text-violet-700 sm:text-xl">→</span>
                  </div>

                  <div className="flex items-center px-5 py-4 sm:py-5 sm:pl-5">
                    <p className="text-left text-base font-semibold leading-snug text-slate-950 md:text-lg">{to}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
