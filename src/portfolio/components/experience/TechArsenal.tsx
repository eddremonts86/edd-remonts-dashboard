import { TechBadge } from '@/portfolio/components/ui/badges/TechBadge';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { useTranslation } from 'react-i18next';

export const TechArsenal = () => {
  const { t } = useTranslation();
  const { skills } = usePortfolioData();

  return (
    <div className="sticky top-32">
      <h3 className="text-foreground/40 mb-6 font-mono text-[10px] uppercase tracking-[0.3em]">
        {t('experience.techArsenal')}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, index) => (
          <TechBadge key={skill} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};
