import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Terminal, Play, RefreshCw, Layers, CheckCircle2, ChevronRight, Settings, Info } from 'lucide-react';
import { fadeInView } from '@/portfolio/lib/motion';

type TabType = 're-render' | 'architecture' | 'pipeline';

export const EngineeringCommandCenter = () => {
  const [activeTab, setActiveTab] = useState<TabType>('re-render');

  // Simulator 1: Re-render States
  const [memoized, setMemoized] = useState(true);
  const [activeRipple, setActiveRipple] = useState(false);
  const [telemetry, setTelemetry] = useState({ fps: 60, time: 0.32, heap: '0KB' });

  // Simulator 3: Pipeline States
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Trigger Re-render simulation
  const runRenderSimulation = () => {
    if (activeRipple) return;
    setActiveRipple(true);

    if (memoized) {
      setTelemetry({ fps: 60, time: 0.28, heap: '4.2KB' });
    } else {
      setTelemetry({ fps: 22, time: 7.84, heap: '184.6KB' });
    }

    setTimeout(() => {
      setActiveRipple(false);
    }, 900);
  };

  // Pipeline simulation logic
  const steps = [
    { name: 'Environment Boot', cmd: 'pnpm env:init' },
    { name: 'Linter Sweep', cmd: 'pnpm run lint' },
    { name: 'Strict Type-Check', cmd: 'pnpm run type-check' },
    { name: 'Unit Gate (Vitest)', cmd: 'pnpm run test:unit' },
    { name: 'E2E Smoke (Playwright)', cmd: 'pnpm run test:e2e' },
    { name: 'CDN Edge Purge', cmd: 'pnpm run deploy' },
  ];

  const triggerPipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setPipelineStep(0);
    setTerminalLogs([
      `SYSTEM::INIT - Initiating delivery run at timestamp ${new Date().toISOString()}`,
      `SYSTEM::INIT - Mounting isolated edge container workspace...`,
    ]);
  };

  useEffect(() => {
    if (!pipelineRunning) return;

    if (pipelineStep < steps.length) {
      const step = steps[pipelineStep];
      const timer = setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          `$ ${step.cmd}`,
          `[pipeline::${step.name.toLowerCase().replace(/[^a-z]+/g, '')}] Executing...`,
          `[pipeline::${step.name.toLowerCase().replace(/[^a-z]+/g, '')}] ✓ Success (duration: ${((Math.random() * 0.5) + 0.2).toFixed(2)}s)`,
        ]);
        setPipelineStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          `SUCCESS::DONE - Delivery successfully compiled and deployed to Edge Node.`,
          `SUCCESS::DONE - Lighthouse Core Audits: PERF 100 | A11Y 100 | BEST 100 | SEO 100`,
          `SUCCESS::DONE - Systems operational. Connection terminated.`,
        ]);
        setPipelineRunning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pipelineRunning, pipelineStep]);

  // Simulator 2: Architecture Layers info
  const [selectedArchLayer, setSelectedArchLayer] = useState<string>('cdn');

  const archLayers = {
    cdn: {
      name: 'CDN Edge Cache Boundary',
      latency: '< 15ms Edge Node RTT',
      budget: 'Payload budget max 400KB',
      rule: 'Headers: stale-while-revalidate=120, public, max-age=60',
      description: 'Enforces geometric caching margins. All assets, route templates, and static content blocks are cached globally across 120 edge nodes. Dynamic request syncing occurs asynchronously via stale-while-revalidate intervals.',
    },
    ssr: {
      name: 'Vite / TanStack SSR Gateway',
      latency: '20ms-50ms Time-To-First-Byte',
      budget: 'Hydration payload < 35KB',
      rule: 'Strict Isolation: Server Functions contain zero leakage of domain modules.',
      description: 'Maintains isomorphic execution. Compiles dynamic pages on client request, mapping preloaded relational content schemas instantly into component scopes. Enforces a zero-JS-leakage budget for static layouts.',
    },
    store: {
      name: 'TanStack State Sync Interface',
      latency: 'Sub-millisecond Local dispatch',
      budget: 'Re-render budget < 1ms',
      rule: 'Unidirectional propagation. No double-binding.',
      description: 'Orchestrates frontend system state. Keeps local data caches synchronised with server storage via transactional mutations. Combines query deduplication with aggressive polling controls to prevent server flooding.',
    },
    components: {
      name: 'Isomorphic Modular Components',
      latency: 'INP (Interaction to Next Paint) < 16ms',
      budget: 'Zero global re-render cascades',
      rule: 'Composition over deep nesting hierarchies.',
      description: 'Renders the presentation layouts. Components operate as discrete state containers. Subtrees are heavily protected by strict memoization boundaries, completely isolating user action ripples from static parent layers.',
    },
  };

  return (
    <section id="command-center" className="relative border-y border-subtle bg-surface py-28 md:py-40">
      <div className="absolute inset-0 pointer-events-none opacity-[3%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[20px_20px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <m.div {...fadeInView()} className="mb-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold">
              Interactive Runtime Simulator
            </p>
            <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl lg:text-7xl">
              Engineering <br />
              <span className="font-serif italic text-primary">Command Center</span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="max-w-md text-sm font-light leading-relaxed text-foreground/70 md:text-base">
              Interact with this flagship simulator dashboard to explore how I optimize component life-cycles, enforce boundary structures, and compile system builds.
            </p>
          </div>
        </m.div>

        {/* Workspace Shell */}
        <div className="rounded-3xl border border-subtle bg-background/95 shadow-[0_32px_96px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Tab Selector Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-subtle bg-surface/50 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-foreground/45 uppercase tracking-wider ml-2">
                workflow_simulator.sh
              </span>
            </div>

            {/* Buttons */}
            <div className="flex rounded-xl border border-subtle bg-background p-1 mt-3 sm:mt-0">
              {(['re-render', 'architecture', 'pipeline'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-md'
                      : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {tab === 're-render' && 'Render Visualizer'}
                  {tab === 'architecture' && 'Topology Explorer'}
                  {tab === 'pipeline' && 'CI/CD Pipeline'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panel */}
          <div className="p-6 md:p-10 min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeTab === 're-render' && (
                <m.div
                  key="re-render"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-10 lg:grid-cols-12"
                >
                  {/* Visual tree */}
                  <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-subtle bg-surface/30 p-6 md:p-8 relative">
                    <div className="absolute top-4 left-6 font-mono text-[9px] text-foreground/35">[COMPONENT_TREE_MAP]</div>

                    {/* Nodes structure */}
                    <div className="flex flex-col items-center gap-6 mt-6">
                      {/* Provider Root */}
                      <div
                        className={`rounded-xl border px-5 py-2.5 font-mono text-xs font-semibold bg-background shadow-xs transition-all duration-300 ${
                          activeRipple
                            ? 'border-primary bg-primary/5 text-primary scale-102 ring-4 ring-primary/10'
                            : 'border-subtle text-foreground'
                        }`}
                      >
                        [Provider::GlobalState]
                      </div>

                      <div className="w-px h-6 bg-border-default/45" />

                      {/* Level 2 Wrapper */}
                      <div className="flex gap-16 justify-center w-full relative">
                        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-border-default/45" />

                        {/* Left subtree */}
                        <div className="flex flex-col items-center gap-4">
                          <div
                            className={`rounded-xl border px-4 py-2 font-mono text-[10px] bg-background shadow-xs transition-all duration-500 ${
                              activeRipple && !memoized
                                ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                : activeRipple && memoized
                                  ? 'border-green-500/50 bg-green-500/5 text-green-600'
                                  : 'border-subtle text-foreground/75'
                            }`}
                          >
                            [Layout::Sidebar]
                          </div>
                          <div className="w-px h-4 bg-border-default/45" />
                          <div
                            className={`rounded-lg border px-3 py-1.5 font-mono text-[9px] bg-background transition-all duration-500 ${
                              activeRipple && !memoized
                                ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                : activeRipple && memoized
                                  ? 'border-green-500/50 bg-green-500/5 text-green-600'
                                  : 'border-subtle text-foreground/60'
                            }`}
                          >
                            [Item::Link]
                          </div>
                        </div>

                        {/* Right subtree */}
                        <div className="flex flex-col items-center gap-4">
                          <div
                            className={`rounded-xl border px-4 py-2 font-mono text-[10px] bg-background shadow-xs transition-all duration-500 ${
                              activeRipple
                                ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                : 'border-subtle text-foreground/75'
                            }`}
                          >
                            [Feature::DetailDrawer]
                          </div>
                          <div className="w-px h-4 bg-border-default/45" />
                          <div
                            className={`rounded-lg border px-3 py-1.5 font-mono text-[9px] bg-background transition-all duration-500 ${
                              activeRipple
                                ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                : 'border-subtle text-foreground/60'
                            }`}
                          >
                            [Leaf::RenderNode]
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Simulation Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-8 border-t border-subtle pt-6">
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2.5 cursor-pointer font-mono text-xs text-foreground/70">
                          <input
                            type="checkbox"
                            checked={memoized}
                            onChange={(e) => setMemoized(e.target.checked)}
                            className="h-4 w-4 rounded-sm border-subtle text-primary focus:ring-primary"
                          />
                          [x] Enable Memoization Boundary
                        </label>
                      </div>

                      <button
                        onClick={runRenderSimulation}
                        disabled={activeRipple}
                        className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-primary/90 disabled:opacity-50 transition-all duration-300"
                      >
                        <RefreshCw className={`h-3 w-3 ${activeRipple ? 'animate-spin' : ''}`} />
                        Dispatch Update
                      </button>
                    </div>
                  </div>

                  {/* Telemetry Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-subtle bg-background p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-subtle pb-4">
                        <Settings className="h-4 w-4 text-primary animate-spin-slow" />
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                          Telemetry Telemetry
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-subtle bg-surface p-4">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/45 block mb-1">
                            FPS composite
                          </span>
                          <span
                            className={`font-mono text-3xl font-bold tracking-tight ${
                              telemetry.fps > 45 ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {telemetry.fps} FPS
                          </span>
                        </div>

                        <div className="rounded-xl border border-subtle bg-surface p-4">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/45 block mb-1">
                            Render Duration
                          </span>
                          <span
                            className={`font-mono text-3xl font-bold tracking-tight ${
                              telemetry.time < 1 ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {telemetry.time.toFixed(2)}ms
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-subtle bg-surface p-4">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/45 block mb-1.5">
                          Memory Allocation delta
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-2xl font-semibold text-foreground">
                            {telemetry.heap}
                          </span>
                          <span className="font-mono text-[9px] text-foreground/30 uppercase">[GARBAGE::COLLECTOR_READY]</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-primary/10 bg-primary/[0.01] p-4 text-xs font-mono text-foreground/70 leading-relaxed mt-6">
                      <div className="flex gap-2 items-start">
                        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <p>
                          {memoized
                            ? '[OPTIMAL]: Component sub-trees isolated via strictly configured rendering boundaries. Zero wasted work propagates to static layout branches.'
                            : '[ALERT]: Monolithic re-render detected. A single state node mutation cascades down the entire tree. Heavy layout recalculation consumes client resource cycles.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </m.div>
              )}

              {activeTab === 'architecture' && (
                <m.div
                  key="architecture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-10 lg:grid-cols-12"
                >
                  {/* Interactive flow map */}
                  <div className="lg:col-span-7 flex flex-col justify-center rounded-2xl border border-subtle bg-surface/30 p-6 md:p-8 relative">
                    <div className="absolute top-4 left-6 font-mono text-[9px] text-foreground/35">[FLOW_SCHEMATIC]</div>

                    <div className="space-y-4 my-8">
                      {Object.keys(archLayers).map((key) => {
                        const isSelected = selectedArchLayer === key;
                        const data = archLayers[key as keyof typeof archLayers];
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedArchLayer(key)}
                            className={`w-full flex items-center justify-between rounded-xl border p-4 text-left font-mono transition-all duration-300 ${
                              isSelected
                                ? 'border-primary bg-background shadow-md scale-102 pl-6'
                                : 'border-subtle bg-background/50 hover:bg-background'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-2.5 w-2.5 rounded-full ${
                                  isSelected ? 'bg-primary animate-pulse' : 'bg-foreground/25'
                                }`}
                              />
                              <span
                                className={`text-xs font-semibold ${
                                  isSelected ? 'text-primary' : 'text-foreground/70'
                                }`}
                              >
                                {data.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-foreground/35">
                              <span>INSPECT LAYER</span>
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inspector Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-subtle bg-background p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-subtle pb-4">
                        <Layers className="h-4 w-4 text-primary" />
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                          Layer Specifications
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display text-2xl font-light text-foreground mb-1">
                          {archLayers[selectedArchLayer as keyof typeof archLayers].name}
                        </h4>
                        <span className="font-mono text-[10px] text-primary uppercase tracking-widest block">
                          [METRICS::VERIFIED]
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-subtle py-1.5 font-mono text-[10px]">
                          <span className="text-foreground/45">Latency SLA</span>
                          <span className="text-foreground font-semibold">
                            {archLayers[selectedArchLayer as keyof typeof archLayers].latency}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-subtle py-1.5 font-mono text-[10px]">
                          <span className="text-foreground/45">Data Budget</span>
                          <span className="text-foreground font-semibold">
                            {archLayers[selectedArchLayer as keyof typeof archLayers].budget}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-subtle bg-surface p-4 font-mono text-[10px] text-foreground/75 leading-relaxed">
                        <span className="font-semibold text-primary block mb-1">Active Rule:</span>
                        {archLayers[selectedArchLayer as keyof typeof archLayers].rule}
                      </div>

                      <p className="text-xs leading-relaxed text-foreground/70 font-light">
                        {archLayers[selectedArchLayer as keyof typeof archLayers].description}
                      </p>
                    </div>
                  </div>
                </m.div>
              )}

              {activeTab === 'pipeline' && (
                <m.div
                  key="pipeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-10 lg:grid-cols-12"
                >
                  {/* Interactive pipeline flow */}
                  <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-subtle bg-surface/30 p-6 md:p-8 relative">
                    <div className="absolute top-4 left-6 font-mono text-[9px] text-foreground/35">[PIPELINE_TRACK]</div>

                    <div className="relative flex flex-col gap-6 mt-8 md:pl-2">
                      <div className="absolute left-3 top-2 bottom-2 w-px border-l border-dashed border-border-default/45" />

                      {steps.map((step, idx) => {
                        const isDone = pipelineStep > idx;
                        const isActive = pipelineStep === idx && pipelineRunning;
                        return (
                          <div key={step.name} className="flex items-center gap-4 relative z-10">
                            <div
                              className={`flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                isDone
                                  ? 'border-green-500 bg-green-500/10 text-green-600 scale-102'
                                  : isActive
                                    ? 'border-primary bg-primary text-white animate-pulse'
                                    : 'border-subtle bg-background text-foreground/30'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              ) : (
                                <span className="font-mono text-[9px] font-bold">{idx + 1}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <span
                                className={`font-mono text-[11px] leading-tight block ${
                                  isActive ? 'text-primary font-bold' : isDone ? 'text-foreground/80' : 'text-foreground/45'
                                }`}
                              >
                                {step.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={triggerPipeline}
                      disabled={pipelineRunning}
                      className="w-full inline-flex items-center justify-center gap-2.5 rounded-full border border-primary bg-primary px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-primary/90 disabled:opacity-50 transition-all duration-300 mt-8"
                    >
                      <Play className="h-3 w-3" />
                      Execute Delivery Pipeline
                    </button>
                  </div>

                  {/* Monospace Interactive Console */}
                  <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-subtle bg-black p-6 md:p-8 min-h-[360px] text-white">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
                      <Terminal className="h-4 w-4 text-primary animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                        Edge Terminal Output
                      </span>
                    </div>

                    <div className="flex-1 font-mono text-[10px] text-white/70 overflow-y-auto space-y-2 select-text hide-scrollbar">
                      {terminalLogs.length === 0 ? (
                        <span className="text-white/20 italic">[System idle. Awaiting compilation run...]</span>
                      ) : (
                        terminalLogs.map((log, index) => {
                          const isCommand = log.startsWith('$');
                          const isSuccess = log.includes('✓') || log.includes('SUCCESS::');
                          const isAlert = log.includes('SYSTEM::');
                          let color = 'text-white/70';
                          if (isCommand) color = 'text-primary font-bold';
                          else if (isSuccess) color = 'text-green-400';
                          else if (isAlert) color = 'text-blue-400';

                          return (
                            <m.div
                              key={index}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={color}
                            >
                              {log}
                            </m.div>
                          );
                        })
                      )}
                    </div>

                    <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[8px] text-white/35 font-mono">
                      <span>PROCESSOR: ARM64_EDGE_NODE</span>
                      <span>STDOUT: SECURE_SYNC</span>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
