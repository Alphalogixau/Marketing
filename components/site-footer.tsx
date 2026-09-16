import Link from 'next/link'
import { services, wpRoutes, company } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-white">
              Alpha<span className="text-nexus-400">logix</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {company.seoPrimary}. {company.foundedCopy}.
            </p>
          </div>

          <FooterCol title="Platform">
            <FooterLink href="/platform/nexus/">Nexus</FooterLink>
            <FooterLink href="/platform/guardian/">Guardian</FooterLink>
            <FooterLink href="/platform/">Overview</FooterLink>
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
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
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
