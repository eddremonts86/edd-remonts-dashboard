import { useEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { CURSOR_SPRING } from '@/portfolio/lib/motion';

interface MousePosition {
  x: MotionValue<number>;
  y: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

/**
 * Tracks mouse position with spring-smoothed values.
 * Shared by MouseFollower and ProjectsGallery floating image.
 */
export function useMousePosition(springConfig = CURSOR_SPRING): MousePosition {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return { x, y, springX, springY };
}
