import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { hoverLift, springSnappy } from '../../motion/micro'
import { cn } from '../../utils/cn'

type Props = {
  children: ReactNode
  className?: string
}

const Card = forwardRef<HTMLDivElement, Props>(function Card({ children, className }, ref) {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative rounded-2xl border border-slate-200/95 bg-white shadow-card will-change-transform',
        'before:content-[\'\'] before:absolute before:inset-0 before:pointer-events-none before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300',
        'before:bg-[radial-gradient(480px_circle_at_var(--x,50%)_var(--y,30%),rgba(15,23,42,0.04),transparent_45%)]',
        'hover:before:opacity-100',
        className,
      )}
      whileHover={hoverLift}
      transition={springSnappy}
    >
      {children}
    </motion.div>
  )
})

export default Card
