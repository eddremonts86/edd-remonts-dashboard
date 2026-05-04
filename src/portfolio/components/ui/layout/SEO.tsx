import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://eddremonts.dk';

const OG_IMAGE = `${SITE_URL}/edd/edd_light.jpg`;

const LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  dk: 'da_DK',
};

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO = ({ title, description, image, url }: SEOProps) => {
  const { i18n, t } = useTranslation();
  const { personalInfo } = usePortfolioData();

  const lang = i18n.language;
  const siteTitle = title || `${personalInfo.name} — ${t('hero.role', personalInfo.title)}`;
  const siteDescription = description || t('personalInfo.description');
  const siteImage = image || OG_IMAGE;
  const siteUrl = url || SITE_URL;
  const locale = LOCALE_MAP[lang] || 'en_US';

  return (
    <Helmet htmlAttributes={{ lang: lang === 'dk' ? 'da' : lang }}>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="author" content={personalInfo.name} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Theme color */}
      <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="2400" />
      <meta property="og:image:height" content="1600" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={`${personalInfo.name} Portfolio`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Hreflang alternates */}
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}?lang=es`} />
      <link rel="alternate" hrefLang="da" href={`${SITE_URL}?lang=dk`} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: personalInfo.name,
          jobTitle: personalInfo.title,
          description: personalInfo.description,
          url: SITE_URL,
          image: OG_IMAGE,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Copenhagen',
            addressCountry: 'DK',
          },
          knowsAbout: [
            'React',
            'Vue.js',
            'TypeScript',
            'Node.js',
            'Frontend Engineering',
            'Full-Stack Development',
            'Cloud Platforms',
            'Web Performance',
          ],
          sameAs: personalInfo.socials.map((s) => s.url).filter((u) => !u.startsWith('mailto:')),
        })}
      </script>
    </Helmet>
  );
};
