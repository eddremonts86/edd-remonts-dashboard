import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface CTAGroupProps {
  primary?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondary?: {
    label: string
    href?: string
    onClick?: () => void
  }
  children?: ReactNode
  className?: string
}

/**
 * Call-to-action group with primary and secondary actions.
 * Primary is a filled button, secondary is an outlined button.
 */
export function CTAGroup({ primary, secondary, children, className = '' }: CTAGroupProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      {primary &&
        (primary.href ? (
          <Link
            to={primary.href as any}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            {primary.label}
          </Link>
        ) : (
          <button
            onClick={primary.onClick}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            {primary.label}
          </button>
        ))}
      {secondary &&
        (secondary.href ? (
          <a
            href={secondary.href}
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            {secondary.label}
          </a>
        ) : (
          <button
            onClick={secondary.onClick}
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            {secondary.label}
          </button>
        ))}
      {children}
    </div>
  )
}
