import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { useAnimatedCounter } from '@/portfolio/hooks/useAnimatedCounter';
import { APPLE_EASE, fadeInView } from '@/portfolio/lib/motion';

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
  decimals?: number;
}

// Defined OUTSIDE StatsCounter to avoid remounting on every re-render.
const AnimatedNumber = ({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) => {
  const ref = useAnimatedCounter(value, suffix, decimals);
  return (
    <span ref={ref}>
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  );
};

export const StatsCounter = () => {
  const { t } = useTranslation();
  const { stats, content } = usePortfolioData();

  // Hero already surfaces years / companies / languages. This section is
  // "by the numbers" — engineering throughput + reach signals.
  const usersServed = Number((content['stats.usersServed'] || '').replace(/[^0-9]/g, ''));
  const uptimeRaw = (content['stats.uptime'] || '').replace(',', '.').replace(/[^0-9.]/g, '');
  const uptime = uptimeRaw ? Number(uptimeRaw) : 0;
  const uptimeDecimals = uptimeRaw.includes('.') ? uptimeRaw.split('.')[1].length : 0;
  const migrations = Number((content['stats.migrations'] || '').replace(/[^0-9]/g, ''));
  const teams = Number((content['stats.teamsLed'] || '').replace(/[^0-9]/g, ''));

  const statItems: StatItem[] = [
    { id: 'technologies', value: stats.technologies, suffix: '+', labelKey: 'stats.technologies' },
    { id: 'lighthouse', value: stats.lighthouse, suffix: '', labelKey: 'stats.lighthouse' },
    ...(usersServed > 0
      ? [{ id: 'usersServed', value: usersServed, suffix: '+', labelKey: 'stats.usersServed' }]
      : []),
    ...(uptime > 0
      ? [
          {
            id: 'uptime',
            value: uptime,
            suffix: '%',
            labelKey: 'stats.uptime',
            decimals: uptimeDecimals,
          },
        ]
      : []),
    ...(migrations > 0
      ? [{ id: 'migrations', value: migrations, suffix: '+', labelKey: 'stats.migrations' }]
      : []),
    ...(teams > 0
      ? [{ id: 'teamsLed', value: teams, suffix: '+', labelKey: 'stats.teamsLed' }]
      : []),
  ];

  return (
    <section className="relative overflow-hidden border-y border-subtle bg-background">
      <div className="container relative z-10 mx-auto px-6 py-20 md:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Stats grid ──────────────────────────────────────────────── */}
          <div className="lg:col-span-8 lg:order-first">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-subtle bg-subtle md:grid-cols-3">
              {statItems.map((stat, index) => (
                <li key={stat.id} className="contents">
                  <m.div
                    {...fadeInView({ delay: index * 0.08 })}
                    className="group relative flex flex-col gap-3 bg-background p-6 transition-colors duration-500 hover:bg-foreground/3 md:p-8"
                  >
                    {/* Accent bar */}
                    <span
                      aria-hidden
                      className="bg-primary/70 absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">
                      {t(stat.labelKey)}
                    </p>
                    <p className="font-serif text-5xl font-light leading-none tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary md:text-6xl">
                      <AnimatedNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </p>
                  </m.div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Editorial intro ─────────────────────────────────────────── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
          >
            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/60">
              {t('stats.kicker', 'By the numbers')}
            </p>
            <h2 className="font-serif text-3xl font-light leading-[1.05] tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t('stats.heading', 'Engineering throughput, in measurable units.')}
            </h2>
            <p className="mt-5 max-w-md font-body text-sm font-light leading-relaxed text-foreground/70 md:text-base">
              {t(
                'stats.lead',
                'A snapshot of the surface area covered: the stack, the audits, the reliability and the teams shipped alongside.',
              )}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
};
