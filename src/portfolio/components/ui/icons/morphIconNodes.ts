import type { MorphIconData } from './MorphingIcon'

/**
 * Path data for the icons the site morphs between.
 *
 * These are copied from Lucide (ISC licence) rather than imported, because
 * lucide-react ships no `exports` map: the only way to reach an icon's
 * `__iconNode` is `lucide-react/dist/esm/icons/<name>.mjs`, an internal path
 * that a minor bump is free to move. Five short arrays are a cheaper thing to
 * own than a build that breaks on `pnpm update`.
 *
 * Source: https://lucide.dev — keep names and data identical to the upstream
 * icon so the rendered glyph matches the <Icon /> components used elsewhere.
 */

export const ARROW_RIGHT: MorphIconData = [
  ['path', { d: 'M5 12h14' }],
  ['path', { d: 'm12 5 7 7-7 7' }],
]

export const LOADER_CIRCLE: MorphIconData = [['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56' }]]

export const CIRCLE_CHECK: MorphIconData = [
  ['circle', { cx: '12', cy: '12', r: '10' }],
  ['path', { d: 'm9 12 2 2 4-4' }],
]

export const COPY: MorphIconData = [
  ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }],
  ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }],
]

export const CHECK: MorphIconData = [['path', { d: 'M20 6 9 17l-5-5' }]]
