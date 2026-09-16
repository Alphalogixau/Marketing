/**
 * Prefixes a public-directory path with the build's basePath.
 *
 * Next.js rewrites basePath into next/link hrefs, next/image sources and its
 * own emitted asset URLs — but NOT into hand-written strings like
 * `<img src="/brand/logo.png">`. Under a basePath build those stay absolute
 * and 404, which is exactly how the preview shipped a broken logo: the build
 * was green, the root render check passed, and only serving the export from
 * the sub-path exposed it.
 *
 * Use this for anything under public/ that is referenced by hand.
 *
 * Do NOT use it for links to WordPress-served pages (/service/*, /blog/*).
 * Those point at the other origin and must stay absolute.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${path}`
}
