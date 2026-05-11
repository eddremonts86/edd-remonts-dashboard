import type { RefObject } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContentBlock } from '@/portfolio/hooks/useContentBlock';
import { fadeInView } from '@/portfolio/lib/motion';
import { useScrollReveal } from '@/portfolio/hooks/useScrollReveal';
import { RevealWord } from './RevealWord';

export const AboutIntro = () => {
  const { t, i18n } = useTranslation();
  const { data: aboutIntro } = useContentBlock('about.intro');
  const { containerRef, scrollYProgress } = useScrollReveal();

  const introText =
    aboutIntro?.[
      `value${i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1)}`
    ] || t('about.intro');

  const words = introText.split(' ');

  // Words/fragments to highlight in primary color across all supported languages
  const HIGHLIGHT = new Set([
    // EN
    'Cuba', 'Denmark', 'frontend', 'engineering',
    // DK
    'Danmark',
    // ES
    'Cuba,', 'Dinamarca', 'frontend', 'frontend.',
  ]);

  const isHighlighted = (word: string) =>
    HIGHLIGHT.has(word) || HIGHLIGHT.has(word.replace(/[,.]$/, ''));

  return (
    <m.div
      {...fadeInView({ duration: 1 })}
      className="mb-24 pb-16 border-b border-default md:mb-36 md:pb-24"
    >
      {/* Header row: Origins label + year */}
      <div className="mb-12 flex items-baseline gap-6 md:mb-16">
        <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-primary md:text-base">
          → {t('about.originsLabel', 'Origins')}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground/30">
          / {t('about.originsSub', 'Cuba → Copenhagen')}
        </span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Left: typographic year anchor — takes its natural width, never clipped */}
        <m.div
          {...fadeInView({ delay: 0.1 })}
          className="shrink-0"
        >
          <span className="text-[clamp(6rem,14vw,16rem)] font-display font-light leading-none tracking-tighter text-foreground/8 select-none">
            2007
          </span>
        </m.div>

        {/* Right: scroll-reveal narrative text — fills remaining space */}
        <div className="flex-1 min-w-0 flex items-center">
          <p
            ref={containerRef as RefObject<HTMLParagraphElement>}
            className="flex flex-wrap gap-x-2 gap-y-1 text-xl font-light leading-relaxed tracking-tight text-foreground/70 md:gap-x-3 md:text-2xl lg:text-[1.625rem]"
          >
            {words.map((word, i) => (
              <RevealWord
                key={`${i}-${word}`}
                word={word}
                index={i}
                total={words.length}
                scrollYProgress={scrollYProgress}
                highlight={isHighlighted(word)}
              />
            ))}
          </p>
        </div>
      </div>
    </m.div>
  );
};
