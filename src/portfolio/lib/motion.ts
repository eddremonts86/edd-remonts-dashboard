/**
 * Shared animation constants and presets.
 * Import from '@/portfolio/lib/motion' instead of duplicating values.
 *
 * @module motion
 */

/* ── Easings ── */

/** Apple-standard cubic-bezier easing — used in 90% of UI transitions */
export const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

/* ── Spring configs (Singleton — one definition, many consumers) ── */

/** Default spring config for physics-based interactions (e.g., tilt cards) */
export const SPRING_CONFIG = { stiffness: 150, damping: 20 } as const;

/** Spring config for cursor / floating-image followers */
export const CURSOR_SPRING = { damping: 25, stiffness: 200, mass: 0.5 } as const;

/* ── Entry presets ── */

/** Standard entry animation for elements appearing from below */
export const ENTRY_INITIAL = { opacity: 0, y: 20 } as const;
export const ENTRY_ANIMATE = { opacity: 1, y: 0 } as const;

/** Standard section entry animation (larger movement) */
export const SECTION_ENTRY_INITIAL = { opacity: 0, y: 30 } as const;
export const SECTION_ENTRY_ANIMATE = { opacity: 1, y: 0 } as const;

/** Default transition using Apple ease */
export const APPLE_TRANSITION = {
  duration: 0.8,
  ease: APPLE_EASE,
} as const;

/** Staggered children transition */
export const staggerChildren = (stagger = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

/** Viewport config for whileInView animations */
export const VIEWPORT_ONCE = { once: true, margin: '-100px' as const };

/* ── Builder: compose whileInView motion props in one call ── */

type MotionAxis = 'y' | 'x';

interface FadeInOptions {
  /** Delay in seconds */
  delay?: number;
  /** Pixels to travel (default 30) */
  distance?: number;
  /** Axis of movement (default 'y') */
  axis?: MotionAxis;
  /** Duration in seconds (default 0.8) */
  duration?: number;
  /** Viewport margin (default '-100px') */
  margin?: string;
}

/**
 * Builder for the most common whileInView animation pattern.
 * Returns props to spread directly onto a motion element.
 *
 * Usage:
 * ```tsx
 * <motion.div {...fadeInView({ delay: 0.2, distance: 40 })} />
 * ```
 */
export const fadeInView = ({
  delay = 0,
  distance = 30,
  axis = 'y',
  duration = 0.8,
  margin = '-100px',
}: FadeInOptions = {}) => ({
  initial: { opacity: 0, [axis]: distance } as Record<string, number>,
  whileInView: { opacity: 1, [axis]: 0 } as Record<string, number>,
  viewport: { once: true, margin },
  transition: { duration, delay, ease: APPLE_EASE },
});

/**
 * Builder for staggered children lists.
 * Spread on the parent, use `fadeInView` on each child.
 */
export const staggerContainer = (stagger = 0.1) => ({
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-50px' },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  },
});
