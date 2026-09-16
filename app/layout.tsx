import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL('https://alphalogix.com.au'),
  title: {
    // The existing title tag's primary phrase is retained deliberately — this
    // domain has been accumulating relevance for it since 2022 and the rebuild
    // must not discard that. See docs/SEO-CONTINUITY.md
    default: `${company.seoPrimary} | ${company.name}`,
    template: `%s | ${company.name}`,
  },
  description:
    'Alphalogix is an Australian managed IT partner building private edge video intelligence and estate visibility for the sites we look after. Managed IT, cyber security, cloud, unified communications and surveillance integration.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: company.name,
    url: 'https://alphalogix.com.au/',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        {/* Scroll reveals set opacity:0 inline. Without JS the observer never
            fires and the page would render blank below the hero. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-navy-950 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-900"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
