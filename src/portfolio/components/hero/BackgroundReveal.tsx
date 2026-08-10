import { m } from 'framer-motion'
import { PORTRAIT_WIDTHS, pictureSources } from '@/portfolio/lib/responsiveImage'

interface BackgroundRevealProps {
  src: string
  theme: string
}

export const BackgroundReveal = ({ src, theme }: BackgroundRevealProps) => {
  const sources = pictureSources(src, PORTRAIT_WIDTHS)

  return (
    <m.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: theme === 'dark' ? 0.35 : 0.2, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
    >
      {/* Decorative: it is a hover-revealed backdrop behind the vignette, and
          the hero's h1 already names the page. alt="" keeps it out of the
          accessibility tree instead of announcing "Eduardo Inerarte Background". */}
      <picture>
        <source type="image/avif" srcSet={sources.avif} sizes="100vw" />
        <source type="image/webp" srcSet={sources.webp} sizes="100vw" />
        <img
          src={sources.fallback}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center filter grayscale contrast-[1.1] brightness-[0.8]"
        />
      </picture>
      {/* Softened vignette blending dynamically with the background */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,#09090b_95%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
    </m.div>
  )
}
