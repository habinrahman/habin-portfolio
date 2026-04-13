import { usePortfolioStore } from '../state/usePortfolioStore'

export default function AuthorityStripSection() {
  const { portfolio } = usePortfolioStore()
  const a = portfolio.authority
  return (
    <section
      className="border-b border-slate-200/90 bg-white px-4 py-6 md:px-10 md:py-7 lg:px-14"
      aria-labelledby="authority-strip-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="authority-strip-heading"
          className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500"
        >
          {a.title}
        </h2>
        <ul
          className="mt-4 flex list-none flex-col gap-3 md:mt-5 md:flex-row md:flex-wrap md:items-stretch md:gap-y-3"
          role="list"
        >
          {a.items.map((line, i) => (
            <li
              key={line}
              className={
                'flex items-start gap-2.5 text-left text-sm font-medium leading-snug text-slate-800 md:items-center md:text-[15px] ' +
                (i > 0 ? 'md:border-l md:border-slate-200/90 md:pl-6' : '')
              }
            >
              <span className="mt-0.5 text-slate-400 select-none md:mt-0" aria-hidden>
                ✔
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
