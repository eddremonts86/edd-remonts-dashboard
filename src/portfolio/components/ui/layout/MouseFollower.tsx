import { useMousePosition } from '@/portfolio/hooks/useMousePosition';
import { useInteractiveHover } from '@/portfolio/hooks/useInteractiveHover';
import { m, useReducedMotion } from 'framer-motion';

export const MouseFollower = () => {
  const isHovering = useInteractiveHover();
  const reduceMotion = useReducedMotion();
  const { springX, springY } = useMousePosition();

  if (reduceMotion) return null;

  // Elegant sizing
  const size = isHovering ? 60 : 12;
  const offset = size / 2;

  return (
    <m.div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      <m.div
        className="border-primary/50 bg-primary/10 absolute flex items-center justify-center rounded-full border backdrop-blur-[2px]"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: -offset,
          translateY: -offset,
        }}
        animate={{
          width: size,
          height: size,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      ></m.div>
    </m.div>
  );
};
