import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { TopologyVisual } from '@/components/topology-visual'
import { listedProducts, company } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Platform — Guardian and Nexus',
  description:
    'The Alphalogix platform: Guardian processes video on a node at your site, Nexus gives you one view of your whole estate. Both in development.',
  alternates: { canonical: '/platform/' },
}

const accent = {
  guardian: 'text-guardian-400',
  nexus: 'text-nexus-400',
  sage: 'text-navy-200',
} as const

export default function PlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 sm:pt-40">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
        <div aria-hidden className="absolute inset-0 bg-radial-fade" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <h1 className="text-balance text-[length:var(--text-h1)] font-semibold leading-[1.1] tracking-tight text-white">
                Software we built because we could not buy it.
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-pretty text-[length:var(--text-lead)] leading-relaxed text-navy-200">
                Two products, each with one job. Guardian runs on a node at your
                site and decides what deserves an operator&rsquo;s attention.
                Nexus gives you one view of everything you have with us.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-navy-300">
                {company.platformLine}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="flex justify-center">
            <TopologyVisual />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-navy-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {listedProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/platform/${p.slug}/`}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-950/60 p-8 transition-colors hover:border-white/20 hover:bg-navy-950"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className={`font-mono text-xs uppercase tracking-[0.18em] ${accent[p.accent]}`}>
                      {p.role}
                    </p>
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[0.6875rem] font-semibold text-navy-300">
                      {p.statusLabel}
                    </span>
                  </div>

                  <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white">
                    {p.name}
                  </h2>
                  <p className="mt-2 font-medium text-navy-100">{p.positioning}</p>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-navy-300">
                    {p.problem}
                  </p>

                  <span className={`group mt-8 inline-flex items-center gap-2 text-sm font-semibold ${accent[p.accent]}`}>
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-navy-300">
              Both products are in active development and neither is taking
              production orders. The managed services business is what we
              deliver today.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
