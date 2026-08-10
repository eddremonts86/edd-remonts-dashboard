/**
 * Builds `<source>` sets for the AVIF/WebP variants produced by
 * `scripts/media/optimize-images.sh`.
 *
 * The variants follow one convention: `<path>/<name>-<width>.<ext>` next to the
 * original. The original stays as the `<img src>` fallback, so a browser
 * without AVIF or WebP still gets a picture, and a variant that was never
 * generated simply never appears in a srcset.
 *
 * Worth the plumbing: edd_light.jpg is 1,994 KB, its 1600px AVIF is 66 KB.
 */

/** Widths the script emits. Keep in sync with PORTRAIT_WIDTHS / COVER_WIDTHS. */
export const PORTRAIT_WIDTHS = [480, 960, 1600] as const
export const COVER_WIDTHS = [400, 800] as const

export interface PictureSources {
  avif: string
  webp: string
  fallback: string
}

/**
 * @param src     original path, e.g. `/edd/edd_light.jpg`
 * @param widths  variant widths that exist for it
 */
export function pictureSources(src: string, widths: readonly number[]): PictureSources {
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')

  return { avif: set('avif'), webp: set('webp'), fallback: src }
}
