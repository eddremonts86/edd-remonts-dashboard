import { m } from 'framer-motion'
import { AlertCircle, ArrowRight } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export const ContactForm = ({
  status,
  onSubmit,
}: {
  status: FormStatus
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
  const { t } = useTranslation()

  return (
    <form className="relative z-10 space-y-8" onSubmit={onSubmit}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="ml-1 text-[10px] font-mono uppercase tracking-widest text-foreground/50"
          >
            {t('contact.form.name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-subtle bg-surface px-5 py-4 font-mono text-sm text-foreground placeholder:text-foreground/45 outline-none transition-all duration-300 focus:border-primary/60 focus:bg-surface/95 focus:ring-2 focus:ring-primary/20"
            placeholder={t('contact.form.namePlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="ml-1 text-[10px] font-mono uppercase tracking-widest text-foreground/50"
          >
            {t('contact.form.email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-subtle bg-surface px-5 py-4 font-mono text-sm text-foreground placeholder:text-foreground/45 outline-none transition-all duration-300 focus:border-primary/60 focus:bg-surface/95 focus:ring-2 focus:ring-primary/20"
            placeholder={t('contact.form.emailPlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-message"
            className="ml-1 text-[10px] font-mono uppercase tracking-widest text-foreground/50"
          >
            {t('contact.form.message')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            className="w-full resize-none rounded-xl border border-subtle bg-surface px-5 py-4 font-mono text-sm text-foreground placeholder:text-foreground/45 outline-none transition-all duration-300 focus:border-primary/60 focus:bg-surface/95 focus:ring-2 focus:ring-primary/20"
            placeholder="..."
          />
        </div>
      </div>

      {/* Honeypot field */}
      <div
        className="absolute opacity-0 pointer-events-none -z-10 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-hp">
          {t('contact.form.hpLabel', 'Do not fill this out if you are human')}
        </label>
        <input id="contact-hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-bold tracking-wide font-mono">
            {t('contact.form.error')}
          </span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 font-mono text-[10px] uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100 shadow-md cursor-pointer"
        >
          {/* Reflective dynamic sheen sweep on hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

          {/* Submission dynamic white flash */}
          {status === 'submitting' && (
            <m.span
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-white z-20 pointer-events-none"
            />
          )}

          <span className="relative z-10">
            {status === 'submitting'
              ? t('contact.form.submitting', 'SENDING...')
              : t('contact.form.send', 'SEND MESSAGE')}
          </span>
          {status === 'submitting' ? (
            <div className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          )}
        </button>
        <p className="mt-4 text-center font-mono text-[8px] text-foreground/60 leading-normal select-none">
          {t(
            'contact.form.privacyNotice',
            '* PRIVACY NOTICE: Your details are processed strictly to respond to your direct inquiry, and are never shared or used for marketing.',
          )}
        </p>
      </div>
    </form>
  )
}
