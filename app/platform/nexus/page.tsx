import type { Metadata } from 'next'
import { ProductShell } from '@/components/product-shell'
import { getProduct } from '@/lib/content'

const nexus = getProduct('nexus')!

export const metadata: Metadata = {
  title: 'Nexus — Your Estate, In One View',
  description:
    'Nexus is the Alphalogix customer portal: an organisation-wide view of your sites with live online/offline status, magic-link sign-in and access control proven by automated isolation tests. In development.',
  alternates: { canonical: '/platform/nexus/' },
}

export default function NexusPage() {
  return <ProductShell product={nexus} />
}
