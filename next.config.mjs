/**
 * PREVIEW_BASE_PATH builds the same site to be served from a sub-path rather
 * than the domain root. It exists for the staff preview copied into
 * alphalogix-tools at /web-preview/ — without it the absolute /_next/* asset
 * paths resolve against the hub root and every asset 404s.
 *
 * Normal builds leave it unset and serve from "/".
 */
const basePath = process.env.PREVIEW_BASE_PATH || undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // basePath does NOT rewrite raw <img src="/..."> strings — only next/link,
  // next/image and framework-emitted asset URLs. Anything hand-written must
  // prefix itself, so the value is exposed here. See lib/asset.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath ?? '' },
  // Static export -> /out, matching the Azure Static Web Apps workflow in .github/workflows
  output: 'export',
  // Serves "/" (landing page) and "/platform/*" (product pages).
  // A Cloudflare path rule keeps /service/*, /blog/*, /about-us, /case-study
  // and /contact-us on the existing WordPress origin. See docs/ROUTING.md
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default nextConfig
