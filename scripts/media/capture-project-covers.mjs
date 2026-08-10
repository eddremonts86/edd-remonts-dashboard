/**
 * Captures cover screenshots for the live projects.
 *
 * These are real screenshots of the deployed sites, not mockups or stock: the
 * landing claims "everything below is live", so the covers have to be the
 * actual product. Re-run after a redesign to refresh them.
 *
 *   node scripts/media/capture-project-covers.mjs [slug...]
 *
 * With no arguments it captures every entry in TARGETS. Output lands in
 * public/projects/<slug>-cover.png; run scripts/media/optimize-images.sh
 * afterwards to produce the AVIF/WebP variants the page actually serves.
 */
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const TARGETS = [
  { slug: 'builderhunt', url: 'https://builderhunt.dev' },
  { slug: 'geolocal', url: 'https://geo.eduardoinerarte.dk' },
  { slug: 'ai-shadcn-chat', url: 'https://ai-chat.eduardoinerarte.dk' },
  { slug: 'ai-os', url: 'https://ai-os.eduardoinerarte.dk' },
]

const VIEWPORT = { width: 1440, height: 1080 }

const only = process.argv.slice(2)
const targets = only.length ? TARGETS.filter((t) => only.includes(t.slug)) : TARGETS

await mkdir('public/projects', { recursive: true })

// Playwright's default headless build is a separate download ("headless shell")
// that a fresh checkout often lacks. PLAYWRIGHT_CHROMIUM_PATH points at any
// Chromium already on the machine so this script does not require it.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined
const browser = await chromium.launch(executablePath ? { executablePath } : {})
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  // Some of these sites open with an entrance animation; a dark scheme matches
  // the portfolio's own presentation.
  colorScheme: 'dark',
})

for (const { slug, url } of targets) {
  const page = await context.newPage()
  const out = `public/projects/${slug}-cover.png`
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 })
    // Let intro animations settle so the shot is the resting state.
    await page.waitForTimeout(3500)
    await page.screenshot({ path: out })
    console.log(`  ok    ${slug.padEnd(16)} ${url}`)
  } catch (err) {
    // One unreachable site must not lose the other three.
    console.error(`  FAIL  ${slug.padEnd(16)} ${url}\n        ${err.message.split('\n')[0]}`)
  } finally {
    await page.close()
  }
}

await browser.close()
