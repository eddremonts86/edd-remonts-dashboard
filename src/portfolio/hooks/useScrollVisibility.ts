import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export function useScrollVisibility(thresholdRatio = 0.85): boolean {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > window.innerHeight * thresholdRatio);
  });

  return visible;
}
