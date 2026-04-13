import type { Transition } from 'framer-motion'

/** Snappy, damped springs — avoids bouncy overshoot */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 0.85,
}

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 34,
  mass: 0.9,
}

/** Staggered children when a block enters the viewport */
export const sectionStaggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.04,
    },
  },
}

export const sectionStaggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
}

/** Softer block entrance — minimal sections (fade-forward, less travel) */
export const sectionStaggerChildGentle = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
}

export const hoverLift = {
  y: -2,
  scale: 1.005,
  boxShadow:
    '0 4px 12px rgba(15, 23, 42, 0.08), 0 16px 40px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.06)',
}

/** Smaller surfaces (tiles, stat cells) */
export const hoverLiftSubtle = {
  y: -1,
  scale: 1.01,
  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.05)',
}

export const buttonHoverPrimary = {
  scale: 1.01,
  y: -1,
  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.06)',
}

export const buttonHoverSecondary = {
  scale: 1.01,
  y: -1,
  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.06)',
}

/** Hint chips / ghost UI — opacity + translateY, calm ease (no spring pop). */
export const hintPresenceTransition: Transition = {
  duration: 0.5,
  ease: 'easeOut',
}

export const hintPresenceInitial = { opacity: 0, y: 8 }
export const hintPresenceAnimate = { opacity: 1, y: 0 }
export const hintPresenceExit = { opacity: 0, y: 6 }
