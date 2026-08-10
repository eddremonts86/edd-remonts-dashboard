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

export const MENU: MorphIconData = [
  ['path', { d: 'M4 5h16' }],
  ['path', { d: 'M4 12h16' }],
  ['path', { d: 'M4 19h16' }],
]

export const X: MorphIconData = [
  ['path', { d: 'M18 6 6 18' }],
  ['path', { d: 'm6 6 12 12' }],
]

export const PLUS: MorphIconData = [
  ['path', { d: 'M5 12h14' }],
  ['path', { d: 'M12 5v14' }],
]

/** Deliberately the same first path as PLUS: the vertical stroke is what flies. */
export const MINUS: MorphIconData = [['path', { d: 'M5 12h14' }]]

export const SUN: MorphIconData = [
  ['circle', { cx: '12', cy: '12', r: '4' }],
  ['path', { d: 'M12 2v2' }],
  ['path', { d: 'M12 20v2' }],
  ['path', { d: 'm4.93 4.93 1.41 1.41' }],
  ['path', { d: 'm17.66 17.66 1.41 1.41' }],
  ['path', { d: 'M2 12h2' }],
  ['path', { d: 'M20 12h2' }],
  ['path', { d: 'm6.34 17.66-1.41 1.41' }],
  ['path', { d: 'm19.07 4.93-1.41 1.41' }],
]

export const MOON: MorphIconData = [
  [
    'path',
    {
      d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
    },
  ],
]

export const ARROW_DOWN: MorphIconData = [
  ['path', { d: 'M12 5v14' }],
  ['path', { d: 'm19 12-7 7-7-7' }],
]
