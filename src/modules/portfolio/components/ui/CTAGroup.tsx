import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface CTAButtonProps {
  label: string
  href?: string
  to?: string
  onClick?: () => void
}

interface CTAGroupProps {
  primary?: CTAButtonProps
  secondary?: CTAButtonProps
  children?: ReactNode
  className?: string
}

function isExternalHref(href?: string): boolean {
  return href?.startsWith('http') || href?.startsWith('//') || false
}

/**
 * Call-to-action group with primary and secondary actions.
 * Primary is a filled button, secondary is an outlined button.
 * Internal routes use TanStack Link, external links use <a>.
 */
export function CTAGroup({ primary, secondary, children, className = '' }: CTAGroupProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      {primary && <CTAButton {...primary} variant="primary" />}
      {secondary && <CTAButton {...secondary} variant="secondary" />}
      {children}
    </div>
  )
}

function CTAButton({
  label,
  href,
  to,
  onClick,
  variant,
}: CTAButtonProps & { variant: 'primary' | 'secondary' }) {
  const baseClass =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors'

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${
          variant === 'primary'
            ? 'bg-foreground text-background hover:bg-foreground/90'
            : 'border border-border text-foreground hover:bg-muted/50'
        }`}
      >
        {label}
      </a>
    )
  }

  if (to) {
    return (
      <Link
        to={to as '/'}
        className={`${baseClass} ${
          variant === 'primary'
            ? 'bg-foreground text-background hover:bg-foreground/90'
            : 'border border-border text-foreground hover:bg-muted/50'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${
        variant === 'primary'
          ? 'bg-foreground text-background hover:bg-foreground/90'
          : 'border border-border text-foreground hover:bg-muted/50'
      }`}
    >
      {label}
    </button>
  )
}
