import { AlertCircle, ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm = ({
  status,
  onSubmit,
}: {
  status: FormStatus;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <form className="relative z-10 space-y-8" onSubmit={onSubmit}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="ml-1 text-[10px] font-mono uppercase tracking-widest text-white/50"
          >
            {t('contact.form.name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-mono text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            placeholder={t('contact.form.namePlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="ml-1 text-[10px] font-mono uppercase tracking-widest text-white/50"
          >
            {t('contact.form.email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-mono text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            placeholder={t('contact.form.emailPlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-message"
            className="ml-1 text-[10px] font-mono uppercase tracking-widest text-white/50"
          >
            {t('contact.form.message')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-mono text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            placeholder="..."
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-bold tracking-wide font-mono">{t('contact.form.error')}</span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 font-mono text-[10px] uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-50 shadow-md cursor-pointer"
        >
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
      </div>
    </form>
  );
};
