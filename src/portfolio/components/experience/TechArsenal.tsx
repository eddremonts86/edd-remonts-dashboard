import { TechBadge } from '@/portfolio/components/ui/badges/TechBadge';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Hard cap: only the first MAX_SHOWN badges are visible without expanding.
const MAX_SHOWN = 16;

export const TechArsenal = () => {
  const { t } = useTranslation();
  const { skills } = usePortfolioData();

  const visible = skills.slice(0, MAX_SHOWN);
  const rest = skills.slice(MAX_SHOWN);

  return (
    <m.div {...fadeInView({ delay: 0.1 })} className="sticky top-32">
      <h3 className="text-foreground/40 mb-6 font-mono text-[10px] uppercase tracking-[0.3em]">
        {t('experience.techArsenal')}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {visible.map((skill, index) => (
          <TechBadge key={skill} skill={skill} index={index} />
        ))}
      </div>
      {rest.length > 0 && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/30">
          +{rest.length} {t('skills.toolbox', 'more in toolbox')}
        </p>
      )}
    </m.div>
  );
};
