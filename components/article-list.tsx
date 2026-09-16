import { ArrowUpRight, FileText } from 'lucide-react'
import type { Article } from '@/lib/content'

const AU_DATE = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(iso: string) {
  return AU_DATE.format(new Date(`${iso}T00:00:00Z`))
}

/**
 * A list of WordPress-hosted articles. Plain anchors, not next/link — these
 * URLs are served by the WordPress origin, not this app.
 */
export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {articles.map((a) => (
        <li key={a.href}>
          <a
            href={a.href}
            className="group flex items-start justify-between gap-6 py-5 transition-colors hover:bg-white/[0.02]"
          >
            <div className="min-w-0">
              <h3 className="text-pretty font-medium leading-snug text-navy-100 transition-colors group-hover:text-white">
                {a.title}
              </h3>
              <time dateTime={a.date} className="mt-1.5 block font-mono text-xs text-navy-500">
                {formatDate(a.date)}
              </time>
            </div>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-navy-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-nexus-400" />
          </a>
        </li>
      ))}
    </ul>
  )
}

/** A single case study, given more weight than a list row — it is the
 *  strongest proof asset on the page for a services buyer. */
export function CaseStudyCard({ article }: { article: Article }) {
  return (
    <a
      href={article.href}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-navy-950/60 p-7 transition-colors hover:border-white/20 hover:bg-navy-950"
    >
      <span className="inline-flex items-center gap-2 self-start rounded-full bg-msp-400/10 px-3 py-1 text-xs font-semibold text-msp-400 ring-1 ring-msp-400/25">
        <FileText className="size-3.5" />
        Case study
      </span>
      <h3 className="mt-6 text-pretty text-[length:var(--text-h3)] font-semibold leading-snug text-white">
        {article.title}
      </h3>
      <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-msp-400">
        Read the case study
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

/** Compact related-reading strip, for placing beside product context. */
export function RelatedReading({ articles, title }: { articles: Article[]; title: string }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-navy-400">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {articles.map((a) => (
          <li key={a.href}>
            <a
              href={a.href}
              className="group flex items-start gap-2 text-sm leading-snug text-navy-300 transition-colors hover:text-white"
            >
              <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-navy-600 transition-colors group-hover:text-guardian-400" />
              <span className="text-pretty">{a.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
