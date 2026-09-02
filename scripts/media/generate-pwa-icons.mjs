/**
 * Generates the PNG app icons a PWA needs, from public/favicon.svg.
 *
 * The manifest used to declare favicon.svg and nothing else. Chrome will not
 * offer "Install" without a raster icon of at least 192px, and iOS ignores the
 * manifest entirely — it reads apple-touch-icon. So an SVG-only icon set means
 * the app is not installable on either platform, which is most of why this
 * site was not a PWA.
 *
 * The glyph is composited onto an opaque background on purpose: favicon.svg
 * has none, and a transparent icon renders as letters floating on whatever
 * the home screen happens to be.
 *
 * Two shapes, because Android crops:
 *   any      — glyph at 72% of the canvas, shown as drawn
 *   maskable — glyph at 46%, inside the safe zone Android may crop to a
 *              circle. Reusing the "any" art as maskable clips the monogram.
 *
 * Idempotent and safe to re-run: every file is rewritten from the SVG.
 *
 * Usage: node scripts/media/generate-pwa-icons.mjs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'

// sharp ships platform binaries and is a devDependency; resolving it through
// require keeps this script working under pnpm's strict node_modules layout.
const sharp = createRequire(import.meta.url)('sharp')

const SRC = 'public/favicon.svg'
const OUT = 'public/icons'
/** Matches theme-color in __root.tsx and background_color in the manifest. */
const BG = { r: 10, g: 10, b: 10, alpha: 1 }

/** Rendered large once per shape, then downscaled: the monogram's 10px bars
 *  alias badly when rasterised straight to 192. */
const MASTER = 1024

const SHAPES = { any: 0.72, maskable: 0.46 }

const TARGETS = [
  { shape: 'any', size: 512, name: 'icon-512.png' },
  { shape: 'any', size: 192, name: 'icon-192.png' },
  { shape: 'maskable', size: 512, name: 'icon-maskable-512.png' },
  { shape: 'maskable', size: 192, name: 'icon-maskable-192.png' },
  // iOS rounds the corners itself and adds no padding, so it takes the "any" art.
  { shape: 'any', size: 180, name: 'apple-touch-icon.png' },
]

const svg = await readFile(SRC)
await mkdir(OUT, { recursive: true })

const masters = {}
for (const [shape, scale] of Object.entries(SHAPES)) {
  const glyph = Math.round(MASTER * scale)
  const rendered = await sharp(svg, { density: 600 })
    .resize(glyph, glyph, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  masters[shape] = await sharp({
    create: { width: MASTER, height: MASTER, channels: 4, background: BG },
  })
    .composite([{ input: rendered, gravity: 'centre' }])
    .png()
    .toBuffer()
}

for (const { shape, size, name } of TARGETS) {
  const out = await sharp(masters[shape])
    .resize(size, size)
    // No alpha channel: iOS renders a transparent apple-touch-icon as black,
    // and a flattened icon is smaller everywhere else.
    .flatten({ background: BG })
    .png({ compressionLevel: 9 })
    .toBuffer()
  await writeFile(join(OUT, name), out)
  console.log(`  ${name.padEnd(28)} ${size}×${size}  ${(out.length / 1024).toFixed(1)} KB`)
}

console.log('\ndone. Referenced from public/manifest.json and src/routes/__root.tsx.')
