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
            className="ml-1 text-sm font-bold uppercase tracking-wider opacity-70"
          >
            {t('contact.form.name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="bg-foreground/5 placeholder:text-foreground/30 w-full rounded-xl border-2 border-transparent px-5 py-4 font-body text-lg outline-none transition-all focus:border-primary focus:bg-transparent"
            placeholder={t('contact.form.namePlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="ml-1 text-sm font-bold uppercase tracking-wider opacity-70"
          >
            {t('contact.form.email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="bg-foreground/5 placeholder:text-foreground/30 w-full rounded-xl border-2 border-transparent px-5 py-4 font-body text-lg outline-none transition-all focus:border-primary focus:bg-transparent"
            placeholder={t('contact.form.emailPlaceholder')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-message"
            className="ml-1 text-sm font-bold uppercase tracking-wider opacity-70"
          >
            {t('contact.form.message')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            className="bg-foreground/5 placeholder:text-foreground/30 w-full resize-none rounded-xl border-2 border-transparent px-5 py-4 font-body text-lg outline-none transition-all focus:border-primary focus:bg-transparent"
            placeholder="..."
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-bold tracking-wide">{t('contact.form.error')}</span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="hover:shadow-primary/30 group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <span className="relative z-10">
            {status === 'submitting'
              ? t('contact.form.submitting', 'SENDING...')
              : t('contact.form.send', 'SEND MESSAGE')}
          </span>
          {status === 'submitting' ? (
            <div className="relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </div>
    </form>
  );
};
