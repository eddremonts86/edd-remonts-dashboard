import type { MotionValue } from 'framer-motion';
import { m, useTransform } from 'framer-motion';

export const RevealWord = ({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const y = useTransform(scrollYProgress, [start, end], [10, 0]);

  return (
    <m.span style={{ opacity, y }} className="relative inline-block">
      {word}
    </m.span>
  );
};
