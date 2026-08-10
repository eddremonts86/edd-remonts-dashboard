import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MorphingIcon } from '@/portfolio/components/ui/icons/MorphingIcon'
import { CHECK, COPY } from '@/portfolio/components/ui/icons/morphIconNodes'

interface CopyButtonProps {
  value: string
  /** What is being copied, for the accessible name: "Copy email address". */
  label: string
  className?: string
}

/**
 * Copy-to-clipboard with a copy → check morph on success.
 *
 * A founder reading the page on a work laptop usually wants the address in
 * their own client, not a `mailto:` that opens whatever the OS decided years
 * ago. The morph is the whole confirmation: no toast, no layout shift.
 */
export function CopyButton({ value, label, className = '' }: CopyButtonProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Clipboard blocked (insecure origin, denied permission). Say nothing
      // rather than claim success — the address is visible next to the button.
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }, [value])

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? t('contact.copied', 'Copied') : label}
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-subtle text-foreground/78 transition-colors duration-300 hover:border-primary/50 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 ${className}`}
    >
      <MorphingIcon icon={copied ? CHECK : COPY} size={13} />
    </button>
  )
}
