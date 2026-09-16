import Link from 'next/link'
import { ArrowRight, Check, ShieldCheck, Layers, Headphones } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { TopologyVisual } from '@/components/topology-visual'
import { IncidentPipeline } from '@/components/incident-pipeline'
import {
  getProduct,
  services,
  wpRoutes,
  company,
  surveillancePartners,
  cloudPartners,
  industries,
} from '@/lib/content'

const guardian = getProduct('guardian')!
const nexus = getProduct('nexus')!

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden className="absolute inset-0 bg-radial-fade" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-navy-200">
                <span className="size-1.5 rounded-full bg-guardian-400" />
                {company.foundedCopy}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-balance text-[length:var(--text-display)] font-semibold leading-[1.05] tracking-tight text-white">
                The managed IT partner
                <br />
                <span className="text-navy-300">building its own</span>{' '}
                <span className="bg-gradient-to-r from-guardian-400 via-nexus-400 to-nexus-500 bg-clip-text text-transparent">
                  platform
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-pretty text-[length:var(--text-lead)] leading-relaxed text-navy-200">
                We run managed IT, cyber security, cloud and surveillance for
                Australian businesses. Then we build the software our own
                engineers needed and could not buy — private edge video
                intelligence, and a portal that shows customers what they
                actually have.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={wpRoutes.contact}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.03] active:scale-100"
                >
                  Book a consultation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/platform/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  See the platform
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-navy-400">
                Guardian sees · Nexus orchestrates
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="flex justify-center lg:justify-end">
            <TopologyVisual />
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── Three pillars ──────────────────── */}
      <section className="border-y border-white/10 bg-navy-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-balance text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
              Two products and a service business that funds them.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-navy-300">
              We are honest about where each one stands. The services are
              running today. The products are in development, and we would
              rather tell you that than show you a screenshot of something that
              does not exist yet.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <PillarCard
                icon={<ShieldCheck className="size-5" />}
                accent="guardian"
                eyebrow={guardian.role}
                title="Guardian"
                body={guardian.positioning}
                detail="Video processed on a node at your site. It keeps working when the internet does not."
                status={guardian.statusLabel}
                href="/platform/guardian/"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <PillarCard
                icon={<Layers className="size-5" />}
                accent="nexus"
                eyebrow={nexus.role}
                title="Nexus"
                body={nexus.positioning}
                detail="One view of every site you have with us, and whether it is online right now."
                status={nexus.statusLabel}
                href="/platform/nexus/"
              />
            </Reveal>
            <Reveal delay={0.19}>
              <PillarCard
                icon={<Headphones className="size-5" />}
                accent="msp"
                eyebrow="We run it."
                title="Managed Services"
                body="The business that pays for all of this."
                detail="Managed IT, cyber security, cloud, unified communications, surveillance and consulting."
                status="Available now"
                href="/service/managed-services/"
                external
                primary
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Guardian ──────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-guardian-400">
                  Guardian
                </p>
                <h2 className="mt-4 text-balance text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
                  Most video analytics alert on everything. Operators learn to
                  ignore them.
                </h2>
                <p className="mt-5 text-pretty leading-relaxed text-navy-300">
                  {guardian.problem}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-3">
                  {[
                    'Frames it cannot trust are rejected before inference runs',
                    'A detection is a candidate until rules qualify it',
                    'Nothing goes live without a shadow period first',
                    'No facial recognition — absent, not disabled',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-navy-200">
                      <Check className="mt-0.5 size-4 shrink-0 text-guardian-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16}>
                <Link
                  href="/platform/guardian/"
                  className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-guardian-400"
                >
                  How Guardian works
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 backdrop-blur-sm sm:p-8">
                  <div className="mb-8 flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-navy-300">
                      Incident lifecycle
                    </h3>
                    <span className="font-mono text-xs text-navy-500">9 stages</span>
                  </div>
                  <IncidentPipeline />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Nexus ───────────────────────── */}
      <section className="border-y border-white/10 bg-navy-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-nexus-400">
              Nexus
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
              {nexus.problem}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nexus.capabilities.slice(0, 3).map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-white/10 bg-navy-950/50 p-7">
                  <div className="mb-4 h-px w-10 bg-nexus-400" />
                  <h3 className="text-[length:var(--text-h3)] font-semibold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-300">{cap.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/platform/nexus/"
              className="group mt-12 inline-flex items-center gap-2 text-sm font-semibold text-nexus-400"
            >
              More about Nexus
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ──────────── Why we built our own ────────────
          The credibility bridge for the pivot. Alphalogix has deployed every
          major surveillance platform in Australia — that is what makes
          "so we built our own" land as earned rather than arrogant. */}
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
                We deployed everyone else&rsquo;s platform first.
              </h2>
              <div className="mt-6 space-y-4 text-pretty leading-relaxed text-navy-300">
                <p>
                  Alphalogix is a certified partner of the world&rsquo;s leading
                  surveillance platforms, and we have designed, installed and
                  managed camera infrastructure for Australian businesses from a
                  single office to multi-site national networks.
                </p>
                <p className="text-navy-200">
                  Guardian and Nexus exist because of what that work taught us.
                  Operators drowning in alerts they had learned to ignore.
                  Customers with no way to see what they owned or whether it was
                  online. We could not buy the fix, so we are building it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-guardian-400">
                    Surveillance platforms
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {surveillancePartners.map((p) => (
                      <li
                        key={p}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-navy-200"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-nexus-400">
                    Cloud platforms
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cloudPartners.map((p) => (
                      <li
                        key={p}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-navy-200"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Industries — carried over from the current landing page */}
          <Reveal delay={0.16}>
            <div className="mt-20 border-t border-white/10 pt-12">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-navy-300">
                Trusted by Australian businesses across every industry
              </h3>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {industries.map((i) => (
                  <li key={i} className="text-sm text-navy-200">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── Services ───────────────────────
          Every one of these links to the live WordPress service page.
          This section is the primary internal link source for those pages —
          they are the only pages currently earning organic traffic. Do not
          remove it. See docs/SEO-CONTINUITY.md */}
      <section className="bg-navy-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-balance text-[length:var(--text-h2)] font-semibold tracking-tight text-white">
              One partner for the whole estate.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-navy-300">
              The services business is what we do today, for businesses across
              every Australian state.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <a
                  href={s.href}
                  className="group flex h-full flex-col bg-navy-950 p-7 transition-colors hover:bg-navy-900"
                >
                  <h3 className="flex items-center justify-between gap-3 text-[length:var(--text-h3)] font-semibold text-white">
                    {s.title}
                    <ArrowRight className="size-4 shrink-0 text-navy-500 transition-all group-hover:translate-x-0.5 group-hover:text-msp-400" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-300">{s.summary}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CTA ─────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-navy-900 py-24">
        <div aria-hidden className="absolute inset-0 bg-radial-fade" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-h1)] font-semibold tracking-tight text-white">
              Let&rsquo;s talk about your estate.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-navy-300">
              Whether you need a managed IT partner today or want to talk about
              Guardian and Nexus as they come together, start with a
              conversation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={wpRoutes.contact}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.03] active:scale-100"
              >
                Book a consultation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={wpRoutes.caseStudies}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Read case studies
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* ── local components ─────────────────────────────────────────────────── */

const accentMap = {
  guardian: { text: 'text-guardian-400', bg: 'bg-guardian-400/10', ring: 'ring-guardian-400/30' },
  nexus: { text: 'text-nexus-400', bg: 'bg-nexus-400/10', ring: 'ring-nexus-400/30' },
  msp: { text: 'text-msp-400', bg: 'bg-msp-400/10', ring: 'ring-msp-400/30' },
} as const

function PillarCard({
  icon,
  accent,
  eyebrow,
  title,
  body,
  detail,
  status,
  href,
  external,
  primary,
}: {
  icon: React.ReactNode
  accent: keyof typeof accentMap
  eyebrow: string
  title: string
  body: string
  detail: string
  status: string
  href: string
  external?: boolean
  primary?: boolean
}) {
  const a = accentMap[accent]
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-11 place-items-center rounded-xl ring-1 ${a.bg} ${a.ring} ${a.text}`}>
          {icon}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${
            primary ? 'bg-msp-400/15 text-msp-400' : 'bg-white/5 text-navy-300'
          }`}
        >
          {status}
        </span>
      </div>

      <p className={`mt-7 font-mono text-xs uppercase tracking-[0.18em] ${a.text}`}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 font-medium text-navy-100">{body}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-300">{detail}</p>

      <span className={`group mt-7 inline-flex items-center gap-2 text-sm font-semibold ${a.text}`}>
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </>
  )

  const className =
    'flex h-full flex-col rounded-2xl border border-white/10 bg-navy-950/60 p-7 transition-colors hover:border-white/20 hover:bg-navy-950'

  return external ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}
