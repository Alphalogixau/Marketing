'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

/**
 * Reading progress along the top of the page, in the three pillar accents.
 *
 * It expresses something real — how far through the page you are — rather
 * than decorating. Hidden entirely under prefers-reduced-motion, since a
 * bar that tracks scroll is inherently motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-guardian-400 via-nexus-400 to-msp-400"
    />
  )
}
