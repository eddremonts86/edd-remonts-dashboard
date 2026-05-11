/**
 * Canonical mapping of skill names → tech icon paths.
 * Keys must exactly match the `name` column in portfolio_skills.
 * Single source of truth — imported by ExperienceTimeline and SkillsMarquee.
 */
export const techIconMap: Record<string, string> = {
  // ── Frontend ─────────────────────────────────────────────────────────────
  React: '/tech-icons/react.svg',
  'Vue.js': '/tech-icons/vuedotjs.svg',
  'Next.js': '/tech-icons/nextdotjs.svg',
  'Nuxt.js': '/tech-icons/nuxtjs.svg',
  TypeScript: '/tech-icons/typescript.svg',
  JavaScript: '/tech-icons/javascript.svg',
  'Tailwind CSS': '/tech-icons/tailwindcss.svg',
  HTML5: '/tech-icons/html5.svg',
  CSS3: '/tech-icons/css3.svg',
  SCSS: '/tech-icons/sass.svg',
  SASS: '/tech-icons/sass.svg',
  'Framer Motion': '/tech-icons/framer.svg',
  'Radix UI': '/tech-icons/radixui.svg',
  'React Hook Form': '/tech-icons/react.svg',
  Recharts: '/tech-icons/recharts.svg',
  i18next: '/tech-icons/react.svg',
  Lucide: '/tech-icons/react.svg',
  // ── Full-stack / meta-frameworks ─────────────────────────────────────────
  'TanStack Start': '/tech-icons/tanstack.svg',
  'TanStack Router': '/tech-icons/tanstack.svg',
  'TanStack Query': '/tech-icons/tanstack.svg',
  'TanStack Form': '/tech-icons/tanstack.svg',
  'TanStack Table': '/tech-icons/tanstack.svg',
  // ── Backend & runtime ────────────────────────────────────────────────────
  'Node.js': '/tech-icons/nodedotjs.svg',
  PHP: '/tech-icons/php.svg',
  Laravel: '/tech-icons/laravel.svg',
  Symfony: '/tech-icons/symfony.svg',
  // ── Databases & ORM ──────────────────────────────────────────────────────
  PostgreSQL: '/tech-icons/postgresql.svg',
  PostGIS: '/tech-icons/postgresql.svg',
  MySQL: '/tech-icons/mysql.svg',
  'Drizzle ORM': '/tech-icons/drizzle.svg',
  ChromaDB: '/tech-icons/chromadb.svg',
  // ── Auth ─────────────────────────────────────────────────────────────────
  Clerk: '/tech-icons/clerk.svg',
  // ── AI / LLM ─────────────────────────────────────────────────────────────
  'Anthropic Claude': '/tech-icons/anthropic.svg',
  OpenAI: '/tech-icons/default-tech.svg',
  Ollama: '/tech-icons/ollama.svg',
  // ── Payments ─────────────────────────────────────────────────────────────
  Stripe: '/tech-icons/stripe.svg',
  // ── Maps ─────────────────────────────────────────────────────────────────
  'MapLibre GL': '/tech-icons/maplibre.svg',
  // ── HTTP & utilities ─────────────────────────────────────────────────────
  Axios: '/tech-icons/axios.svg',
  Zod: '/tech-icons/zod.svg',
  // ── Infra & DevOps ───────────────────────────────────────────────────────
  Docker: '/tech-icons/docker.svg',
  Nginx: '/tech-icons/nginx.svg',
  Apache: '/tech-icons/apache.svg',
  Linux: '/tech-icons/linux.svg',
  bash: '/tech-icons/gnubash.svg',
  macOS: '/tech-icons/apple.svg',
  Git: '/tech-icons/git.svg',
  'GitHub Actions': '/tech-icons/githubactions.svg',
  Netlify: '/tech-icons/netlify.svg',
  pnpm: '/tech-icons/pnpm.svg',
  Vite: '/tech-icons/vite.svg',
  // ── Testing & quality ────────────────────────────────────────────────────
  Vitest: '/tech-icons/vitest.svg',
  Playwright: '/tech-icons/default-tech.svg',
  Cypress: '/tech-icons/cypress.svg',
  ESLint: '/tech-icons/eslint.svg',
  Prettier: '/tech-icons/prettier.svg',
  // ── Monitoring ───────────────────────────────────────────────────────────
  Sentry: '/tech-icons/sentry.svg',
  // ── CMS & legacy ─────────────────────────────────────────────────────────
  Drupal: '/tech-icons/drupal.svg',
  WordPress: '/tech-icons/wordpress.svg',
  // ── Project management ───────────────────────────────────────────────────
  Jira: '/tech-icons/jira.svg',
  Confluence: '/tech-icons/confluence.svg',
};
