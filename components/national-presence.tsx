'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Phone } from 'lucide-react'
import { offices } from '@/lib/contact'
import { cn } from '@/lib/utils'

/**
 * Eight states, eight numbers, eight tel: links.
 *
 * This is a real differentiator that was buried in a footer on the current
 * site: a genuine presence in every state and territory. Every number is a
 * working tel: link so a visitor on a phone taps once to reach their own
 * state's office. The mapping is confirmed in lib/contact.ts.
 */
export function NationalPresence() {
  const reduced = useReducedMotion()

  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {offices.map((o, i) => (
        <motion.li
          key={o.state}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          data-reveal
        >
          <a
            href={`tel:${o.tel}`}
            className="group flex h-full flex-col justify-between gap-4 bg-navy-950 p-5 transition-colors hover:bg-navy-900"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={cn(
                  'font-mono text-xs font-bold uppercase tracking-[0.18em]',
                  o.hq ? 'text-msp-400' : 'text-navy-300',
                )}
              >
                {o.state}
              </span>
              {o.hq && (
                <span className="rounded-full bg-msp-400/15 px-2 py-0.5 text-[0.625rem] font-semibold text-msp-400">
                  HQ
                </span>
              )}
            </div>
            <div>
              <span className="sr-only">{o.stateName} — call </span>
              <span className="flex items-center gap-2 text-[0.9375rem] font-semibold tabular-nums text-white">
                <Phone className="size-3.5 shrink-0 text-navy-300 transition-colors group-hover:text-msp-400" />
                {o.phone}
              </span>
            </div>
          </a>
        </motion.li>
      ))}
    </ul>
  )
}
