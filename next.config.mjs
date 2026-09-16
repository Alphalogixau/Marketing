/** @type {import('next').NextConfig} */
const nextConfig = {
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
