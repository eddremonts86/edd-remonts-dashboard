import { tabs } from './codeBlockTokens';

export const WindowChrome = ({
  activeTab,
  onTabChange,
}: {
  activeTab: number;
  onTabChange: (idx: number) => void;
}) => (
  <div className="flex items-center gap-3 rounded-t-xl border-b border-white/[0.05] bg-[#151515] px-4 py-3">
    {/* Traffic lights */}
    <div className="flex shrink-0 gap-2">
      <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </div>

    {/* File tabs */}
    <div className="scrollbar-none ml-4 flex gap-1 overflow-x-auto">
      {tabs.map((tab, idx) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(idx)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-300 ${
            idx === activeTab
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-white/40 hover:bg-white/5 hover:text-white/80'
          }`}
        >
          <span className="text-[10px] opacity-70">{tab.icon}</span>
          {tab.name}
        </button>
      ))}
    </div>

    {/* Minimap dots (decorative) */}
    <div className="ml-auto flex items-center gap-1 opacity-20" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-3 w-1 rounded-sm bg-white/40" />
      ))}
    </div>
  </div>
);
