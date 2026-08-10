interface CompanyChipProps {
  name: string
  logoUrl?: string
  /** `sm` for inline lists, `md` for the timeline header. */
  size?: 'sm' | 'md'
  className?: string
}

/**
 * A company name, treated as a credential rather than as running text.
 *
 * These names are the strongest evidence on the page and they were set as plain
 * spans, indistinguishable from the labels around them. Novo Nordisk in
 * particular is the one a Danish founder recognises instantly, and it was
 * reading like body copy.
 *
 * The logo stays greyscale so seven of them in a row do not turn into a colour
 * clash; it takes its colour back on hover, which is also the moment someone is
 * actually looking at one.
 */
export function CompanyChip({ name, logoUrl, size = 'sm', className = '' }: CompanyChipProps) {
  const pad = size === 'md' ? 'gap-2 px-3 py-1.5' : 'gap-1.5 px-2.5 py-1'
  const text = size === 'md' ? 'text-[13px]' : 'text-[12px]'
  const logo = size === 'md' ? 'h-5 w-5' : 'h-4 w-4'

  return (
    <span
      className={`group/chip inline-flex shrink-0 items-center rounded-full border border-subtle bg-surface/60 font-mono uppercase tracking-wider text-foreground/80 backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 hover:text-foreground ${pad} ${text} ${className}`}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={`${logo} shrink-0 rounded object-contain grayscale transition-[filter] duration-300 group-hover/chip:grayscale-0`}
        />
      ) : (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50 transition-colors duration-300 group-hover/chip:bg-primary"
        />
      )}
      <span className="truncate">{name}</span>
    </span>
  )
}
