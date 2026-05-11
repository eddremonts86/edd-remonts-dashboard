import { m, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TechIcon } from '@/portfolio/components/ui/badges/TechIcon';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';

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
          <m.span
            key={`${skill}-${i}`}
            className="group flex shrink-0 cursor-default select-none items-center gap-4 font-serif text-2xl italic tracking-tight text-foreground/70 md:text-3xl"
            whileHover="hovered"
            variants={{
              hovered: {
                scale: 1.12,
                color: 'var(--foreground)',
                transition: { type: 'spring', stiffness: 350, damping: 20 },
              },
            }}
          >
            <m.span
              className="inline-flex shrink-0"
              variants={{
                hovered: {
                  y: -6,
                  scale: 1.35,
                  transition: { type: 'spring', stiffness: 380, damping: 12 },
                },
              }}
            >
              <TechIcon skill={skill} className="h-6 w-6 md:h-7 md:w-7" />
            </m.span>
            <span>{skill}</span>
            <m.span
              className="ml-6 text-xl text-foreground/20"
              aria-hidden="true"
              variants={{
                hovered: { opacity: 0, transition: { duration: 0.15 } },
              }}
            >
              •
            </m.span>
          </m.span>
        ))}
      </m.div>
    </section>
  );
};
