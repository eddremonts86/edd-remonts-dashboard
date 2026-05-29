import { IconComponent } from '@/portfolio/components/ui/media/IconComponent';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const FeatureCard = ({ icon, index }: { icon: string; index: number }) => {
  const { t } = useTranslation();

  return (
    <m.div
      {...fadeInView({ delay: index * 0.1 })}
      className="group relative flex flex-col items-start gap-6 py-8 border-b border-subtle last:border-b-0 transition-colors duration-500 hover:bg-foreground/[0.01] sm:flex-row md:gap-10 md:px-4"
    >
      {/* Icon node */}
      <div className="relative z-10 shrink-0">
        <div className="text-foreground/40 border border-subtle flex h-12 w-12 items-center justify-center rounded-xl bg-background transition-all duration-700 group-hover:border-primary/35 group-hover:text-primary">
          <IconComponent
            name={icon}
            className="h-5 w-5 transition-transform duration-700 group-hover:scale-108"
          />
        </div>
      </div>

      {/* Narrative block */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/70 block">
            / 0{index + 1}
          </span>
          <h3 className="text-lg font-medium tracking-tight text-foreground md:text-xl font-display">
            {t(`about.features.${index}.title`)}
          </h3>
        </div>
        <p className="text-foreground/65 max-w-2xl text-sm font-light leading-relaxed md:text-base">
          {t(`about.features.${index}.description`)}
        </p>
      </div>
    </m.div>
  );
};
