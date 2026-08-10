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

export const FILE_TEXT: MorphIconData = [
  [
    'path',
    {
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
  ],
  ['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5' }],
  ['path', { d: 'M10 9H8' }],
  ['path', { d: 'M16 13H8' }],
  ['path', { d: 'M16 17H8' }],
]

export const ARROW_DOWN_TO_LINE: MorphIconData = [
  ['path', { d: 'M12 17V3' }],
  ['path', { d: 'm6 11 6 6 6-6' }],
  ['path', { d: 'M19 21H5' }],
]

export const ARROW_UP_RIGHT: MorphIconData = [
  ['path', { d: 'M7 7h10v10' }],
  ['path', { d: 'M7 17 17 7' }],
]

export const EXTERNAL_LINK: MorphIconData = [
  ['path', { d: 'M15 3h6v6' }],
  ['path', { d: 'M10 14 21 3' }],
  ['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }],
]

/* Capability-card glyphs. This file is now sixteen icons deep; if it keeps
   growing, generate it from lucide at build time rather than by hand. */

export const LAYERS: MorphIconData = [
  ['path', { d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z' }],
  ['path', { d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' }],
  ['path', { d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' }],
]

export const CPU: MorphIconData = [
  ['path', { d: 'M12 20v2' }],
  ['path', { d: 'M12 2v2' }],
  ['path', { d: 'M17 20v2' }],
  ['path', { d: 'M17 2v2' }],
  ['path', { d: 'M2 12h2' }],
  ['path', { d: 'M2 17h2' }],
  ['path', { d: 'M2 7h2' }],
  ['path', { d: 'M20 12h2' }],
  ['path', { d: 'M20 17h2' }],
  ['path', { d: 'M20 7h2' }],
  ['path', { d: 'M7 20v2' }],
  ['path', { d: 'M7 2v2' }],
  ['rect', { x: '4', y: '4', width: '16', height: '16', rx: '2' }],
  ['rect', { x: '8', y: '8', width: '8', height: '8', rx: '1' }],
]

export const SPARKLES: MorphIconData = [
  ['path', { d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z' }],
  ['path', { d: 'M20 2v4' }],
  ['path', { d: 'M22 4h-4' }],
  ['circle', { cx: '4', cy: '20', r: '2' }],
]

export const DATABASE: MorphIconData = [
  ['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }],
  ['path', { d: 'M3 5V19A9 3 0 0 0 21 19V5' }],
  ['path', { d: 'M3 12A9 3 0 0 0 21 12' }],
]
