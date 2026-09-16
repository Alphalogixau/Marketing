import type { Metadata } from 'next'
import { Reveal } from '@/components/reveal'
import { ProductShell } from '@/components/product-shell'
import { IncidentPipeline } from '@/components/incident-pipeline'
import { getProduct } from '@/lib/content'

const guardian = getProduct('guardian')!

export const metadata: Metadata = {
  title: 'Guardian — Private Edge Video Intelligence',
  description:
    'Guardian processes video on a node at your site. Frames it cannot trust are rejected before inference, a detection is a candidate until rules qualify it, and there is no facial recognition of any kind. In development.',
  alternates: { canonical: '/platform/guardian/' },
}

export default function GuardianPage() {
  return (
    <ProductShell product={guardian}>
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
              From frame to incident
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-navy-300">
              Nine stages, in order. The three marked <em>key</em> are the ones
              that decide whether an operator trusts the system a month from now.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-white/10 bg-navy-900/60 p-6 backdrop-blur-sm sm:p-8">
              <IncidentPipeline />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Guardian deliberately is not — a differentiator, stated plainly */}
      <section className="border-t border-white/10 bg-navy-900 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
              What Guardian is not
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-navy-300">
              These are architectural decisions with tests behind them, not
              features awaiting a roadmap slot.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {[
                ['No facial recognition, LPR, watchlists or appearance search', 'Absent from the product, not disabled behind a setting.'],
                ['No training on the appliance', 'Your footage is not used to train anything.'],
                ['No cloud dependency for local incidents', 'The node qualifies and records incidents whether or not it can reach us.'],
                ['No capacity or latency figures until measured', 'We will not quote a camera count or an alert time before a benchmark on your hardware profile produces one.'],
              ].map(([title, body]) => (
                <li key={title} className="py-5">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-300">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </ProductShell>
  )
}
