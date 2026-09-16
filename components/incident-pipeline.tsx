'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'
import { incidentLifecycle } from '@/lib/content'

/**
 * Guardian's incident lifecycle, scrubbed by scroll position.
 *
 * The frame advances through the nine stages as you scroll the section, so
 * reading the page and walking the pipeline are the same gesture. That is the
 * point: the pipeline is sequential, and scroll is the most natural way to
 * express a sequence.
 *
 * Deliberately NOT a camera feed with boxes drawn on people. Guardian ships no
 * recognition of any kind and the UI must not imply otherwise
 * (docs/MARKETING_GUARDRAILS.md).
 */
export function IncidentPipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  // Map the section's travel through the viewport onto the nine stages.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 35%'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(
      incidentLifecycle.length - 1,
      Math.max(0, Math.floor(p * incidentLifecycle.length)),
    )
    setActive(i)
  })

  // Under reduced motion every stage reads as fully present — no scrubbing.
  const isReduced = Boolean(reduced)

  return (
    <div ref={ref} className="relative">
      <ol className="relative space-y-1">
        {/* Spine, with a progress fill that tracks scroll */}
        <div aria-hidden className="absolute left-[1.4375rem] top-4 bottom-4 w-px bg-white/10">
          {!isReduced && (
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-guardian-400 to-guardian-600"
              style={{ scaleY: scrollYProgress, height: '100%' }}
            />
          )}
        </div>

        {incidentLifecycle.map((stage, i) => {
          const isActive = !isReduced && i === active
          const isPast = !isReduced && active > i
          const lit = isReduced || isActive || isPast

          return (
            <li key={stage.n} className="relative">
              <div
                className={cn(
                  'flex gap-5 rounded-xl p-4 transition-colors duration-500',
                  isActive && 'bg-white/[0.04]',
                )}
              >
                <div className="relative z-10 shrink-0">
                  <motion.div
                    animate={
                      isReduced
                        ? {}
                        : {
                            scale: isActive ? 1 : 0.86,
                            borderColor: isActive
                              ? 'rgb(206 235 89)'
                              : isPast
                                ? 'rgba(206, 235, 89, 0.4)'
                                : 'rgba(255,255,255,0.15)',
                          }
                    }
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'grid size-12 place-items-center rounded-full border-2 bg-navy-900 font-mono text-sm tabular-nums',
                      lit ? 'text-guardian-400' : 'text-navy-400',
                    )}
                  >
                    {String(stage.n).padStart(2, '0')}
                    {isActive && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border-2 border-guardian-400"
                        initial={{ opacity: 0.7, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.7 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                  </motion.div>
                </div>

                <div className="min-w-0 pt-1.5">
                  <h3
                    className={cn(
                      'text-base font-semibold transition-colors duration-500',
                      lit ? 'text-white' : 'text-navy-200',
                    )}
                  >
                    {stage.label}
                    {stage.emphasis && (
                      <span className="ml-2 align-middle text-[0.625rem] font-bold uppercase tracking-widest text-guardian-500">
                        key
                      </span>
                    )}
                  </h3>
                  <motion.p
                    animate={isReduced ? {} : { opacity: lit ? 1 : 0.72 }}
                    transition={{ duration: 0.4 }}
                    className="mt-1 max-w-xl text-sm leading-relaxed text-navy-300"
                  >
                    {stage.detail}
                  </motion.p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 pl-4 text-xs text-navy-400">
        The pipeline as built — see{' '}
        <span className="font-mono text-navy-300">GUARDIAN_V0_1_ARCHITECTURE.md §3</span>.
      </p>
    </div>
  )
}
