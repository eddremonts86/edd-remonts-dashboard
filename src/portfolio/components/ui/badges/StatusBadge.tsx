interface StatusBadgeProps {
  label: string;
  className?: string;
}

/** Pulsing availability dot + label — shared by Hero & Contact sections. */
export const StatusBadge = ({ label, className = '' }: StatusBadgeProps) => (
  <div
    className={`border-current/20 bg-current/5 inline-flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-sm ${className}`}
  >
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] md:text-xs">
      {label}
    </span>
  </div>
);
