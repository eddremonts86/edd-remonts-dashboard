import { type Variants, m, useReducedMotion } from 'framer-motion';
import { APPLE_EASE } from '@/portfolio/lib/motion';

interface LogoProps {
  className?: string;
}

/**
 * EI monogram — animated stroke draw-on on first mount.
 * Pure SVG paths, no <text> nodes — renders identically on all OS/browsers.
 * Square viewport (120×120) scales cleanly at any size.
 * The vertical bar of the I is shared with the right edge of the E stem,
 * creating a ligature tension. A small primary-red square caps the top-right.
 */
export const Logo = ({ className = '' }: LogoProps) => {
  const shouldReduce = useReducedMotion();

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: shouldReduce ? 0 : 1.1, ease: APPLE_EASE, delay: shouldReduce ? 0 : delay },
        opacity: { duration: 0.01, delay: shouldReduce ? 0 : delay },
      },
    }),
  };

  const fill: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduce ? 0 : 0.4, delay: shouldReduce ? 0 : 1.0, ease: 'easeOut' },
    },
  };

  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      role="img"
      aria-labelledby="logo-ei-title"
      className={className}
      initial="hidden"
      animate="visible"
    >
      <title id="logo-ei-title">Eduardo Inerarte</title>

      {/*
        E glyph:
          Vertical stem: x=18, y=20 → y=100  (w=10)
          Top bar:       x=18 → x=72, y=20   (h=10)
          Mid bar:       x=18 → x=64, y=55   (h=10)
          Bot bar:       x=18 → x=72, y=90   (h=10)

        I glyph (shares the right edge of the E stem via the gap):
          Stem:          x=82, y=20 → y=100  (w=10)

        Accent square (primary red):  top-right cap above I
      */}

      {/* E + I fill (solid, fades in after stroke draw) */}
      <m.g variants={fill} fill="currentColor">
        {/* E stem */}
        <rect x="18" y="20" width="10" height="80" />
        {/* E top bar */}
        <rect x="18" y="20" width="54" height="10" />
        {/* E mid bar */}
        <rect x="18" y="55" width="46" height="10" />
        {/* E bot bar */}
        <rect x="18" y="90" width="54" height="10" />
        {/* I stem */}
        <rect x="82" y="20" width="10" height="80" />
      </m.g>

      {/* Stroke draw-on paths (drawn first, then fill fades over them) */}
      <m.path
        d="M18 20 L72 20 L72 30 L28 30 L28 55 L64 55 L64 65 L28 65 L28 90 L72 90 L72 100 L18 100 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={0}
      />
      <m.path
        d="M82 20 L92 20 L92 100 L82 100 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={0.3}
      />

      {/* Primary red accent — small square cap on the I, top-right */}
      <m.rect
        x="86"
        y="10"
        width="8"
        height="8"
        fill="var(--primary)"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: shouldReduce ? 0 : 0.3, delay: shouldReduce ? 0 : 1.2, ease: APPLE_EASE },
          },
        }}
        style={{ transformOrigin: '90px 14px' }}
      />
    </m.svg>
  );
};
