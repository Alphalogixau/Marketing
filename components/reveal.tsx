'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Scroll-triggered reveal. Every animated block on the site routes through
 * this one component so timing and easing stay consistent instead of each
 * section inventing its own feel.
 *
 * Under prefers-reduced-motion the content renders in its final state
 * immediately — it never stays hidden.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Staggers direct children through the same reveal curve. */
export function RevealGroup({
  children,
  stagger = 0.08,
  className,
}: {
  children: ReactNode[]
  stagger?: number
  className?: string
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
