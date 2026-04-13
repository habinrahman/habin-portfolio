import { usePortfolioStore } from '../../state/usePortfolioStore'
import { cn } from '../../utils/cn'

export default function Footer({ className }: { className?: string }) {
  const { portfolio } = usePortfolioStore()
  return (
    <footer
      className={cn(
        'mt-auto border-t border-slate-200/80 pt-16 pb-10 md:pt-20',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 text-left text-sm leading-relaxed text-slate-500 md:px-10 lg:px-14">
        {portfolio.footer.line}
      </div>
    </footer>
  )
}
