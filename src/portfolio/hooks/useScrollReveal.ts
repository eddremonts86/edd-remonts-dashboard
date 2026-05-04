import { useRef } from 'react';
import type { RefObject } from 'react';
import { useScroll } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

// Derive offset type from useScroll's own signature to avoid private type imports
type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>['offset']>;

interface UseScrollRevealReturn {
  containerRef: RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
}

export function useScrollReveal(
  offset: ScrollOffset = ['start 85%', 'end 60%'],
): UseScrollRevealReturn {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });
  return { containerRef, scrollYProgress };
}
