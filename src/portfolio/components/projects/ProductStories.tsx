import { useState } from 'react';
import { Activity, GitBranch, Laptop } from 'lucide-react';
import { fadeInView } from '@/portfolio/lib/motion';
import { m, AnimatePresence } from 'framer-motion';

interface StoryProject {
  id: string;
  title: string;
  category: string;
  scaleLabel: string;
  impactLabel: string;
  architectureLabel: string;
  link?: string;
  urlPlaceholder: string;
  coverPath: string;
  context: string;
  challenge: string;
  decision: string;
  businessImpact: string;
  tradeoffsChosen: string;
  tradeoffsRejected: string;
  architectureDiagramType: 'microfrontend' | 'statesync' | 'composition';
}

const TOP_STORIES: StoryProject[] = [
  {
    id: 'schilling',
    title: 'Schilling SaaS Enterprise Platform',
    category: 'Enterprise Platform Architecture',
    scaleLabel: '100k+ Lines of Code',
    impactLabel: '42% Payload Cut',
    architectureLabel: 'Micro-Frontend Core',
    link: 'https://schilling.dk/',
    urlPlaceholder: 'console.schilling.dk/workspace',
    coverPath: '/projects/schilling-cover.png',
    context: 'Enterprise publishing SaaS serving large media organizations across Europe with high data-density requirements.',
    challenge: 'Initial monolithic bundle size exceeded 6MB, causing LCP delays over 7.5s and high load abandonment rates. Complete core platform rewrites were strictly forbidden due to high regression risks on legacy billing and data structures.',
    decision: 'Rather than freeze features for a monolithic rewrite, I designed Vite-based monorepo partitions and enabled route isolation. By establishing strict semantic contracts between workspace modules, I empowered product teams to build and ship independently.',
    businessImpact: 'Slashed initial bundle payload by 94% (6.2MB to 350KB), improving LCP to 1.4s. Customer abandonment dropped to near zero, feature delivery cycle speeds rose by 30%, and 20+ engineers were onboarded onto a shared design system with zero system regressions.',
    tradeoffsChosen: 'Scoped monorepo sub-app partitions with strict semantic version contracts for independent squad releases.',
    tradeoffsRejected: 'Monolithic rewrite. Avoided 12 months of complete feature freeze and massive multi-million euro regression risks.',
    architectureDiagramType: 'microfrontend',
  },
  {
    id: 'edd-remonts',
    title: 'Edd Remonts System Dashboard',
    category: 'Real-Time Transactional Dashboard',
    scaleLabel: 'Real-time Event Stream',
    impactLabel: '98 Lighthouse Score',
    architectureLabel: 'TanStack DB Synchronization',
    urlPlaceholder: 'logistics.remonts.io/dashboard',
    coverPath: '/projects/edd-remonts-cover.png',
    context: 'Real-time logistics tracking and transactional control dashboard managing high-frequency operational KPIs.',
    challenge: 'Constant high-frequency data polling saturated client sockets and triggered heavy serverside load. Direct WebSockets caused massive DOM thrashing and layout shifts on unstable mobile networks.',
    decision: 'Engineered virtualized DOM memoization queues coupled with TanStack Query optimistic caching. I structured rendering updates to isolate mutations strictly to active visual cells rather than re-rendering whole list panels.',
    businessImpact: 'Slashed socket query traffic by 60%, drastically cutting server infrastructure costs. The application runs seamlessly at a steady 60FPS on commercial mobile viewports under heavy transaction streams (500+ updates/sec), securing a perfect 98 Lighthouse performance score.',
    tradeoffsChosen: 'Optimistic state sync coupled with a 150ms virtualized DOM rendering throttle to isolate CPU load.',
    tradeoffsRejected: 'Sub-10ms raw WebSockets. Avoided mobile socket saturation and severe clientside layout shifts.',
    architectureDiagramType: 'statesync',
  },
  {
    id: 'zunzun',
    title: 'Zunzun.io Platform Engine',
    category: 'Full-Stack Performance Ecosystem',
    scaleLabel: 'Sub-millisecond Rendering',
    impactLabel: '100% Core Web Vitals',
    architectureLabel: 'Modular State Framework',
    link: 'https://www.zunzun.io/',
    urlPlaceholder: 'zunzun.io/canvas/assembler',
    coverPath: '/projects/zunzun-cover.png',
    context: 'Full-stack canvas builder and assembler focused on modular layout templates and fast static regeneration.',
    challenge: 'Real-time canvas assembly of hundreds of elements triggered global state re-render cascades. This spiked key interaction delays (INP), slowing down the editing experience for design creators.',
    decision: 'Re-architected state flow to use localized reactive nodes. Layout elements function as independent local registers, completely isolating visual mutations from the global state tree and preventing global cascades.',
    businessImpact: 'Guaranteed sub-12ms interaction response times under intensive real-time editing. Maintained a 100% Core Web Vitals score across all generated outputs, ensuring top-tier SEO discoverability and zero user conversion drops.',
    tradeoffsChosen: 'Strict composite UI layout nodes operating as independent registers, isolating mutations to leaves.',
    tradeoffsRejected: 'Single global state tree dispatch, avoiding global re-render cascades that raise key input latency (INP).',
    architectureDiagramType: 'composition',
  },
];

export const ProductStories = () => {
  // Store view states for each project: 'interface' or 'architecture'
  const [activeViews, setActiveViews] = useState<Record<string, 'interface' | 'architecture'>>({
    schilling: 'interface',
    'edd-remonts': 'interface',
    zunzun: 'interface',
  });

  const toggleView = (projectId: string, view: 'interface' | 'architecture') => {
    setActiveViews((prev) => ({
      ...prev,
      [projectId]: view,
    }));
  };

  return (
    <div className="space-y-36">
      {TOP_STORIES.map((project, index) => {
        const isOdd = index % 2 !== 0;
        const currentView = activeViews[project.id] || 'interface';

        return (
          <m.section
            key={project.id}
            {...fadeInView({ duration: 0.8 })}
            className="relative overflow-hidden rounded-3xl border border-subtle bg-surface/30 p-6 md:p-12 lg:p-16 backdrop-blur-md"
          >
            {/* Visual background blueprint motif */}
            <div className="absolute inset-0 pointer-events-none opacity-[3%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[40px_40px]" />

            {/* Top Header metadata */}
            <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-subtle pb-6 mb-12">
              <div>
                <span className="font-serif text-lg italic text-primary">
                  0{index + 1} / {project.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                  {project.impactLabel}
                </span>
                <span className="rounded-full border border-subtle bg-background px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-foreground/60">
                  {project.architectureLabel}
                </span>
                <span className="rounded-full border border-subtle bg-background px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-foreground/60">
                  {project.scaleLabel}
                </span>
              </div>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              
              {/* Col A: The Visual Showcase Console (MacBook Viewport Frame) */}
              <div className={`lg:col-span-6 space-y-6 ${isOdd ? 'lg:order-2' : ''}`}>
                
                {/* 1. MacBook Browser Frame Container */}
                <div className="w-full relative shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                  {/* Top Window Bar */}
                  <div className="bg-zinc-900 px-4 py-2.5 flex items-center justify-between border-b border-white/5 select-none">
                    {/* Dots */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>
                    {/* URL Input */}
                    <div className="rounded-md bg-black/40 px-6 py-0.5 border border-white/5 font-mono text-[8px] text-white/45 tracking-wider truncate max-w-[220px] w-full text-center">
                      {project.urlPlaceholder}
                    </div>
                    <div className="w-12 shrink-0" /> {/* Spacer */}
                  </div>

                  {/* Viewport Canvas */}
                  <div className="w-full aspect-[4/3] relative bg-zinc-950 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {currentView === 'interface' ? (
                        <m.div
                          key="screenshot"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <img
                            src={project.coverPath}
                            alt={`${project.title} Interface UI`}
                            className="w-full h-full object-cover object-top select-none"
                            loading="lazy"
                          />
                        </m.div>
                      ) : (
                        <m.div
                          key="architecture"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 w-full h-full p-6 flex flex-col justify-between"
                        >
                          <div className="absolute inset-0 pointer-events-none opacity-[5%] bg-[radial-gradient(circle_at_1px_1px,#ff4a3a_1px,transparent_0)] bg-size-[12px_12px]" />

                          <div className="flex items-center justify-between border-b border-subtle pb-3">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 font-bold">
                              <Activity className="h-3 w-3 text-primary animate-pulse" />
                              SYSTEM TOPOLOGY
                            </span>
                            <span className="font-mono text-[8px] text-foreground/35">DIAGNOSTIC_SNAP</span>
                          </div>

                          {project.architectureDiagramType === 'microfrontend' && (
                            <svg className="w-full h-40 my-auto" viewBox="0 0 200 120" fill="none">
                              <rect x="15" y="10" width="170" height="20" rx="3" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="0.7" strokeDasharray="3 3" />
                              <text x="100" y="22" fill="var(--primary)" fontSize="6" fontFamily="monospace" textAnchor="middle">MONOREPO WORKSPACE [SCHILLING]</text>
                              <line x1="45" y1="30" x2="45" y2="55" stroke="var(--primary)" strokeWidth="0.5" />
                              <line x1="100" y1="30" x2="100" y2="55" stroke="var(--primary)" strokeWidth="0.5" />
                              <line x1="155" y1="30" x2="155" y2="55" stroke="var(--primary)" strokeWidth="0.5" />
                              <rect x="20" y="55" width="50" height="20" rx="2" fill="var(--surface)" stroke="var(--border-default)" strokeWidth="0.5" />
                              <text x="45" y="67" fill="var(--foreground)" fontSize="5" fontFamily="monospace" textAnchor="middle">core-platform</text>
                              <rect x="75" y="55" width="50" height="20" rx="2" fill="var(--surface)" stroke="var(--border-default)" strokeWidth="0.5" />
                              <text x="100" y="67" fill="var(--foreground)" fontSize="5" fontFamily="monospace" textAnchor="middle">shared-design-sys</text>
                              <rect x="130" y="55" width="50" height="20" rx="2" fill="var(--surface)" stroke="var(--border-default)" strokeWidth="0.5" />
                              <text x="155" y="67" fill="var(--foreground)" fontSize="5" fontFamily="monospace" textAnchor="middle">feature-billing</text>
                              <line x1="45" y1="75" x2="100" y2="95" stroke="var(--primary)" strokeWidth="0.5" />
                              <line x1="100" y1="75" x2="100" y2="95" stroke="var(--primary)" strokeWidth="0.5" />
                              <line x1="155" y1="75" x2="100" y2="95" stroke="var(--primary)" strokeWidth="0.5" />
                              <circle cx="100" cy="95" r="10" fill="var(--primary)" />
                              <text x="100" y="97.5" fill="white" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VITE</text>
                            </svg>
                          )}

                          {project.architectureDiagramType === 'statesync' && (
                            <svg className="w-full h-40 my-auto" viewBox="0 0 200 120" fill="none">
                              <path d="M10,20 Q50,45 100,20 T190,20" stroke="var(--primary)" strokeWidth="0.6" strokeDasharray="3 2" />
                              <text x="100" y="10" fill="var(--primary)" fontSize="5" fontFamily="monospace" textAnchor="middle">LIVE TRANSACTIONAL OPERATIONS STREAM</text>
                              <rect x="25" y="45" width="40" height="24" rx="2" fill="var(--surface)" stroke="var(--border-default)" strokeWidth="0.5" />
                              <text x="45" y="59" fill="var(--foreground)" fontSize="5" fontFamily="monospace" textAnchor="middle">PostgreSQL</text>
                              <line x1="65" y1="57" x2="95" y2="57" stroke="var(--primary)" strokeWidth="0.7" />
                              <polygon points="95,57 91,55 91,59" fill="var(--primary)" />
                              <rect x="95" y="45" width="45" height="24" rx="2" fill="var(--primary)" fillOpacity="0.05" stroke="var(--primary)" strokeWidth="0.7" />
                              <text x="117.5" y="59" fill="var(--primary)" fontSize="5" fontFamily="monospace" textAnchor="middle">TanStack Cache</text>
                              <line x1="140" y1="57" x2="160" y2="57" stroke="var(--foreground)" strokeWidth="0.5" />
                              <rect x="160" y="45" width="25" height="24" rx="2" fill="var(--surface)" stroke="var(--border-default)" strokeWidth="0.5" />
                              <text x="172.5" y="59" fill="var(--foreground)" fontSize="5" fontFamily="monospace" textAnchor="middle">v-DOM</text>
                            </svg>
                          )}

                          {project.architectureDiagramType === 'composition' && (
                            <svg className="w-full h-40 my-auto" viewBox="0 0 200 120" fill="none">
                              <circle cx="100" cy="20" r="12" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="0.7" />
                              <text x="100" y="22.5" fill="var(--primary)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">Global Store</text>
                              <line x1="90" y1="31" x2="60" y2="60" stroke="var(--border-default)" strokeWidth="0.5" />
                              <line x1="110" y1="31" x2="140" y2="60" stroke="var(--border-default)" strokeWidth="0.5" />
                              <rect x="35" y="60" width="45" height="18" rx="2" fill="var(--surface)" stroke="var(--border-default)" strokeWidth="0.5" />
                              <text x="57.5" y="70" fill="var(--foreground)" fontSize="5" fontFamily="monospace" textAnchor="middle">Client Registry</text>
                              <rect x="120" y="60" width="45" height="18" rx="2" fill="var(--surface)" stroke="var(--border-default)" strokeWidth="0.5" />
                              <text x="142.5" y="70" fill="var(--foreground)" fontSize="5" fontFamily="monospace" textAnchor="middle">Isolated Leaf</text>
                              <path d="M142.5,78 L142.5,95" stroke="var(--primary)" strokeWidth="0.7" strokeDasharray="2 2" />
                              <circle cx="142.5" cy="98" r="4" fill="var(--primary)" />
                            </svg>
                          )}

                          <div className="border-t border-subtle pt-2 flex items-center justify-between font-mono text-[7px]">
                            <span className="text-foreground/45">VERIFIED: OK</span>
                            <span className="text-primary font-bold">100% STANDARDS VERIFIED</span>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 2. Interactive Monospaced View Controller Tabs */}
                <div className="flex border border-white/10 rounded-xl bg-black/40 p-1 divide-x divide-white/5 font-mono text-[9px] tracking-wider relative select-none">
                  <button
                    onClick={() => toggleView(project.id, 'interface')}
                    className={`flex-1 py-2 text-center rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5 font-bold ${
                      currentView === 'interface'
                        ? 'bg-primary/10 border border-primary/20 text-primary'
                        : 'bg-transparent border border-transparent text-white/50 hover:text-white'
                    }`}
                  >
                    <Laptop className="h-3.5 w-3.5" />
                    / VIEW INTERFACE
                  </button>
                  <button
                    onClick={() => toggleView(project.id, 'architecture')}
                    className={`flex-1 py-2 text-center rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5 font-bold ${
                      currentView === 'architecture'
                        ? 'bg-primary/10 border border-primary/20 text-primary'
                        : 'bg-transparent border border-transparent text-white/50 hover:text-white'
                    }`}
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                    / VIEW SYSTEM ARCHITECTURE
                  </button>
                </div>

                {/* 3. Performance Metrics Benchmarks */}
                <div className="rounded-xl border border-white/10 bg-white/[0.01] p-4.5 space-y-3 font-mono">
                  <span className="text-[8.5px] uppercase tracking-wider text-primary block font-bold">
                    / METRICS_BENCHMARK::OUTCOMES
                  </span>
                  
                  {project.architectureDiagramType === 'microfrontend' && (
                    <div className="space-y-3 text-[10px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-white/50 text-[8px]">
                          <span>MONOLITHIC BUNDLE PAYLOAD</span>
                          <span>6.2 MB</span>
                        </div>
                        <div className="h-2 w-full bg-foreground/10 dark:bg-white/5 rounded-sm overflow-hidden">
                          <div className="h-full bg-foreground/30 w-full" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-primary font-bold">
                          <span>MICRO-FRONTEND CORE</span>
                          <span>350 KB</span>
                        </div>
                        <div className="h-2 w-full bg-foreground/10 dark:bg-white/5 rounded-sm overflow-hidden">
                          <div className="h-full bg-primary w-[5.6%] shadow-[0_0_8px_rgba(209,52,38,0.7)]" />
                        </div>
                      </div>
                      <span className="block text-[8px] text-green-500 font-bold text-right">✓ 94.3% INITIAL PAYLOAD DECREASE</span>
                    </div>
                  )}

                  {project.architectureDiagramType === 'statesync' && (
                    <div className="space-y-3 text-[10px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-white/50 text-[8px]">
                          <span>REST SOCKET POLLING THRASH</span>
                          <span>HIGH CPU / DOM LAG</span>
                        </div>
                        <div className="h-2 w-full bg-foreground/10 dark:bg-white/5 rounded-sm overflow-hidden">
                          <div className="h-full bg-foreground/30 w-[85%]" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-primary font-bold">
                          <span>150MS MEMOIZED DOM THROTTLE</span>
                          <span>STEADY 60FPS</span>
                        </div>
                        <div className="h-2 w-full bg-foreground/10 dark:bg-white/5 rounded-sm overflow-hidden">
                          <div className="h-full bg-primary w-[15%] shadow-[0_0_8px_rgba(209,52,38,0.7)]" />
                        </div>
                      </div>
                      <span className="block text-[8px] text-green-500 font-bold text-right">✓ 60% SERVER REQUEST DEDUPLICATION</span>
                    </div>
                  )}

                  {project.architectureDiagramType === 'composition' && (
                    <div className="space-y-3 text-[10px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-white/50 text-[8px]">
                          <span>GLOBAL STATE INP DELAY</span>
                          <span>84 ms</span>
                        </div>
                        <div className="h-2 w-full bg-foreground/10 dark:bg-white/5 rounded-sm overflow-hidden">
                          <div className="h-full bg-foreground/30 w-[84%]" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-primary font-bold">
                          <span>LOCALIZED REACTIVE LEAVES</span>
                          <span>12 ms</span>
                        </div>
                        <div className="h-2 w-full bg-foreground/10 dark:bg-white/5 rounded-sm overflow-hidden">
                          <div className="h-full bg-primary w-[12%] shadow-[0_0_8px_rgba(209,52,38,0.7)]" />
                        </div>
                      </div>
                      <span className="block text-[8px] text-green-500 font-bold text-right">✓ SUB-12ms KEY RESPONSE BUDGET ENFORCED</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Col B: 4-Stage Case Study & Architectural Tradeoff Ledgers (6 cols) */}
              <div className={`lg:col-span-6 space-y-6 ${isOdd ? 'lg:order-1' : ''}`}>
                <div>
                  <h3 className="font-display text-3xl font-light tracking-tight text-white md:text-4xl">
                    {project.title}
                  </h3>
                </div>

                {/* 4-Stage Case Study Layout (Context, Challenge, Decision, Impact) */}
                <div className="space-y-5 font-display">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary font-bold block">
                        / CONTEXT
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/75 font-light">
                        {project.context}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary font-bold block">
                        / CHALLENGE
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/75 font-light">
                        {project.challenge}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 space-y-1.5">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary font-bold block">
                      / TECHNICAL LEADERSHIP DECISION
                    </span>
                    <p className="text-xs leading-relaxed text-foreground/75 font-light">
                      {project.decision}
                    </p>
                  </div>

                  {/* Highlighted Outcome Box */}
                  <div className="rounded-xl border border-primary/10 bg-primary/[0.015] p-5 pt-4 border-t border-white/5">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary block font-bold mb-1.5">
                      / BUSINESS IMPACT
                    </span>
                    <p className="text-xs text-foreground/80 leading-relaxed font-light font-display">
                      {project.businessImpact}
                    </p>
                  </div>
                </div>

                {/* 3. Monospaced Architectural Tradeoff Ledger Table */}
                <div className="rounded-xl border border-white/10 bg-zinc-950 p-5 font-mono text-[9.5px] space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 select-none">
                    <span className="text-primary font-bold flex items-center gap-1.5">
                      <GitBranch className="h-3.5 w-3.5 text-primary" />
                      ARCHITECTURAL TRADEOFF LEDGER
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <span className="text-green-500 font-bold block">✓ PATH CHOSEN</span>
                      <p className="text-foreground/70 leading-relaxed font-light font-sans text-xs">
                        {project.tradeoffsChosen}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-red-400 font-bold block">✗ PATH REJECTED</span>
                      <p className="text-foreground/70 leading-relaxed font-light font-sans text-xs">
                        {project.tradeoffsRejected}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </m.section>
        );
      })}
    </div>
  );
};
