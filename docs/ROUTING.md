# Routing: two stacks, one domain

`alphalogix.com.au` is served by two origins. This is deliberate — the
WordPress pages are the only ones currently earning organic traffic and there
is no reason to put them at risk.

| Path | Origin | Notes |
|---|---|---|
| `/` | **Next.js** (this repo) | New landing page. Same URL as the old WP homepage, so no redirect and no authority loss. |
| `/platform`, `/platform/*` | **Next.js** (this repo) | New product pages. |
| `/service/*` | WordPress | Six service pages. **Untouched.** |
| `/blog`, `/blog/*` | WordPress | Untouched. |
| `/about-us`, `/case-study`, `/contact-us`, `/privacy-policy` | WordPress | Untouched. |
| `/wp-admin`, `/wp-content/*`, `/wp-json/*` | WordPress | Must not be intercepted. |

## Implementing the split

Path-based routing across two origins needs a proxy layer. Cloudflare is the
cheap, standard option:

1. Point `alphalogix.com.au` DNS at Cloudflare (proxied).
2. Origin rules: route `/` and `/platform/*` to the Azure Static Web App;
   everything else to the WordPress origin.
3. Keep `/wp-*` explicitly on WordPress so nothing shadows the admin.

A subdomain (`platform.alphalogix.com.au`) would avoid the proxy but split
domain authority across two hostnames. Not recommended.

## Outstanding

- **Two Azure SWA workflows exist** in `.github/workflows` — `gray-coast` and
  `purple-hill` — both deploying this repo on every push to `main`. That is two
  deployments of the same content to two different Static Web Apps. Decide
  which one is canonical and delete the other workflow.
- **WordPress header.** Pages served by WordPress still render the Elementor
  header, which has no "Platform" link. Add one nav item in Elementor so
  visitors on `/service/*` can reach the new pages.
