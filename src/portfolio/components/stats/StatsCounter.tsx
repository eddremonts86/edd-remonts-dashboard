import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { useAnimatedCounter } from '@/portfolio/hooks/useAnimatedCounter';
import { APPLE_EASE, fadeInView } from '@/portfolio/lib/motion';
import { Activity, ShieldCheck, Cpu, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
  decimals?: number;
  minVal: number;
  maxVal: number;
}

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
    <span ref={ref} className="font-mono tracking-tighter">
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  );
};

export const StatsCounter = () => {
  const { t } = useTranslation();
  const { stats, content, skills } = usePortfolioData();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Copenhagen',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const technologiesCount = skills.length > 0 ? skills.length : stats.technologies;
  const usersServed = Number((content['stats.usersServed'] || '').replace(/[^0-9]/g, ''));
  const uptimeRaw = (content['stats.uptime'] || '').replace(',', '.').replace(/[^0-9.]/g, '');
  const uptime = uptimeRaw ? Number(uptimeRaw) : 0;
  const uptimeDecimals = uptimeRaw.includes('.') ? uptimeRaw.split('.')[1].length : 0;
  const migrations = Number((content['stats.migrations'] || '').replace(/[^0-9]/g, ''));
  const teams = Number((content['stats.teamsLed'] || '').replace(/[^0-9]/g, ''));

  const statItems: StatItem[] = [
    {
      id: 'technologies',
      value: technologiesCount,
      suffix: '',
      labelKey: 'stats.technologies',
      minVal: 0,
      maxVal: 50,
    },
    { id: 'lighthouse', value: stats.lighthouse, suffix: '%', labelKey: 'stats.lighthouse', minVal: 80, maxVal: 100 },
    ...(usersServed > 0
      ? [{ id: 'usersServed', value: usersServed, suffix: ' +', labelKey: 'stats.usersServed', minVal: 0, maxVal: 50000 }]
      : []),
    ...(uptime > 0
      ? [
          {
            id: 'uptime',
            value: uptime,
            suffix: '%',
            labelKey: 'stats.uptime',
            decimals: uptimeDecimals,
            minVal: 95,
            maxVal: 100,
          },
        ]
      : []),
    ...(migrations > 0
      ? [{ id: 'migrations', value: migrations, suffix: ' +', labelKey: 'stats.migrations', minVal: 0, maxVal: 20 }]
      : []),
    ...(teams > 0
      ? [{ id: 'teamsLed', value: teams, suffix: '', labelKey: 'stats.teamsLed', minVal: 0, maxVal: 15 }]
      : []),
  ];

  const metricRows = statItems.slice(0, 5);

  return (
    <section className="relative overflow-hidden border-y border-subtle bg-background">
      {/* Visual cyber mesh grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[16px_16px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-14">
        {/* Observability Telemetry Panel Wrapper */}
        <div className="rounded-2xl border border-subtle bg-surface/50 p-6 md:p-8 backdrop-blur-xs">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-subtle pb-4 mb-8 text-[9px] font-mono text-foreground/45">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45 flex items-center gap-1.5 font-bold">
                Observed System Metrics
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0 tracking-widest text-foreground/40 uppercase">
              <span>[ENV::REACT_19/VITE]</span>
              <span>[COORDS::55.6761_N_12.5683_E]</span>
              <span className="text-primary font-bold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary animate-pulse" />
                [TIME::{time || '00:00:00'}]
              </span>
            </div>
          </div>

          {/* Horizontal Read-Out Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 divide-y divide-subtle sm:divide-y-0 sm:divide-x divide-subtle/45">
            {metricRows.map((stat, index) => (
              <m.article
                key={stat.id}
                {...fadeInView({ delay: index * 0.08 })}
                className={`pt-6 sm:pt-0 ${index > 0 ? 'sm:pl-6' : ''} flex flex-col justify-between`}
              >
                <div>
                  {/* Category marker */}
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40 block mb-1">
                    {t(stat.labelKey)}
                  </span>

                  {/* Value */}
                  <p className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl mb-4">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                </div>

                {/* Observability Metric Spark-Bar */}
                <div className="space-y-1.5 mt-auto">
                  <div className="h-1 w-full bg-foreground/6 rounded-full overflow-hidden">
                    <m.span
                      className="block h-full bg-primary"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: APPLE_EASE, delay: index * 0.08 }}
                      style={{
                        width: `${Math.max(15, ((stat.value - stat.minVal) / (stat.maxVal - stat.minVal || 1)) * 100)}%`,
                        transformOrigin: 'left',
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-foreground/25 uppercase">
                    <span>{stat.minVal} min</span>
                    <span>{stat.maxVal} max</span>
                  </div>
                </div>
              </m.article>
            ))}
          </div>

          {/* Dashboard Summary Footer */}
          <div className="flex flex-wrap items-center justify-between border-t border-subtle mt-8 pt-4 font-mono text-[8px] text-foreground/35 uppercase">
            <div className="flex items-center gap-1.5">
              <Cpu className="h-3 w-3 text-primary animate-pulse" />
              <span>Core Engines Hydrated</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-primary" />
              <span>SLA ENFORCED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
