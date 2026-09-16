/**
 * Single source of truth for landing-page and platform copy.
 *
 * Product facts here are drawn from the source repositories:
 *   alphalogixaus/alphalogix-guardian  (README.md, GUARDIAN_V0_1_ARCHITECTURE.md)
 *   alphalogixaus/alphalogix-nexus     (README.md)
 *   alphalogixaus/alphalogix-atlantis  (README.md)
 *
 * READ docs/MARKETING_GUARDRAILS.md BEFORE EDITING.
 * Guardian's ADRs forbid specific marketing claims (capacity, latency, accuracy,
 * and any depiction of facial recognition). Those are engineering decisions with
 * test gates behind them, not suggestions.
 */

export const NEEDS_INPUT = 'NEEDS-INPUT' as const

/* ── Services: served by the existing WordPress install ────────────────────
 * These URLs are load-bearing. The landing page is the primary internal link
 * source for them and they are the only pages currently earning organic
 * traffic. Do not change these paths without a 301 map. */
export const services = [
  {
    slug: 'managed-services',
    title: 'Managed IT Services',
    href: '/service/managed-services/',
    summary:
      'Day-to-day IT operations, helpdesk and vendor management run as a single accountable service.',
  },
  {
    slug: 'cyber-security-services',
    title: 'Cyber Security',
    href: '/service/cyber-security-services/',
    summary:
      'Assessment, hardening and ongoing defence aligned to the ACSC Essential Eight.',
  },
  {
    slug: 'surveillance-integration',
    title: 'Surveillance Integration',
    href: '/service/surveillance-integration/',
    summary:
      'Enterprise video platforms designed, deployed and integrated — Milestone, Genetec, Avigilon, Verkada, Nx Witness.',
  },
  {
    slug: 'cloud-services',
    title: 'Cloud Services',
    href: '/service/cloud-services/',
    summary:
      'Azure, AWS and Google Cloud environment design, migration and ongoing management.',
  },
  {
    slug: 'unified-communication-services',
    title: 'Unified Communications',
    href: '/service/unified-communication-services/',
    summary:
      'Internet, voice, mobile and collaboration delivered as one managed platform.',
  },
  {
    slug: 'consulting-services',
    title: 'Consulting',
    href: '/service/consulting-services/',
    summary:
      'Technology strategy, architecture and roadmap work for teams without an in-house CTO.',
  },
] as const

export type Service = (typeof services)[number]

/* ── Platform ──────────────────────────────────────────────────────────────
 * Naming follows alphalogix-guardian ADR-0001: Guardian is a PEER of Nexus,
 * not "Nexus Guardian". alphalogix-atlantis/README.md currently contradicts
 * this. Flagged in docs/OPEN-QUESTIONS.md — resolve before launch. */

export type ProductStatus = 'in-development' | 'private-beta' | 'available'

export interface Product {
  slug: string
  name: string
  /** The one-line role in the platform, from the repos' own shorthand. */
  role: string
  positioning: string
  problem: string
  status: ProductStatus
  statusLabel: string
  /** Honest note on maturity. Shown on the page, not hidden. */
  maturity: string
  accent: 'nexus' | 'guardian' | 'sage'
  capabilities: { title: string; body: string }[]
  /** Where the product itself will live, vs this marketing page. */
  appDomain?: string
  listed: boolean
}

export const products: Product[] = [
  {
    slug: 'guardian',
    name: 'Guardian',
    role: 'Guardian sees.',
    positioning: 'Private edge video intelligence.',
    problem:
      'Conventional analytics alert on everything a model happens to notice, so operators learn to ignore them. Guardian discards frames it cannot trust before inference runs, and treats a detection as a candidate until rules qualify it.',
    status: 'in-development',
    statusLabel: 'In development',
    maturity:
      'Architecture, event contracts and domain logic are complete and documented across 23 decision records. The processing pipeline is not yet running. We are not taking production orders.',
    accent: 'guardian',
    capabilities: [
      {
        title: 'Processed on site, by default',
        body: 'Video is processed locally on a Guardian node at your premises. It leaves site only under an explicit policy you set. The node keeps working when the WAN does not.',
      },
      {
        title: 'A detection is not an incident',
        body: 'Model output passes through tracking, zone, dwell and line-crossing rules before anything reaches an operator. Qualification records how many observations collapsed into one incident.',
      },
      {
        title: 'Quality gate before inference',
        body: 'Dust, low light, IR switching, defocus and insufficient pixel density are rejected up front and recorded as uncertain rather than guessed at.',
      },
      {
        title: 'Evidence that holds up',
        body: 'Annotated trigger frame immediately, clip assembled asynchronously, hashed and retained. The audit trail is append-only, enforced by the database.',
      },
      {
        title: 'Shadow mode before live',
        body: 'No detection reaches an operator without first running in shadow — persisted and reviewable, published to nobody — so you tune against your own site before you trust it.',
      },
      {
        title: 'No recognition. At all.',
        body: 'No facial recognition, licence plate recognition, watchlists or appearance search. Not disabled behind a flag — absent from the product.',
      },
    ],
    listed: true,
  },
  {
    slug: 'nexus',
    name: 'Nexus',
    role: 'Nexus orchestrates.',
    positioning: 'The customer portal for your estate.',
    problem:
      'Most managed-service customers have no way to see what they actually have, or whether it is online right now, without emailing someone and waiting.',
    status: 'in-development',
    statusLabel: 'In development',
    maturity:
      'Portal, tenancy model, magic-link authentication and server-side access control are built, with automated cross-tenant isolation tests. Live device status integration is still being verified against the upstream API.',
    accent: 'nexus',
    appDomain: 'nexus.alphalogix.com.au',
    capabilities: [
      {
        title: 'Portfolio view across every site',
        body: 'One organisation-wide view of your sites with camera counts and live online/offline status, instead of a spreadsheet someone updates monthly.',
      },
      {
        title: 'Access that matches your org chart',
        body: 'Organisation hierarchy, per-site access mappings and role-based views. A site manager sees their site; a group owner sees the portfolio.',
      },
      {
        title: 'No passwords to leak',
        body: 'Sign-in is by emailed magic link. There is no password to reuse, phish or store.',
      },
      {
        title: 'Isolation proven by test, not policy',
        body: 'Permitted sites are resolved server-side from your authenticated session and never from anything the browser sends. Automated tests assert one customer cannot reach another’s data via a crafted request.',
      },
      {
        title: 'Status you can trust to be current',
        body: 'Device state is read live from the monitoring platform rather than copied into a second database that can silently drift.',
      },
    ],
    listed: true,
  },
  {
    slug: 'sage',
    name: 'Sage',
    role: 'Sage advises.',
    positioning: 'The advisory layer inside Nexus.',
    problem: NEEDS_INPUT,
    status: 'in-development',
    statusLabel: 'Not yet announced',
    maturity:
      'Exists in the repositories as the AI layer of the platform — investigation, summaries, trends and recommendations, authoritative for nothing. Not ready to be a public page.',
    accent: 'sage',
    capabilities: [],
    /** Deliberately not on the site yet. It is real in the codebase but has no
     *  public positioning, and shipping a page for it would be announcing a
     *  product by accident. See docs/OPEN-QUESTIONS.md. */
    listed: false,
  },
]

export const listedProducts = products.filter((p) => p.listed)

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export interface LifecycleStage {
  n: number
  label: string
  detail: string
  /** Stages that carry the actual argument. Rendered heavier and held longer. */
  emphasis?: boolean
}

/** Guardian's 9-stage incident lifecycle, from GUARDIAN_V0_1_ARCHITECTURE.md §3.
 *  Rendered by components/incident-pipeline.tsx. This is the real pipeline —
 *  keep it in step with the architecture doc rather than simplifying for effect. */
export const incidentLifecycle: LifecycleStage[] = [
  {
    n: 1,
    label: 'Quality gate',
    detail:
      'Dust, low light, IR switch, defocus and pixel density are assessed first. A frame that fails is recorded as uncertain — it is never guessed at.',
    emphasis: true,
  },
  {
    n: 2,
    label: 'Zone crop',
    detail: 'Only the configured detection zone is inferred. The rest of the frame is not examined.',
  },
  {
    n: 3,
    label: 'Inference',
    detail: 'Runs on the node, on an engine built for that node’s own hardware.',
  },
  {
    n: 4,
    label: 'Detection',
    detail: 'A detection is not an incident. Nothing has been raised yet.',
    emphasis: true,
  },
  {
    n: 5,
    label: 'Track',
    detail: 'The detection is associated with an existing track, or opens a new one.',
  },
  {
    n: 6,
    label: 'Rules',
    detail: 'Persistence, threshold, dwell, line crossing and suppression are applied.',
  },
  {
    n: 7,
    label: 'Qualify',
    detail:
      'An incident is created with a stable reference, and a count of how many observations collapsed into it.',
  },
  {
    n: 8,
    label: 'Evidence',
    detail: 'The annotated trigger frame is written immediately; the clip is assembled after.',
  },
  {
    n: 9,
    label: 'Publish',
    detail:
      'In shadow mode it is persisted and reviewable but published to nobody. Only when live does it reach an operator.',
    emphasis: true,
  },
]

/** Re-exported so existing imports keep working. Defined in lib/contact.ts,
 *  which is the single source of truth for every link on the site. */
export { wpRoutes } from './contact'

export const company = {
  name: 'Alphalogix',
  /** Retained from the current title tag — the phrase this domain has been
   *  accumulating relevance for since 2022. Do not drop it from <title>. */
  seoPrimary: 'Managed IT Services Australia',
  foundedCopy: 'Serving Australian businesses since 2022',
  platformLine: 'Guardian sees. Nexus orchestrates. Sage advises.',
} as const

/* ── Carried over from the existing WordPress landing page ─────────────────
 * These are the genuinely load-bearing credibility assets on the current site.
 * The vendor list in particular is what makes the pivot story credible: this
 * is a company that has deployed every major surveillance platform in
 * Australia, not a startup with an opinion about video. Do not drop it. */

export const surveillancePartners = [
  'Milestone XProtect',
  'Genetec Security Center',
  'Avigilon',
  'Verkada',
  'Nx Witness',
] as const

export const cloudPartners = [
  'Microsoft Azure',
  'Amazon Web Services',
  'Google Cloud',
  'Microsoft 365',
] as const

export const industries = [
  'Corporate & Professional Services',
  'Construction & Infrastructure',
  'Logistics & Warehousing',
  'Healthcare & Medical',
  'Education & Government',
  'Retail & Hospitality',
] as const

export const officeAddress = 'Suite 104, 235 Clarence Street, Sydney NSW 2000' as const

/* ── Editorial: blog posts and case studies ────────────────────────────────
 * All URLs and dates taken from https://alphalogix.com.au/post-sitemap.xml —
 * the authoritative list. Titles are the published headlines.
 *
 * These live on WordPress and are untouched by this app. They are surfaced
 * here because the landing page is the homepage, and the homepage is the
 * primary internal link source for this content. The previous Elementor
 * homepage carried Blog and Case Study sections; dropping them would cut
 * internal linking to the only genuinely rankable content the business has. */

export interface Article {
  title: string
  href: string
  /** Published date from the sitemap, ISO. */
  date: string
  /** Rough subject, used to group. 'surveillance' posts are Guardian's market. */
  topic: 'surveillance' | 'security' | 'operations' | 'build'
}

export const posts: Article[] = [
  {
    title: 'We Just Helped a Client Recover From a Hack. Here’s What We Found Hiding in Their Inbox.',
    href: '/blog/phishing-attack-hidden-outlook-rule-small-business/',
    date: '2026-07-28',
    topic: 'security',
  },
  {
    title: 'We Have Zero Coding Experience. Here’s How We Built Two Working Business Tools With AI.',
    href: '/blog/building-internal-business-tools-with-ai-no-code/',
    date: '2026-07-21',
    topic: 'build',
  },
  {
    title: 'The Law Is Changing Fast on Retail Crime in Australia. So Is Public Attitude.',
    href: '/blog/retail-crime-laws-culture-shift-australia/',
    date: '2026-07-19',
    topic: 'surveillance',
  },
  {
    title: 'Retail Theft in Australia Just Hit a 21-Year High. Here’s What the Numbers Actually Mean.',
    href: '/blog/retail-theft-australia-surveillance-evaluation-guide/',
    date: '2026-07-15',
    topic: 'surveillance',
  },
  {
    title: 'Windows 365 Cloud PC Setup: A Complete Provisioning Walkthrough',
    href: '/blog/windows-365-cloud-pc-provisioning-setup-australia/',
    date: '2026-07-14',
    topic: 'operations',
  },
  {
    title: 'The First 10 Minutes of a Network Outage — What a Good IT Partner Actually Does',
    href: '/blog/network-outage-response-first-10-minutes/',
    date: '2026-07-05',
    topic: 'operations',
  },
  {
    title: 'The Confrontation Is the Incident. Here’s What AI Surveillance Actually Changes.',
    href: '/blog/retail-security-ai-surveillance-confrontation-australia/',
    date: '2026-07-02',
    topic: 'surveillance',
  },
  {
    title: 'Why Every Shared Office Should Segment Its Network — VLANs, Explained',
    href: '/blog/office-network-segmentation-vlans/',
    date: '2026-07-01',
    topic: 'operations',
  },
  {
    title: 'AI Hazard Detection for Retail & Shopping Centres',
    href: '/blog/ai-hazard-detection-shopping-centres-australia/',
    date: '2026-06-23',
    topic: 'surveillance',
  },
]

export const caseStudies: Article[] = [
  {
    title:
      'Three Companies, One Office, One Network — How We Built (and Fixed) a Multi-Tenant Network in Sydney',
    href: '/case-study/multi-tenant-network-build-sydney-suite-1202/',
    date: '2026-06-29',
    topic: 'operations',
  },
]

/** Posts about retail crime and AI surveillance in Australia — Guardian's
 *  exact market. Four of nine posts already sit in it. */
export const surveillancePosts = posts.filter((p) => p.topic === 'surveillance')

/** Newest first, for the landing page. */
export const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
