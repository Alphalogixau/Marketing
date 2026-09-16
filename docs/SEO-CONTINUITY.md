# SEO continuity

The domain has been accumulating relevance since 2022. Three things protect it.

## 1. The `<title>` phrase is retained

The current site's title tag is `Managed IT Services Australia | Alphalogix`.
That primary phrase is preserved in `app/layout.tsx` metadata. Do not replace
it with a platform-only title — the products have no search demand yet and the
services do.

## 2. The landing page keeps linking to all six service pages

`app/page.tsx` contains a services section linking to every live
`/service/*` URL. **This is load-bearing, not filler.** The homepage is the
primary internal link source for those pages, and they are the only pages
currently earning organic traffic. Removing that section to make room for
product content would cut the link equity feeding the pages that pay the bills.

The footer carries the same six links as a second path.

## 3. No URL changes

The new landing page is served at `/` — the same URL as the old WordPress
homepage. No redirect is required and no authority is lost. Service page URLs
are untouched. **If that ever changes, a 301 map is mandatory before launch,
not after.**

## Defects on the current WordPress homepage, still to fix

Found while auditing the live site. These are in WordPress, not this repo:

- **Duplicate `<h1>`.** Two separate Elementor heading widgets
  (`elementor-element-f827f3e` and `elementor-element-cbf45fb`) both render
  `<h1>Smarter Surveillance</h1>`. One page, one H1.
- **Title/H1 mismatch.** The title tag targets managed IT; the largest heading
  on the page is about surveillance. The new landing page resolves this.
- **440KB of homepage HTML** across 55 CSS/JS assets.

Once `/` is served by this app these stop mattering for the homepage, but the
same Elementor patterns likely affect the service pages — worth an audit.
