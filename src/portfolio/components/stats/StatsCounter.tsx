import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { useAnimatedCounter } from '@/portfolio/hooks/useAnimatedCounter';
import { APPLE_EASE, fadeInView } from '@/portfolio/lib/motion';

interface StatItem {
  value: number;
  suffix: string;
  labelKey: string;
}

// Defined OUTSIDE StatsCounter to avoid remounting on every re-render.
// If defined inside, React treats it as a new component type each render,
// causing unmount/remount and losing isInView state.
const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useAnimatedCounter(value, suffix);
  return <span ref={ref}>0{suffix}</span>;
};

export const StatsCounter = () => {
  const { t } = useTranslation();
  const { stats } = usePortfolioData();

  const statItems: StatItem[] = [
    { value: stats.years, suffix: '+', labelKey: 'stats.yearsExperience' },
    { value: stats.companies, suffix: '+', labelKey: 'stats.companies' },
    { value: stats.technologies, suffix: '+', labelKey: 'stats.technologies' },
    { value: stats.lighthouse, suffix: '', labelKey: 'stats.lighthouse' },
  ];

  return (
    <section className="relative overflow-hidden border-y border-subtle bg-background py-10 md:py-0">
      <div className="container relative z-10 mx-auto max-w-full px-0">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="flex flex-col md:flex-row"
        >
          {statItems.map((stat, index) => (
            <m.div
              key={stat.labelKey}
              {...fadeInView({ delay: index * 0.1 })}
              className="group flex flex-1 cursor-default flex-col items-center justify-center border-b border-r-0 border-subtle bg-background px-8 py-16 text-center transition-colors duration-500 last:border-b-0 hover:bg-surface md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="mb-4 font-serif text-6xl leading-none tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary md:text-7xl lg:text-8xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-foreground/50 font-mono text-[11px] uppercase tracking-widest">
                {t(stat.labelKey)}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
