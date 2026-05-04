import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const DEFAULT_SELECTOR = 'a, button, [role="button"], input, textarea, select';

export function useInteractiveHover(selector = DEFAULT_SELECTOR): boolean {
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const handleOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(selector)) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(selector)) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [reduceMotion, selector]);

  return isHovering;
}
