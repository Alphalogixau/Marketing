import Link from 'next/link'
import { MapPin, Mail } from 'lucide-react'
import { services, company } from '@/lib/content'
import {
  contact,
  socials,
  wpRoutes,
  offices,
  nexusAppUrl,
  helpdeskUrl,
} from '@/lib/contact'
import { Wordmark } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block text-white" aria-label="Alphalogix home">
              <Wordmark className="h-7 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              {company.seoPrimary}. {company.foundedCopy}.
            </p>

            <address className="mt-6 space-y-3 not-italic text-sm">
              <a
                href={contact.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-navy-300" />
                <span>{contact.address}</span>
              </a>
              <a
                href={contact.emailHref}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-navy-300" />
                <span>{contact.email}</span>
              </a>
            </address>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-white"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterCol title="Platform">
            <FooterLink href="/platform/nexus/">Nexus</FooterLink>
            <FooterLink href="/platform/guardian/">Guardian</FooterLink>
            <FooterLink href="/platform/">Overview</FooterLink>
            <li>
              <a
                href={nexusAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-white"
              >
                Nexus sign-in
              </a>
            </li>
          </FooterCol>

          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={s.href} external>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href={wpRoutes.about} external>About us</FooterLink>
            <FooterLink href={wpRoutes.caseStudies} external>Case studies</FooterLink>
            <FooterLink href={wpRoutes.blog} external>Blog</FooterLink>
            <FooterLink href={wpRoutes.contact} external>Contact</FooterLink>
            <li>
              <a
                href={helpdeskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-white"
              >
                Helpdesk
              </a>
            </li>
          </FooterCol>
        </div>

        {/* Every state, every number, as a tel: link. */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
            Call your state
          </h3>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <li key={o.state}>
                <a
                  href={`tel:${o.tel}`}
                  className="flex items-baseline gap-2 text-sm transition-colors hover:text-white"
                >
                  <span className="w-8 shrink-0 font-mono text-xs uppercase tracking-wider text-navy-300">
                    {o.state}
                  </span>
                  <span className="tabular-nums">{o.phone}</span>
                  {o.hq && <span className="text-[0.625rem] text-msp-400">HQ</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <a href={wpRoutes.privacy} className="transition-colors hover:text-white">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  return (
    <li>
      {external ? (
        <a href={href} className="text-sm transition-colors hover:text-white">
          {children}
        </a>
      ) : (
        <Link href={href} className="text-sm transition-colors hover:text-white">
          {children}
        </Link>
      )}
    </li>
  )
}
