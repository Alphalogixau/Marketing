import type { ReactNode } from 'react'
import { ArrowRight, Info } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { wpRoutes, type Product } from '@/lib/content'

const accent = {
  guardian: { text: 'text-guardian-400', border: 'border-guardian-400/30', rule: 'bg-guardian-400' },
  nexus: { text: 'text-nexus-400', border: 'border-nexus-400/30', rule: 'bg-nexus-400' },
  sage: { text: 'text-navy-200', border: 'border-white/20', rule: 'bg-navy-200' },
} as const

/**
 * Shared shell for a product page.
 *
 * The maturity notice is not optional chrome — both products are pre-launch and
 * the page states so above the fold. See docs/MARKETING_GUARDRAILS.md: we do not
 * publish capacity, latency or accuracy figures, and we do not show interfaces
 * that do not exist.
 */
export function ProductShell({
  product,
  children,
}: {
  product: Product
  children?: ReactNode
}) {
  const a = accent[product.accent]

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-16 sm:pt-40">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
        <div aria-hidden className="absolute inset-0 bg-radial-fade" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={`font-mono text-xs uppercase tracking-[0.2em] ${a.text}`}>
              {product.role}
            </p>
            <h1 className="mt-5 text-balance text-[length:var(--text-h1)] font-semibold leading-[1.1] tracking-tight text-white">
              {product.positioning}
            </h1>
            <p className="mt-6 text-pretty text-[length:var(--text-lead)] leading-relaxed text-navy-200">
              {product.problem}
            </p>
          </Reveal>

          {/* Honest status. Above the fold, by design. */}
          <Reveal delay={0.1}>
            <div
              className={`mt-10 flex gap-4 rounded-xl border bg-white/[0.03] p-5 ${a.border}`}
            >
              <Info className={`mt-0.5 size-5 shrink-0 ${a.text}`} />
              <div>
                <p className="text-sm font-semibold text-white">
                  {product.statusLabel}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-300">
                  {product.maturity}
                </p>
              </div>
            </div>
          </Reveal>

          {product.appDomain && (
            <Reveal delay={0.16}>
              <p className="mt-6 font-mono text-xs text-navy-300">
                Will be served at{' '}
                <span className="text-navy-200">{product.appDomain}</span>
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Capabilities */}
      {product.capabilities.length > 0 && (
        <section className="border-y border-white/10 bg-navy-900 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
                What it does
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.capabilities.map((cap, i) => (
                <Reveal key={cap.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-white/10 bg-navy-950/50 p-7">
                    <div className={`mb-4 h-px w-10 ${a.rule}`} />
                    <h3 className="text-[length:var(--text-h3)] font-semibold text-white">
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-300">
                      {cap.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {children}

      {/* CTA — early access, not a fake trial button */}
      <section className="border-t border-white/10 bg-navy-950 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
              Interested in {product.name} early access?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-navy-300">
              {product.name} is still in development. If it sounds like
              something your sites need, talk to us and we will be straight with
              you about timing.
            </p>
            <a
              href={wpRoutes.contact}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.03] active:scale-100"
            >
              Start a conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
