import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTextScramble } from '@/portfolio/hooks/useTextScramble'

/**
 * The nav's letter-scramble effect, isolated as a toy: type anything and
 * decode it. Same hook that powers the sticky-nav links — see
 * hooks/useTextScramble.ts.
 */
export const ScrambleStudy = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const fallbackText = t('lab.exhibits.scramble.sample', 'craft is judgment made visible')
  const { display, scramble } = useTextScramble(value.trim() || fallbackText, 4)

  return (
    <div className="flex h-full min-h-52 flex-col items-stretch justify-between gap-4 p-5">
      <div className="flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-background/60 px-4">
        <p
          aria-live="polite"
          className="break-all text-center font-mono text-[16px] leading-relaxed text-foreground md:text-[17px]"
        >
          {display}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          scramble()
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={value}
          maxLength={48}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t('lab.exhibits.scramble.placeholder', 'Type a phrase…')}
          aria-label={t('lab.exhibits.scramble.inputLabel', 'Phrase to scramble')}
          className="min-w-0 flex-1 rounded-full border border-subtle bg-background/70 px-4 py-2 font-mono text-[15px] text-foreground placeholder:text-foreground/35 focus:border-primary/50"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full border border-subtle bg-foreground px-4 py-2 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          {t('lab.exhibits.scramble.action', 'Decode')}
        </button>
      </form>
    </div>
  )
}
