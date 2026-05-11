import { m, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { techIconMap } from '@/portfolio/data/techIcons';

export const SkillsMarquee = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const { skills, isLoading } = usePortfolioData();

  // Triple the skills for seamless infinite loop
  const tripled = [...skills, ...skills, ...skills];

  if (isLoading || skills.length === 0) return null;

  return (
    <section
      className="relative z-20 overflow-hidden border-b border-subtle bg-surface py-12"
      aria-label={t('a11y.skillsMarquee')}
    >
      <m.div
        key={skills.length}
        className="flex items-center gap-12 whitespace-nowrap"
        animate={reduceMotion ? {} : { x: ['0%', '-33.333%'] }}
        transition={{
          x: {
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {tripled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex shrink-0 cursor-default select-none items-center gap-4 font-serif text-2xl italic tracking-tight text-foreground opacity-60 transition-opacity duration-500 hover:opacity-100 md:text-3xl"
          >
            {techIconMap[skill] && (
              <img
                src={techIconMap[skill]}
                alt=""
                aria-hidden="true"
                className="h-6 w-6 opacity-70 grayscale md:h-8 md:w-8"
                loading="lazy"
              />
            )}
            <span>{skill}</span>
            <span className="text-foreground/20 ml-6 text-xl" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </m.div>
    </section>
  );
};
