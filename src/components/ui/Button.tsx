import type { ComponentProps, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { buttonHoverPrimary, buttonHoverSecondary, springSnappy } from '../../motion/micro'
import { cn } from '../../utils/cn'

type MotionButtonProps = Omit<ComponentProps<typeof motion.button>, 'children'>

type Props = {
  children: ReactNode
  leftIcon?: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'sm'
  /** Renders as a link with the same styles and motion as the button. */
  href?: string
  target?: string
  rel?: string
} & MotionButtonProps

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  disabled,
  href,
  target,
  rel,
  type = 'button',
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-700/35 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50'

  const sizes =
    size === 'sm' ? 'min-h-[40px] px-4 py-2 text-sm' : 'min-h-[44px] px-5 py-2.5 text-sm md:text-[15px]'

  const variants =
    variant === 'primary'
      ? 'bg-violet-700 text-white shadow-sm hover:bg-violet-800'
      : variant === 'secondary'
        ? 'bg-white border border-slate-300 text-slate-900 shadow-sm'
        : 'bg-transparent text-slate-800 border border-slate-300'

  const hover = disabled
    ? undefined
    : variant === 'primary'
      ? buttonHoverPrimary
      : variant === 'secondary'
        ? buttonHoverSecondary
        : { scale: 1.01, y: -1, boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' }

  const tap = disabled ? undefined : { scale: 0.985 }

  const classNames = cn(base, sizes, variants, className)

  const content = (
    <>
      {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={classNames}
        aria-disabled={disabled || undefined}
        whileHover={hover}
        whileTap={tap}
        transition={springSnappy}
        {...(rest as Omit<ComponentProps<typeof motion.a>, 'children' | 'href' | 'target' | 'rel'>)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classNames}
      disabled={disabled}
      whileHover={hover}
      whileTap={tap}
      transition={springSnappy}
      {...rest}
    >
      {content}
    </motion.button>
  )
}
