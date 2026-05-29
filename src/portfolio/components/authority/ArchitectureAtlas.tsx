import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Database, Layout, Shield, Cpu, Network, Server, ArrowRight, Activity } from 'lucide-react';

interface AtlasLayer {
  id: string;
  index: string;
  name: string;
  scope: string;
  Icon: React.ComponentType<{ className?: string }>;
  responsibilities: string[];
  tradeoffs: {
    chosen: string;
    rejected: string;
  };
  constraints: string;
}

const ATLAS_LAYERS: AtlasLayer[] = [
  {
    id: 'product',
    index: '01',
    name: 'Product & Accessibility Layer',
    scope: 'UI Design Systems · Semantic HTML5 · INP Performance Budgets · User Flows',
    Icon: Layout,
    responsibilities: [
      'Governing division-wide Design System component tokens to ensure complete visual uniformity.',
      'Enforcing strict ARIA compliance and semantic structure for ultimate access safety.',
      'Protecting user attention spans by setting strict target budgets for key interaction latency (INP).'
    ],
    tradeoffs: {
      chosen: 'Deliberate design token isolation. Establishes absolute layout control and accessibility guardrails, avoiding ad-hoc inline styling clutter.',
      rejected: 'Direct stylesheet overrides. Creates rapid initial delivery but causes cascading layout breaks and extreme visual regression debts.'
    },
    constraints: 'Slow user networks necessitate strict typographic hierarchies and asset footprints to preserve LCP/FCP metrics.'
  },
  {
    id: 'frontend',
    index: '02',
    name: 'Frontend Engine Layer',
    scope: 'Client Runtime · Local State Hydration · Component Decoupling · Rendering Engines',
    Icon: Cpu,
    responsibilities: [
      'Structuring dynamic atomic component divisions to avoid global re-render cascades.',
      'Orchestrating micro-frontend sandboxes pinned to strict semantic version contracts.',
      'Optimizing rendering cycles, minimizing hydration blockers, and managing visual DOM updates.'
    ],
    tradeoffs: {
      chosen: 'Strict modular frontend sandboxing (Vite, custom monorepos). Enables team independence and payload isolation.',
      rejected: 'Monolithic client core. Avoids complex routing setup but freezes deployment cycles and guarantees high risk of regression cascades.'
    },
    constraints: 'Logistics tracking portals processing 500+ updates per second require local virtual list throttles to protect CPU cycles.'
  },
  {
    id: 'domain',
    index: '03',
    name: 'Isomorphic Domain Layer',
    scope: 'Core Business Logic · Type-Safe Contracts · Validation Schemas · State Machines',
    Icon: Shield,
    responsibilities: [
      'Writing strict client-server validation schemas (Zod) to eliminate runtime parser crashes.',
      'Model-driven state isolation to keep business rules independent from React component cycles.',
      'Establishing transactional event buffers to pipeline user input actions in sequence.'
    ],
    tradeoffs: {
      chosen: 'Isolated functional domain modules. Decoupled state machines are testable in absolute isolation from the browser runtime.',
      rejected: 'UI-coupled state structures. Dispatching direct hooks globally is quick to write but triggers complex rendering and debugging loops.'
    },
    constraints: 'Multi-threaded client analytics logs require pure domain logic isolation to prevent main-thread UI blocks.'
  },
  {
    id: 'api',
    index: '04',
    name: 'API Connection Layer',
    scope: 'Network Boundaries · Query Deduplication · Typelinked Contracts · Serialization',
    Icon: Network,
    responsibilities: [
      'Designing type-safe API contracts to ensure 100% synchronization compile-checks.',
      'Caching and batching requests to reduce server load and socket exhaustion.',
      'Sanitizing raw edge responses and gracefully handling remote service interruptions.'
    ],
    tradeoffs: {
      chosen: 'Type-linked RPC-style query synchronization. Removes standard REST typing bugs and guarantees payload sync safety.',
      rejected: 'Raw untyped fetch blocks. Easy to spin up but causes silent data runtime crashes during schema evolutions.'
    },
    constraints: 'Severe network limits (like Havana dial-up systems) require aggressive client deduplication and light payloads.'
  },
  {
    id: 'persistence',
    index: '05',
    name: 'Persistence & Relation Layer',
    scope: 'Relational Schema Mapping · SQL Index Coverage · Local Storage Synchronization',
    Icon: Database,
    responsibilities: [
      'Structuring relational query models using high-performance mapping engines (Drizzle ORM).',
      'Configuring connection boundaries and data indexing schedules to optimize server queries.',
      'Managing client-side offline storage sync gates to preserve offline mutations.'
    ],
    tradeoffs: {
      chosen: 'Strong relational modeling (PostgreSQL + Drizzle). Guarantees transactional safety and predictable data structures.',
      rejected: 'Schemaless JSON storage. Offers high speed initially but risks relational corruption and massive data sanitization debt.'
    },
    constraints: 'High-volume transaction streams require strict relational constraints and covered database indexes to avoid latency spikes.'
  },
  {
    id: 'infrastructure',
    index: '06',
    name: 'Infrastructure & Edge Layer',
    scope: 'Docker Runtimes · CI/CD Quality Gates · Asset Pipelines · Environment Isolation',
    Icon: Server,
    responsibilities: [
      'Configuring isolated Docker runtime containers to guarantee stable, reproducible environments.',
      'Building automated compile check and verification pipelines to block deployment regressions.',
      'Optimizing edge cache boundaries to minimize latency and deliver fast initial asset hydration.'
    ],
    tradeoffs: {
      chosen: 'Immutable container pipelines. Ensures consistent environments from local staging to production.',
      rejected: 'Mutable server deployments. Quick to update but introduces unmapped environment drifts and dependency breaks.'
    },
    constraints: 'CI/CD pipeline compile gates must complete under 3 minutes to keep developer feedback loops tight.'
  }
];

export const ArchitectureAtlas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLayer = ATLAS_LAYERS[activeIndex];
  const ActiveIcon = activeLayer.Icon;

  return (
    <div className="w-full relative rounded-3xl border border-white/10 bg-white/[0.01] p-6 md:p-10 backdrop-blur-md overflow-hidden">
      {/* Subtle blueprint grid mapping */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[16px_16px]" />

      <div className="grid gap-10 lg:grid-cols-12 items-start relative z-10">
        
        {/* Left Side: Interactive Layer Flow Map (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold block mb-2">
              / INTERACTIVE SPECIFICATION
            </span>
            <h3 className="text-2xl font-light tracking-tight md:text-3xl font-display text-white">
              The Architecture Atlas
            </h3>
            <p className="text-xs text-white/50 font-light mt-2 max-w-md">
              Hover or click any layer to inspect operational ownership, core responsibilities, and systemic tradeoffs.
            </p>
          </div>

          {/* Flow list with glowing signal connector */}
          <div className="relative pl-6 space-y-3">
            {/* The vertical connector line */}
            <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-white/5 pointer-events-none" />
            
            {/* Glowing tracer that follows the active index */}
            <m.div 
              className="absolute left-2.5 w-0.5 bg-primary shadow-[0_0_8px_var(--primary)] pointer-events-none rounded-full"
              initial={{ height: 24, y: 0 }}
              animate={{ 
                y: activeIndex * 52 + 10,
                height: 32 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />

            {ATLAS_LAYERS.map((layer, idx) => {
              const isActive = activeIndex === idx;
              const LayerIcon = layer.Icon;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? 'border-primary/30 bg-primary/[0.04] text-white shadow-[0_4px_24px_rgba(209,52,38,0.04)]'
                      : 'border-white/5 bg-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className={`font-mono text-[10px] tracking-wider font-bold transition-colors ${
                      isActive ? 'text-primary' : 'text-white/20'
                    }`}>
                      /{layer.index}
                    </span>
                    <div className={`p-1.5 rounded-lg border transition-colors ${
                      isActive ? 'border-primary/20 bg-primary/5 text-primary' : 'border-white/5 bg-zinc-950 text-white/40 group-hover:text-white/70'
                    }`}>
                      <LayerIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold font-display tracking-tight truncate">
                      {layer.name}
                    </span>
                  </div>
                  <ArrowRight className={`h-3.5 w-3.5 shrink-0 transition-all duration-300 ${
                    isActive ? 'translate-x-0 opacity-100 text-primary' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: The Telemetry Inspector HUD (6 cols) */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <m.div
              key={activeIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 md:p-8 space-y-6 relative overflow-hidden min-h-[460px] flex flex-col justify-between"
            >
              {/* Telemetry Indicator */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/55">
                    Atlas Telemetry Inspector
                  </span>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[8px] text-white/35">
                  LAYER_0{activeLayer.index}::CONNECTED
                </div>
              </div>

              {/* Layer Title & Scope */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ActiveIcon className="h-5 w-5 text-primary" />
                  <h4 className="font-serif italic text-xl text-white">
                    {activeLayer.name}
                  </h4>
                </div>
                <p className="font-mono text-[9px] text-white/45 tracking-wider leading-relaxed">
                  SCOPE: {activeLayer.scope}
                </p>
              </div>

              {/* Core Responsibilities */}
              <div className="space-y-2.5">
                <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-bold block">
                  / OPERATIONAL RESPONSIBILITIES
                </span>
                <ul className="space-y-2 pl-1.5 text-xs text-white/70 font-light font-display">
                  {activeLayer.responsibilities.map((resp, i) => (
                    <li key={i} className="flex gap-2.5 leading-relaxed">
                      <span className="text-primary font-mono select-none">·</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tradeoff Ledger */}
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 font-mono text-[9.5px] space-y-3.5">
                <span className="text-primary font-bold block flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  ARCHITECTURAL TRADEOFFS
                </span>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <span className="text-green-500 font-bold block">✓ PATH CHOSEN</span>
                    <p className="text-white/60 leading-relaxed font-light font-sans text-xs">
                      {activeLayer.tradeoffs.chosen}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-red-400 font-bold block">✗ PATH REJECTED</span>
                    <p className="text-white/60 leading-relaxed font-light font-sans text-xs">
                      {activeLayer.tradeoffs.rejected}
                    </p>
                  </div>
                </div>
              </div>

              {/* System Constraints */}
              <div className="rounded-xl border border-primary/10 bg-primary/[0.01] p-3 text-xs leading-relaxed text-white/75 font-light">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary block font-bold mb-1">
                  Severe Constraint Handled
                </span>
                <p className="font-display">{activeLayer.constraints}</p>
              </div>

            </m.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
