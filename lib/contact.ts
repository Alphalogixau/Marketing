/**
 * Every outbound link and contact detail on the site, in one place.
 *
 * All values were taken from the live alphalogix.com.au pages — nothing here
 * is invented or a placeholder. The state-to-number mapping is confirmed two
 * ways: the ordering of the state list on /contact-us/ and the Australian
 * geographic area-code allocations agree.
 *
 * If you change a number here, change it on the WordPress contact page too.
 */

export interface Office {
  state: string
  stateName: string
  /** Display form, as printed on the contact page. */
  phone: string
  /** E.164, for the tel: href. */
  tel: string
  hq?: boolean
}

export const offices: Office[] = [
  { state: 'NSW', stateName: 'New South Wales',   phone: '02 8043 6550', tel: '+61280436550', hq: true },
  { state: 'ACT', stateName: 'Australian Capital Territory', phone: '02 6185 2828', tel: '+61261852828' },
  { state: 'VIC', stateName: 'Victoria',          phone: '03 9970 0568', tel: '+61399700568' },
  { state: 'TAS', stateName: 'Tasmania',          phone: '03 6213 1978', tel: '+61362131978' },
  { state: 'QLD', stateName: 'Queensland',        phone: '07 3543 2188', tel: '+61735432188' },
  { state: 'NT',  stateName: 'Northern Territory',phone: '08 7942 8858', tel: '+61879428858' },
  { state: 'SA',  stateName: 'South Australia',   phone: '08 7118 1976', tel: '+61871181976' },
  { state: 'WA',  stateName: 'Western Australia', phone: '08 6285 1628', tel: '+61862851628' },
]

export const hq = offices.find((o) => o.hq)!

export const contact = {
  email: 'Bookings@alphalogix.com.au',
  emailHref: 'mailto:Bookings@alphalogix.com.au',
  address: 'Suite 104, 235 Clarence Street, Sydney NSW 2000',
  /** Google Maps link for the HQ address. */
  addressHref:
    'https://www.google.com/maps/search/?api=1&query=Suite+104%2C+235+Clarence+Street%2C+Sydney+NSW+2000',
} as const

/** Social profiles. All confirmed live on the current site.
 *  Note: there is no Facebook page link on the site — the only facebook.com
 *  reference is the Meta pixel's <noscript> tracking image, which is not a
 *  profile. Do not add a Facebook link until someone confirms the page URL. */
export const socials = [
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/company/alphalogixaus/' },
  { name: 'Instagram', href: 'https://www.instagram.com/alphalogixaus/' },
  { name: 'X',         href: 'https://x.com/alphalogixaus' },
] as const

/** Pages served by the existing WordPress install. */
export const wpRoutes = {
  about: '/about-us/',
  contact: '/contact-us/',
  caseStudies: '/case-study/',
  blog: '/blog/',
  privacy: '/privacy-policy/',
} as const

/** The Nexus portal itself, per alphalogix-nexus/README.md. Distinct from
 *  /platform/nexus, which is the marketing page for it. */
export const nexusAppUrl = 'https://nexus.alphalogix.com.au' as const

/** The customer helpdesk — the NinjaOne-served end-user portal. There is no
 *  helpdesk page on the WordPress site, so this is the only destination for
 *  the menu item. Verified reachable (HTTP 200) on 16 Sep 2026. */
export const helpdeskUrl = 'https://alphalogix.rmmservice.com.au/' as const
