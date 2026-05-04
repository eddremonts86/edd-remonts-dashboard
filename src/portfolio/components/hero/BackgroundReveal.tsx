import { APPLE_EASE } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';

export const BackgroundReveal = ({ src, theme }: { src: string; theme: 'light' | 'dark' }) => (
  <m.div
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 1.2, ease: APPLE_EASE }}
    className="pointer-events-none absolute inset-0 z-0"
  >
    <div
      className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
        theme === 'light' ? 'bg-white/20' : 'bg-black/20'
      }`}
    />
    <div
      className={`absolute inset-0 z-10 ${
        theme === 'light'
          ? 'bg-gradient-to-t from-white/90 via-white/20 to-white/60 mix-blend-lighten'
          : 'bg-gradient-to-t from-black/90 via-black/20 to-black/60 mix-blend-multiply'
      }`}
    />
    <img
      src={src}
      alt="Edd Portrait Background"
      className={`h-full w-full object-cover object-[center_15%] contrast-125 ${
        theme === 'light' ? '' : 'grayscale'
      }`}
    />
  </m.div>
);
