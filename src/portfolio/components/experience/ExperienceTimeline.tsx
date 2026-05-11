import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { useTranslation } from 'react-i18next';
import { ExperienceCard } from './ExperienceCard';
import { TechArsenal } from './TechArsenal';

export const ExperienceTimeline = () => {
  const { t } = useTranslation();
  const { experiences } = usePortfolioData();

  return (
    <section
      id="experience"
      className="relative border-t border-subtle bg-background py-24 md:py-40"
    >
      <div className="container mx-auto max-w-[1400px] px-6">
        <div className="mb-24 flex flex-col justify-between gap-12 md:mb-32 md:flex-row">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl">
            {t('experience.titleAccent')}
            <span className="mt-2 block font-serif italic text-primary">
              {t('experience.title')}
            </span>
          </h2>
          <div className="max-w-md md:self-end md:text-right">
            <p className="text-foreground/50 font-mono text-sm uppercase tracking-wide md:text-base">
              {t('experience.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="flex flex-col lg:col-span-8">
            <div>
              {experiences.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <TechArsenal />
          </div>
        </div>
      </div>
    </section>
  );
};
