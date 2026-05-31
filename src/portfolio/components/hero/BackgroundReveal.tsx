import { m } from 'framer-motion'

interface BackgroundRevealProps {
  src: string
  theme: string
}

export const BackgroundReveal = ({ src, theme }: BackgroundRevealProps) => {
  return (
    <m.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: theme === 'dark' ? 0.35 : 0.2, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
    >
      <img
        src={src}
        alt="Eduardo Inerarte Background"
        className="w-full h-full object-cover object-center filter grayscale contrast-[1.1] brightness-[0.8]"
      />
      {/* Softened vignette blending dynamically with the background */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,#09090b_95%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
    </m.div>
  )
}
