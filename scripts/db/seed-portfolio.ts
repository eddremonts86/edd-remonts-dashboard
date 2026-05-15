/**
 * Seed portfolio tables from local data files (self-contained — no external repo dependency).
 * Run once after the initial migration:  pnpm db:seed:portfolio
 */
import { existsSync } from 'fs'
import { createId } from '@paralleldrive/cuid2'
import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import {
  portfolioProjects,
  portfolioProjectTranslations,
  portfolioExperiences,
  portfolioExperienceTranslations,
  portfolioContent,
} from '../../src/shared/lib/db/schema'

if (existsSync('.env.development')) {
  dotenv.config({ path: '.env.development' })
} else {
  dotenv.config({ path: '.env' })
}


// Import JSON data using dynamic import for ESM compatibility
let cvSource: CvSource
let expTranslationsData: ExpTranslationsData

async function loadJsonData() {
  cvSource = (await import('./data/cv-source.json', { with: { type: 'json' } })).default as CvSource
  expTranslationsData = (await import('./data/experience-translations.json', { with: { type: 'json' } })).default as ExpTranslationsData
}

async function main() {
  // --- Drizzle ORM DB connection ---
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);
    // Helper to parse periods like "2020-2022" or "2020-present"
    function parsePeriod(period: string): { start: string, end: string } {
      const [start, end] = period.split('-').map(s => s.trim());
      return { start, end };
    }
  await loadJsonData();

// ─── Types ───────────────────────────────────────────────────────────────────

interface ExperienceItem {
  role: string
  description: string
}

interface CvSource {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedinUrl: string
    githubUrl: string
    facebookUrl: string
  }
  experiences: Array<{
    id: number
    period: string
    company: string
    location: string
    url: string
  }>
  skills: string[]
}

interface ExpTranslationsData {
  en: Record<string, ExperienceItem>
  es: Record<string, ExperienceItem>
  dk: Record<string, ExperienceItem>
}


  // ── Experiences ────────────────────────────────────────────────────────────
  function normalizeDate(dateStr: string): string | null {
    if (!dateStr) return null;
    // Accepts DD/MM/YYYY or YYYY-MM-DD, returns YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    return null;
  }

  const experiences = cvSource.experiences
    .sort((a, b) => b.id - a.id)
    .map((exp, idx) => {
      const { start, end } = parsePeriod(exp.period)
      return {
        id: `exp-${exp.id}`,
        _sourceId: exp.id,
        company: exp.company,
        location: exp.location,
        periodStart: normalizeDate(start),
        periodEnd: (end && (end.toLowerCase().includes('present') || end.toLowerCase().includes('actual'))) ? null : normalizeDate(end),
        url: exp.url || null,
        sortOrder: idx,
      }
    })

  await db.insert(portfolioExperiences).values(
    experiences.map(({ _sourceId: _s, ...row }) => row),
  ).onConflictDoNothing()

  const expTranslations = experiences.flatMap(({ id, _sourceId }) => {
    const enItem = expTranslationsData.en[String(_sourceId)]
    const esItem = expTranslationsData.es[String(_sourceId)]
    const dkItem = expTranslationsData.dk[String(_sourceId)]
    return [
      { experienceId: id, locale: 'en', role: enItem?.role ?? '', description: enItem?.description ?? '' },
      { experienceId: id, locale: 'es', role: esItem?.role ?? enItem?.role ?? '', description: esItem?.description ?? enItem?.description ?? '' },
      { experienceId: id, locale: 'dk', role: dkItem?.role ?? enItem?.role ?? '', description: dkItem?.description ?? enItem?.description ?? '' },
    ]
  })

  await db.insert(portfolioExperienceTranslations).values(expTranslations).onConflictDoNothing()
  console.log(`  ✓ ${experiences.length} experiences + ${expTranslations.length} translations`)


  // ── Content blocks ─────────────────────────────────────────────────────────
  const pi = cvSource.personalInfo
  const contentRows = [
    { key: 'hero.name', valueEn: pi.name, valueEs: pi.name, valueDk: pi.name },
    { key: 'hero.title', valueEn: 'Senior Frontend Engineer with Full-Stack Roots', valueEs: 'Ingeniero Frontend Senior con Raíces Full-Stack', valueDk: 'Senior Frontend Ingeniør med Full-Stack Rødder' },
    { key: 'hero.tagline', valueEn: 'Frontend-first engineer with full-stack roots and nearly two decades of experience.', valueEs: 'Ingeniero Frontend con raíces full-stack y casi dos décadas de experiencia.', valueDk: 'Frontend-ingeniør med full-stack baggrund og næsten to årtiers erfaring.' },
    { key: 'contact.email', valueEn: pi.email, valueEs: pi.email, valueDk: pi.email },
    { key: 'contact.phone', valueEn: pi.phone, valueEs: pi.phone, valueDk: pi.phone },
    { key: 'contact.location', valueEn: pi.location, valueEs: pi.location, valueDk: pi.location },
    { key: 'social.linkedin', valueEn: pi.linkedinUrl, valueEs: pi.linkedinUrl, valueDk: pi.linkedinUrl },
    { key: 'social.github', valueEn: pi.githubUrl, valueEs: pi.githubUrl, valueDk: pi.githubUrl },
    { key: 'social.facebook', valueEn: pi.facebookUrl, valueEs: pi.facebookUrl, valueDk: pi.facebookUrl },
    { key: 'stats.years', valueEn: '18', valueEs: '18', valueDk: '18' },
    { key: 'stats.companies', valueEn: '12', valueEs: '12', valueDk: '12' },
    { key: 'stats.technologies', valueEn: '30+', valueEs: '30+', valueDk: '30+' },
    { key: 'stats.lighthouse', valueEn: '98', valueEs: '98', valueDk: '98' },
    { key: 'site.title', valueEn: 'Edd Remonts — Senior Frontend Engineer', valueEs: 'Edd Remonts — Ingeniero Frontend Senior', valueDk: 'Edd Remonts — Senior Frontend Ingeniør' },
    { key: 'site.description', valueEn: 'Portfolio of Eduardo Inerarte (Edd Remonts), Senior Frontend Engineer based in Copenhagen.', valueEs: 'Portfolio de Eduardo Inerarte (Edd Remonts), Ingeniero Frontend Senior en Copenhague.', valueDk: 'Portfolio af Eduardo Inerarte (Edd Remonts), Senior Frontend Ingeniør i København.' },
    { key: 'site.url', valueEn: 'https://eddremonts.dk', valueEs: 'https://eddremonts.dk', valueDk: 'https://eddremonts.dk' },
];

  // ── Projects (static) ─────────────────────────────────────────────────────
  const staticProjects = [
    {
      id: 'zunzun',
      title: 'Zunzun.io',
      coverImageUrl: '/projects/zunzun-cover.png',
      link: 'https://www.zunzun.io/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 0,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'hbo-notify',
      title: 'HBO - Be Notified',
      coverImageUrl: '/projects/hbo-notify-cover.png',
      link: 'https://demo-hbo-landing.netlify.app/versions/v1/getnotified/',
      category: 'Frontend',
      featured: false,
      sortOrder: 1,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'voirlematch',
      title: 'Voirlematch.fr',
      coverImageUrl: '/projects/voirlematch-cover.png',
      link: 'https://www.voirlematch.fr/',
      category: 'Frontend',
      featured: false,
      sortOrder: 2,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'hbo-signup',
      title: 'HBO - Sign up',
      coverImageUrl: '/projects/hbo-signup-cover.png',
      link: 'https://demo-hbo-landing.netlify.app/versions/v1/voucher/',
      category: 'Frontend',
      featured: false,
      sortOrder: 3,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'sportal',
      title: 'Sportal.se',
      coverImageUrl: '/projects/sportal-cover.png',
      link: 'https://www.sportal.se/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 4,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'live-fodbold',
      title: 'Live-fodbold.dk',
      coverImageUrl: '/projects/live-fodbold-cover.png',
      link: 'https://www.live-fodbold.dk/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 5,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'radio-guama',
      title: 'Radio Guama',
      coverImageUrl: '/projects/radio-guama-cover.png',
      link: 'http://www.rguama.icrt.cu/',
      category: 'Frontend',
      featured: false,
      sortOrder: 6,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'livefodboldstreams',
      title: 'Livefodboldstreams.dk',
      coverImageUrl: '/projects/livefodboldstreams-cover.png',
      link: 'https://www.livefodboldstreams.dk/',
      category: 'Frontend',
      featured: false,
      sortOrder: 7,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'counties',
      title: 'Counties App',
      coverImageUrl: '/projects/counties-cover.png',
      link: 'https://monosolutiosapps.netlify.app/',
      category: 'Frontend',
      featured: false,
      sortOrder: 8,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'watchonlinehorseracing',
      title: 'Watch Online Horse Racing',
      coverImageUrl: '/projects/watchonlinehorseracing-cover.png',
      link: 'https://www.watchonlinehorseracing.co.uk/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 9,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'sefodbold',
      title: 'Sefodbold.dk',
      coverImageUrl: '/projects/sefodbold-cover.png',
      link: 'https://www.sefodbold.dk/',
      category: 'Frontend',
      featured: false,
      sortOrder: 10,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'windows-terminal',
      title: 'Windows Terminal Config Generator',
      coverImageUrl: '/projects/windows-terminal-cover.jpg',
      link: 'https://windowsterminalsetting.netlify.app/',
      category: 'Full Stack',
      featured: false,
      sortOrder: 11,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
    {
      id: 'sesport',
      title: 'Sesport',
      coverImageUrl: '/projects/sesport-cover.png',
      link: 'https://www.sesport.dk/fodbold',
      category: 'Frontend',
      featured: false,
      sortOrder: 12,
      translations: [
        { locale: 'en', description: '' },
        { locale: 'es', description: '' },
        { locale: 'dk', description: '' },
      ],
    },
  ];

  await db.insert(portfolioProjects).values(
    staticProjects.map(({ translations, ...row }) => row)
  ).onConflictDoNothing();

  const projectTranslations = staticProjects.flatMap((proj) =>
    proj.translations.map((t) => ({
      projectId: proj.id,
      locale: t.locale,
      description: t.description,
    }))
  );
  await db.insert(portfolioProjectTranslations).values(projectTranslations).onConflictDoNothing();
  console.log(`  ✓ ${staticProjects.length} projects + ${projectTranslations.length} translations`);

  // ── Content blocks insert ──────────────────────────────────────────────────
  await db.insert(portfolioContent).values(
    contentRows.map((r) => ({ ...r, updatedAt: new Date() }))
  ).onConflictDoNothing();
  console.log(`  ✓ ${contentRows.length} content blocks`);

  await pool.end();
}
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
