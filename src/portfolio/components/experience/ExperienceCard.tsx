import { type CvExperience } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ExperienceCardProps {
  exp: CvExperience;
  index: number;
}

export const ExperienceCard = ({ exp, index }: ExperienceCardProps) => {
  const { t } = useTranslation();

  return (
    <m.div
      {...fadeInView({ delay: index * 0.1 })}
      className="group relative -mx-4 flex cursor-default flex-col justify-between rounded-xl border-b border-subtle px-4 py-10 transition-colors duration-500 hover:bg-surface md:flex-row"
    >
      <div className="mb-4 flex w-full flex-col md:mb-0 md:w-1/3 md:pr-8">
        <span className="mb-2 font-mono text-[11px] tracking-widest text-primary">
          {exp.period.replace('Present', t('experience.present') || 'Present')}
        </span>
        <h4 className="mb-1 text-lg font-medium tracking-tight md:text-xl">{exp.company}</h4>
        <span className="text-foreground/40 font-mono text-xs uppercase tracking-wider">
          {exp.location}
        </span>
      </div>

      <div className="flex w-full flex-col justify-center md:w-2/3">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="break-words font-serif text-xl text-foreground transition-colors duration-500 group-hover:text-primary md:text-2xl">
            {t(`experience.items.${exp.id}.role`, exp.role)}
          </h3>
          <ArrowUpRight className="hidden h-5 w-5 shrink-0 -translate-x-2 transform text-primary opacity-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-0 group-hover:opacity-100 md:block" />
        </div>
        <p className="text-foreground/70 text-sm font-light leading-relaxed md:text-base">
          {t(`experience.items.${exp.id}.description`, exp.description)}
        </p>
      </div>
    </m.div>
  );
};
