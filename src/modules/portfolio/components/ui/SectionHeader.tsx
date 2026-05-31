import type { ReactNode } from 'react'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  labelI18n?: string
  titleI18n?: string
  descriptionI18n?: string
  children?: ReactNode
  className?: string
}

/**
 * Reusable section header with consistent styling.
 * Supports both direct content and i18n keys.
 */
export function SectionHeader({
  label,
  title,
  description,
  labelI18n,
  titleI18n,
  descriptionI18n,
  children,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${className}`}>
      {label && (
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      )}
      {labelI18n && (
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {labelI18n}
        </p>
      )}
      <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
