'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Guardian's most important claim, animated: the node keeps working when the
 * WAN does not.
 *
 * Sequence: link healthy -> link severs -> portal unreachable -> the node
 * carries on qualifying and recording incidents locally.
 *
 * Note what it deliberately does NOT show: incidents syncing upstream on
 * reconnect. The core-sync-agent outbox is disabled in v0.1, so animating a
 * catch-up flush would be claiming behaviour that does not exist. The honest
 * version is a stronger claim anyway — nothing is lost because nothing
 * depended on the link. See docs/MARKETING_GUARDRAILS.md
 */

type Phase = 'healthy' | 'severed' | 'local'

export function ResilienceVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('healthy')
  const [localCount, setLocalCount] = useState(0)

  useEffect(() => {
    if (reduced) {
      setPhase('local')
      setLocalCount(3)
      return
    }
    if (!inView) return

    const timers: ReturnType<typeof setTimeout>[] = []
    let counter: ReturnType<typeof setInterval> | undefined

    const run = () => {
      setPhase('healthy')
      setLocalCount(0)
      timers.push(setTimeout(() => setPhase('severed'), 1600))
      timers.push(
        setTimeout(() => {
          setPhase('local')
          counter = setInterval(() => setLocalCount((c) => (c >= 4 ? c : c + 1)), 900)
        }, 2600),
      )
      timers.push(
        setTimeout(() => {
          if (counter) clearInterval(counter)
          run()
        }, 8600),
      )
    }
    run()

    return () => {
      timers.forEach(clearTimeout)
      if (counter) clearInterval(counter)
    }
  }, [inView, reduced])

  const severed = phase !== 'healthy'

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-navy-950/60 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-navy-300">
          WAN interruption
        </h3>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 font-mono text-[0.6875rem] font-semibold transition-colors duration-500',
            severed ? 'bg-guardian-400/15 text-guardian-400' : 'bg-white/5 text-navy-300',
          )}
        >
          {severed ? 'link down' : 'link up'}
        </span>
      </div>

      <svg viewBox="0 0 420 150" className="mt-6 h-auto w-full" role="img"
        aria-label="When the wide-area link to the portal drops, the Guardian node at the site continues to qualify and record incidents locally.">
        <defs>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#ceeb59" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ceeb59" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="70" cy="75" r="54" fill="url(#nodeGlow)" />

        {/* Link */}
        <path d="M 100 75 L 320 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <motion.path
          d="M 100 75 L 320 75"
          stroke="#93e4ff"
          strokeWidth="1.5"
          animate={{ pathLength: severed ? 0.32 : 1, opacity: severed ? 0.35 : 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* Break marker */}
        <motion.g animate={{ opacity: severed ? 1 : 0 }} transition={{ duration: 0.3, delay: severed ? 0.3 : 0 }}>
          <line x1="178" y1="62" x2="196" y2="88" stroke="#ceeb59" strokeWidth="2" strokeLinecap="round" />
          <line x1="196" y1="62" x2="178" y2="88" stroke="#ceeb59" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
        {/* Travelling pulse, only while healthy */}
        {!reduced && !severed && (
          <motion.circle
            r="3" fill="#93e4ff" cy="75"
            initial={{ cx: 100, opacity: 0 }}
            animate={{ cx: 320, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Site node — never stops */}
        <rect x="46" y="51" width="48" height="48" rx="13" fill="#0b1725" stroke="#ceeb59" strokeOpacity="0.6" strokeWidth="1.5" />
        {[-8, 0, 8].map((dy, j) => (
          <motion.rect
            key={dy} x="59" y={73 + dy} width="22" height="3.5" rx="1.75" fill="#ceeb59"
            animate={reduced ? { opacity: 0.7 } : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.5, delay: j * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <text x="70" y="121" textAnchor="middle" className="fill-guardian-400 font-mono text-[9px] uppercase tracking-widest">
          Guardian node
        </text>

        {/* Portal — dims when unreachable */}
        <motion.g animate={{ opacity: severed ? 0.3 : 1 }} transition={{ duration: 0.5 }}>
          <rect x="322" y="51" width="48" height="48" rx="13" fill="#0b1725" stroke="#93e4ff" strokeOpacity="0.6" strokeWidth="1.5" />
          <circle cx="346" cy="75" r="8" fill="none" stroke="#93e4ff" strokeWidth="1.5" />
          <circle cx="346" cy="75" r="2.5" fill="#93e4ff" />
          <text x="346" y="121" textAnchor="middle" className="fill-nexus-400 font-mono text-[9px] uppercase tracking-widest">
            Portal
          </text>
        </motion.g>
      </svg>

      <div className="mt-6 flex items-baseline gap-3 border-t border-white/10 pt-5">
        <span className="font-mono text-3xl tabular-nums text-guardian-400">
          {String(localCount).padStart(2, '0')}
        </span>
        <p className="text-sm leading-relaxed text-navy-300">
          incidents qualified and recorded{' '}
          <span className="text-white">on site</span>, with the link down.
        </p>
      </div>
    </div>
  )
}
