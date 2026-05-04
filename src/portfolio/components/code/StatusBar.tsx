export const StatusBar = ({ lineCount }: { lineCount: number }) => (
  <div className="flex items-center justify-between border-t border-white/[0.05] bg-[#0F0F0F] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
        TypeScript
      </span>
      <span>UTF-8</span>
    </div>
    <div className="flex items-center gap-4">
      <span>Ln {lineCount}, Col 1</span>
      <span>Spaces: 2</span>
    </div>
  </div>
);
