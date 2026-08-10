import type { IconNode } from 'lucide-react'
import { MorphIcon } from 'morphicons/react'
import type { ComponentPropsWithoutRef } from 'react'

/**
 * The single place the site depends on `morphicons`.
 *
 * The package is young (1.6.0, published August 2026, one maintainer), so it is
 * pinned to an exact version and confined here: if it ever needs to go, this
 * file becomes a plain <Icon /> and nothing else changes.
 *
 * Why it fits: it consumes Lucide's own `IconNode` arrays, which the portfolio
 * already uses everywhere, and it shares one requestAnimationFrame loop across
 * every icon on screen rather than running a timer per icon.
 *
 * Rules for using it, so this stays craft and not decoration:
 *   - State changes only. Never a loop, never an idle wiggle.
 *   - The two icons must mean something to each other (copy → check,
 *     menu → close). A morph between unrelated glyphs just reads as noise.
 *   - Always pass `label`, or leave it off deliberately when a sibling element
 *     already names the control.
 */

/** Lucide exports icon data as `IconName.__iconNode`; that array is what MorphIcon takes. */
export type MorphIconData = IconNode

interface MorphingIconProps
  extends Omit<ComponentPropsWithoutRef<typeof MorphIcon>, 'icon' | 'reducedMotion'> {
  /** The icon to display. Changing it animates from the previous one. */
  icon: MorphIconData
  /** Accessible name. Omit only when an adjacent label already names the control. */
  label?: string
}

export function MorphingIcon({
  icon,
  label,
  strokeWidth = 1.75,
  size = 16,
  spring = 'snappy',
  ...props
}: MorphingIconProps) {
  return (
    <MorphIcon
      icon={icon}
      label={label}
      size={size}
      strokeWidth={strokeWidth}
      spring={spring}
      // Honour the OS setting: with reduce-motion on, a morph becomes an
      // instant swap. The library defaults to "never", which animates regardless.
      reducedMotion="user"
      {...props}
    />
  )
}
