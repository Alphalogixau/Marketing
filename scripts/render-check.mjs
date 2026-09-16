/**
 * Renders the built static export in a real browser and asserts things the
 * build and typecheck cannot see.
 *
 * Added after a retint pass left an <h2> in navy-900 on a navy-900 section —
 * contrast ratio 1:1, the heading was invisible. `npm run build` was green,
 * `tsc --noEmit` was clean, and every static grep passed. Only rendering
 * caught it.
 *
 * Checks, per route:
 *   1. No horizontal overflow at desktop and phone widths.
 *   2. No console errors or page errors.
 *   3. WCAG AA contrast for every heading and paragraph against the
 *      background actually painted behind it.
 *
 * Usage: npm run check:render
 */
import { chromium } from 'playwright'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('out')
const PORT = 4399

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.txt': 'text/plain', '.ico': 'image/x-icon',
}

const ROUTES = ['/', '/platform/', '/platform/guardian/', '/platform/nexus/']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
]

/** Relative luminance per WCAG 2.1. */
function luminance([r, g, b]) {
  const f = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrast(fg, bg) {
  const a = luminance(fg)
  const b = luminance(bg)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

function parseRgb(s) {
  const m = s.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const parts = m[1].split(',').map((n) => parseFloat(n.trim()))
  return { rgb: parts.slice(0, 3), alpha: parts.length > 3 ? parts[3] : 1 }
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(ROOT, url)
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html')
    }
    if (!fs.existsSync(file)) file = path.join(ROOT, `${url}.html`)
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' })
    res.end(fs.readFileSync(file))
  } catch {
    res.writeHead(404)
    res.end('not found')
  }
})

const failures = []

await new Promise((r) => server.listen(PORT, r))

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
})

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await ctx.newPage()
    const consoleErrors = []
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
    page.on('pageerror', (e) => consoleErrors.push(e.message))

    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' })

    // Trigger scroll reveals so nothing is measured while still transparent.
    // Note: globals.css sets scroll-behavior:smooth, which makes scrollTo
    // animate and lag behind the loop — override it first.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto'
      const step = window.innerHeight * 0.6
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 180))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1200)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    if (overflow > 1) {
      failures.push(`${route} @${vp.name}: ${overflow}px horizontal overflow`)
    }

    for (const err of consoleErrors) {
      failures.push(`${route} @${vp.name}: console error: ${err}`)
    }

    // Contrast: walk up for the first ancestor that actually paints a
    // background, which is what the text is really sitting on.
    const lowContrast = await page.evaluate(() => {
      const out = []
      const painted = (el) => {
        let n = el
        while (n && n !== document.documentElement) {
          const bg = getComputedStyle(n).backgroundColor
          const m = bg.match(/rgba?\(([^)]+)\)/)
          if (m) {
            const p = m[1].split(',').map((x) => parseFloat(x.trim()))
            const a = p.length > 3 ? p[3] : 1
            if (a > 0.95) return bg
          }
          n = n.parentElement
        }
        return getComputedStyle(document.body).backgroundColor
      }
      // Only elements that directly own a text node. An <a> whose text lives
      // entirely in coloured children renders in the child's colour, not the
      // anchor's inherited one — measuring the anchor there is a false
      // positive.
      const ownsText = (el) =>
        Array.from(el.childNodes).some(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0,
        )
      for (const el of document.querySelectorAll('h1,h2,h3,h4,p,span,a,time,li')) {
        if (!ownsText(el)) continue
        const text = el.textContent?.trim()
        if (!text) continue
        const cs = getComputedStyle(el)
        if (cs.visibility === 'hidden' || cs.display === 'none') continue
        if (parseFloat(cs.opacity) < 0.15) continue
        if (!el.getClientRects().length) continue
        // Gradient text (background-clip: text with a transparent fill) is a
        // legitimate technique — the painted gradient is what you see, so the
        // computed colour is transparent by design and tells us nothing.
        const clip = cs.backgroundClip || cs.webkitBackgroundClip
        if (clip === 'text') continue
        out.push({
          tag: el.tagName.toLowerCase(),
          text: text.slice(0, 54),
          fg: cs.color,
          bg: painted(el),
          size: parseFloat(cs.fontSize),
          weight: cs.fontWeight,
        })
      }
      return out
    })

    for (const n of lowContrast) {
      const fg = parseRgb(n.fg)
      const bg = parseRgb(n.bg)
      if (!fg || !bg) continue
      const ratio = contrast(fg.rgb, bg.rgb)
      // WCAG AA: 3.0 for large text (>=24px, or >=18.66px bold), else 4.5.
      const large = n.size >= 24 || (n.size >= 18.66 && Number(n.weight) >= 700)
      const min = large ? 3 : 4.5
      if (ratio < min) {
        failures.push(
          `${route} @${vp.name}: contrast ${ratio.toFixed(2)}:1 (needs ${min}:1) ` +
            `on <${n.tag}> "${n.text}" — ${n.fg} on ${n.bg}`,
        )
      }
    }

    await ctx.close()
  }
}

await browser.close()
server.close()

if (failures.length) {
  console.error(`\nrender-check failed with ${failures.length} issue(s):\n`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}

console.log(`render-check passed: ${ROUTES.length} routes × ${VIEWPORTS.length} viewports`)
