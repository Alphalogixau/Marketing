/**
 * Verifies a PREVIEW_BASE_PATH build actually works when served from that
 * sub-path — the failure mode is silent: the HTML renders but every asset
 * 404s, so the page arrives unstyled with no JavaScript.
 *
 * Mounts out/ at the base path, loads each route, and fails on any non-200
 * response, console error, or missing stylesheet.
 *
 * Usage: PREVIEW_BASE_PATH=/web-preview npm run verify:preview
 */
import { chromium } from 'playwright'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.PREVIEW_BASE_PATH || '/web-preview'
const ROOT = path.resolve('out')
const PORT = 4401

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.txt': 'text/plain', '.ico': 'image/x-icon',
}

const requested = []

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  requested.push(url)
  // Serve out/ mounted at BASE, exactly as the tools hub would.
  if (!url.startsWith(BASE)) {
    res.writeHead(404); res.end('outside base path'); return
  }
  const rel = url.slice(BASE.length) || '/'
  let file = path.join(ROOT, rel)
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!fs.existsSync(file)) file = path.join(ROOT, `${rel}.html`)
    if (!fs.existsSync(file)) { res.writeHead(404); res.end('not found'); return }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' })
    res.end(fs.readFileSync(file))
  } catch {
    res.writeHead(500); res.end('error')
  }
})

await new Promise((r) => server.listen(PORT, r))

const failures = []
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
})

for (const route of ['/', '/platform/', '/platform/guardian/', '/platform/nexus/']) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  const bad = []
  page.on('console', (m) => { if (m.type() === 'error') bad.push(`console: ${m.text()}`) })
  page.on('pageerror', (e) => bad.push(`pageerror: ${e.message}`))
  page.on('response', (r) => {
    if (r.status() >= 400) bad.push(`${r.status()} ${r.url().replace(`http://127.0.0.1:${PORT}`, '')}`)
  })

  const url = `http://127.0.0.1:${PORT}${BASE}${route}`
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900)

  // A stylesheet that failed to load is the classic symptom of a wrong
  // assetPrefix: the DOM is fine, the page looks broken.
  const styled = await page.evaluate(() => {
    const el = document.querySelector('body')
    return el ? getComputedStyle(el).backgroundColor : ''
  })
  if (!styled || styled === 'rgba(0, 0, 0, 0)' || styled === 'transparent') {
    failures.push(`${route}: body has no background — stylesheet did not load`)
  }

  // Assets must be requested under the base path, never at the server root.
  const leaked = requested.filter((u) => u.startsWith('/_next/'))
  if (leaked.length) {
    failures.push(`${route}: ${leaked.length} asset(s) requested outside the base path, e.g. ${leaked[0]}`)
  }

  for (const b of bad) failures.push(`${route}: ${b}`)
  await ctx.close()
}

await browser.close()
server.close()

if (failures.length) {
  console.error(`\nverify-preview failed with ${failures.length} issue(s):\n`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`verify-preview passed: 4 routes served correctly from ${BASE}`)
