import Button from '../components/ui/Button'
import { usePortfolioStore } from '../state/usePortfolioStore'
import { scrollToId } from '../utils/scrollToId'

export default function WorkWithMeSection() {
  const { portfolio } = usePortfolioStore()
  const w = portfolio.workWithMe
  return (
    <section
      id="work-with-me"
      aria-labelledby="work-with-me-heading"
      className="scroll-mt-4 border-t border-slate-200/80 bg-white px-4 py-14 md:px-10 md:py-16 lg:px-14"
    >
      <div className="mx-auto max-w-6xl text-left">
        <h2 id="work-with-me-heading" className="heading-support text-slate-950">
          {w.heading}
        </h2>

        <ul className="mt-8 max-w-2xl list-none space-y-3 md:mt-9 md:space-y-3.5" role="list">
          {w.bullets.map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-slate-700 md:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-800" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {w.ctaBold?.trim() ? (
          <>
            <p className="mt-10 whitespace-pre-line text-lg font-semibold leading-snug text-slate-900 md:mt-11 md:text-xl">
              {w.ctaLead}
            </p>
            <p className="mt-1 text-lg font-semibold text-violet-800 md:text-xl">{w.ctaBold}</p>
          </>
        ) : (
          <p className="mt-10 whitespace-pre-line text-lg font-semibold leading-snug text-slate-900 md:mt-11 md:text-xl lg:text-2xl">
            {w.ctaLead}
          </p>
        )}

        <div className="mt-8">
          <Button type="button" onClick={() => scrollToId('contact')}>
            {w.button}
          </Button>
        </div>
      </div>
    </section>
  )
}
