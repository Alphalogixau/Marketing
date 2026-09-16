/**
 * The official Alphalogix horizontal wordmark.
 *
 * Source: assets/logos/alphalogix-horizontal-white.png from
 * alphalogixaus/alphalogix-tools — the maintained brand asset, chosen over
 * the SVG extracted from the WordPress footer (kept at
 * public/brand/alphalogix-logo.svg for reference only).
 *
 * 372x72, so it stays crisp at 2x for both the header (24px tall) and the
 * footer (28px). The white is baked in, which is correct for every surface
 * that uses it — the header and footer are both dark. A dark variant
 * (alphalogix-horizontal-dark.png) exists in the tools repo if the mark ever
 * needs to sit on a light background; it is not vendored here because
 * nothing uses it yet.
 *
 * width/height are set so the browser reserves the box and the header does
 * not shift as the image loads.
 */
import { asset } from '@/lib/asset'

export function Wordmark({ className }: { className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={asset('/brand/alphalogix-horizontal-white.png')}
      alt="Alphalogix"
      width={372}
      height={72}
      className={className}
      decoding="async"
    />
  )
}
