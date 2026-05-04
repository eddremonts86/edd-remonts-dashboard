import type { RefObject } from 'react';
import { useScrollReveal } from '@/portfolio/hooks/useScrollReveal';
import { RevealWord } from './RevealWord';

export const ScrollRevealText = ({ text }: { text: string }) => {
  const { containerRef, scrollYProgress } = useScrollReveal();
  const words = text.split(' ');

  return (
    <p
      ref={containerRef as RefObject<HTMLParagraphElement>}
      className="mb-20 flex max-w-5xl flex-wrap gap-x-2 gap-y-1 text-2xl font-medium leading-[1.3] tracking-tight md:mb-32 md:gap-x-3 md:text-4xl lg:text-[2.75rem]"
    >
      {words.map((word, i) => (
        <RevealWord
          key={`${i}-${word}`}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};
