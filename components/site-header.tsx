'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { services } from '@/lib/content'
import { wpRoutes, hq, helpdeskUrl } from '@/lib/contact'
import { Wordmark } from '@/components/logo'

const platformItems = [
  {
    href: '/platform/nexus/',
    name: 'Nexus',
    blurb: 'Operations platform',
    dot: 'bg-nexus-400',
  },
  {
    href: '/platform/guardian/',
    name: 'Guardian',
    blurb: 'Security platform',
    dot: 'bg-guardian-400',
  },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<'platform' | 'services' | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close flyouts on Escape — keyboard users shouldn't be trapped.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-navy-900/85 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-white" aria-label="Alphalogix home">
          <Wordmark className="h-6 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden flex-1 items-center gap-1 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <FlyoutTrigger
            label="Platform"
            open={openMenu === 'platform'}
            onOpen={() => setOpenMenu('platform')}
          >
            <div className="w-72 p-2">
              {platformItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
                >
                  <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', item.dot)} />
                  <span>
                    <span className="block text-sm font-medium text-white">{item.name}</span>
                    <span className="block text-xs text-navy-300">{item.blurb}</span>
                  </span>
                </Link>
              ))}
              <Link
                href="/platform/"
                className="mt-1 block rounded-lg p-3 text-xs font-medium text-nexus-400 transition-colors hover:bg-white/5"
              >
                Platform overview →
              </Link>
            </div>
          </FlyoutTrigger>

          <FlyoutTrigger
            label="Services"
            open={openMenu === 'services'}
            onOpen={() => setOpenMenu('services')}
          >
            <div className="grid w-[30rem] grid-cols-2 gap-1 p-2">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={s.href}
                  className="rounded-lg p-3 text-sm text-navy-200 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </FlyoutTrigger>

          <a href={wpRoutes.caseStudies} className={navLink}>
            Case Studies
          </a>
          <a href={wpRoutes.about} className={navLink}>
            About
          </a>
          <a
            href={helpdeskUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={navLink}
          >
            Helpdesk
          </a>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${hq.tel}`}
            className="rounded-full px-3 py-2 text-sm font-medium tabular-nums text-navy-200 transition-colors hover:text-white"
          >
            {hq.phone}
          </a>
          <a
            href={wpRoutes.contact}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.03] active:scale-100"
          >
            Book a consultation
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="ml-auto rounded-md p-2 text-white lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-white/10 bg-navy-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-6 px-4 py-6">
              <MobileGroup title="Platform">
                {platformItems.map((i) => (
                  <Link key={i.href} href={i.href} className={mobileLink}>
                    {i.name}
                  </Link>
                ))}
              </MobileGroup>
              <MobileGroup title="Services">
                {services.map((s) => (
                  <a key={s.slug} href={s.href} className={mobileLink}>
                    {s.title}
                  </a>
                ))}
              </MobileGroup>
              <a
                href={helpdeskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={mobileLink}
              >
                Helpdesk
              </a>
              <a
                href={`tel:${hq.tel}`}
                className="block rounded-full border border-white/20 px-4 py-3 text-center text-sm font-semibold tabular-nums text-white"
              >
                Call {hq.phone}
              </a>
              <a
                href={wpRoutes.contact}
                className="block rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-navy-900"
              >
                Book a consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const navLink =
  'rounded-md px-3 py-2 text-sm text-navy-200 transition-colors hover:text-white'
const mobileLink =
  'block rounded-md px-3 py-2 text-sm text-navy-200 hover:bg-white/5 hover:text-white'

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-navy-300">
        {title}
      </p>
      {children}
    </div>
  )
}

function FlyoutTrigger({
  label,
  open,
  onOpen,
  children,
}: {
  label: string
  open: boolean
  onOpen: () => void
  children: React.ReactNode
}) {
  return (
    <div className="relative" onMouseEnter={onOpen}>
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        className={cn(navLink, 'flex items-center gap-1', open && 'text-white')}
      >
        {label}
        <ChevronDown
          className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-1 overflow-hidden rounded-xl border border-white/10 bg-navy-800/95 shadow-2xl shadow-navy-950/50 backdrop-blur-xl"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
