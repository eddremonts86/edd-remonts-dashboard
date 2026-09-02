import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Installability is a checklist, and every item on it is a filename in a JSON
 * file pointing at a file on disk. Rename an icon and nothing breaks, nothing
 * logs, no test fails — the site simply stops offering "Install", and the only
 * way to find out is to try it on a phone.
 *
 * So this asserts the checklist: the manifest declares what Chrome requires,
 * the head declares what iOS requires, and every icon either side names is
 * really there at the size it claims.
 */

const root = resolve(__dirname, '../../..')
const read = (path: string) => readFileSync(resolve(root, path))
const manifest = JSON.parse(read('public/manifest.json').toString()) as {
  name: string
  short_name: string
  start_url: string
  scope: string
  display: string
  theme_color: string
  background_color: string
  icons: { src: string; sizes: string; type: string; purpose?: string }[]
}

/** Width and height out of a PNG's IHDR, which is always the first chunk. */
function pngSize(path: string): { width: number; height: number } {
  const buffer = read(path)
  expect(buffer.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
}

describe('web app manifest', () => {
  it('declares the fields a browser needs to install the app', () => {
    expect(manifest.name).toBeTruthy()
    expect(manifest.short_name).toBeTruthy()
    expect(manifest.start_url).toBe('/')
    expect(manifest.scope).toBe('/')
    expect(manifest.display).toBe('standalone')
    // Both are required for the splash screen; a missing one renders white.
    expect(manifest.theme_color).toMatch(/^#[0-9a-f]{6}$/i)
    expect(manifest.background_color).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('carries the raster icons Chrome requires, at 192 and 512', () => {
    const raster = manifest.icons.filter((icon) => icon.type === 'image/png')
    const sizes = raster.map((icon) => icon.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
  })

  it('carries a maskable icon, so Android does not crop the monogram', () => {
    const maskable = manifest.icons.filter((icon) => icon.purpose === 'maskable')
    expect(maskable.length).toBeGreaterThan(0)
    expect(maskable.map((icon) => icon.sizes)).toContain('512x512')
  })

  it('points every icon at a file that exists, at the size it claims', () => {
    for (const icon of manifest.icons) {
      expect(icon.src.startsWith('/'), `${icon.src} must be root-relative`).toBe(true)
      const path = `public${icon.src}`
      expect(() => read(path)).not.toThrow()

      if (icon.type !== 'image/png') continue
      const [width, height] = icon.sizes.split('x').map(Number)
      expect(pngSize(path), `${icon.src} is not ${icon.sizes}`).toEqual({ width, height })
    }
  })
})

describe('the iOS half, which the manifest does not cover', () => {
  const rootRoute = read('src/routes/__root.tsx').toString()

  it('declares an apple-touch-icon that exists at 180x180', () => {
    expect(rootRoute).toContain("rel: 'apple-touch-icon'")
    expect(pngSize('public/icons/apple-touch-icon.png')).toEqual({ width: 180, height: 180 })
  })

  it('declares standalone mode and a title for the home-screen shortcut', () => {
    expect(rootRoute).toContain('apple-mobile-web-app-capable')
    expect(rootRoute).toContain('apple-mobile-web-app-title')
    // The unprefixed name is the one still in the spec; ship both.
    expect(rootRoute).toContain("{ name: 'mobile-web-app-capable', content: 'yes' }")
  })

  it('links the manifest at all', () => {
    expect(rootRoute).toContain("rel: 'manifest'")
  })

  it('pairs a translucent status bar with viewport-fit=cover', () => {
    // These two only work together. A translucent status bar puts the page
    // under the clock, and the padding that saves it — StickyNav's
    // env(safe-area-inset-top) — reports 0 unless the viewport covers the
    // display. Either both, or neither.
    const translucent = rootRoute.includes('black-translucent')
    const coversDisplay = rootRoute.includes('viewport-fit=cover')
    expect(translucent).toBe(coversDisplay)
  })
})

describe('service worker', () => {
  const sw = read('public/sw.js').toString()

  it('has a fetch handler, without which Chrome will not install the app', () => {
    expect(sw).toContain("addEventListener('fetch'")
  })

  it('precaches the offline page it falls back to', () => {
    expect(sw).toContain('/offline.html')
    expect(() => read('public/offline.html')).not.toThrow()
  })

  it('never caches a non-GET request', () => {
    expect(sw).toContain("request.method !== 'GET'")
  })

  it('is served uncached, so a fix is not held behind the previous worker', () => {
    const server = read('server.prod.mjs').toString()
    expect(server).toContain("'/sw.js'")
    expect(server).toContain("'no-cache'")
  })
})
