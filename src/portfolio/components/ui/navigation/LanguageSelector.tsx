import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/portfolio/data/languages';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  if (LANGUAGES.length <= 1) return null;

  return (
    <div 
      className="flex border border-subtle rounded-full bg-surface/80 p-0.5 select-none shrink-0 backdrop-blur-md" 
      role="group" 
      aria-label="Select language"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`flex h-7 min-w-[32px] items-center justify-center rounded-full px-2 transition-all duration-300 font-mono text-[9px] font-bold cursor-pointer ${
            i18n.language === lang.code
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]'
          }`}
          aria-label={`Change language to ${lang.label}`}
          title={lang.label}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
