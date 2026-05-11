import type { MotionValue } from 'framer-motion';
import { m, useReducedMotion, useTransform } from 'framer-motion';

export const RevealWord = ({
  word,
  index,
  total,
  scrollYProgress,
  highlight = false,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  highlight?: boolean;
}) => {
  const shouldReduce = useReducedMotion();
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], shouldReduce ? [1, 1] : [0.1, 1]);
  const y = useTransform(scrollYProgress, [start, end], shouldReduce ? [0, 0] : [10, 0]);

  return (
    <m.span
      style={{ opacity, y }}
      className={`relative inline-block${highlight ? ' text-primary font-medium' : ''}`}
    >
      {word}
    </m.span>
  );
};
