import {
  pgTable,
  text,
  timestamp,
  boolean,
  unique,
  integer,
  date,
  primaryKey,
} from 'drizzle-orm/pg-core'

// ---------------------------------------------------------------------------
// Authentication Tables (Better Auth)
// ---------------------------------------------------------------------------

export const authUsers = pgTable('auth_users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const authSessions = pgTable('auth_sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const authAccounts = pgTable(
  'auth_accounts',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => authUsers.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    idToken: text('id_token'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    providerAccountUnique: unique('auth_accounts_provider_id_account_id_unique').on(
      t.providerId,
      t.accountId,
    ),
  }),
)

export const authVerifications = pgTable('auth_verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Users Table
// Application-level user profile linked to the auth identity.
// Extend this table with app-specific fields in your derived app.
// ---------------------------------------------------------------------------

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  authUserId: text('auth_user_id')
    .unique()
    .references(() => authUsers.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// Portfolio Tables
// ---------------------------------------------------------------------------

export const portfolioExperiences = pgTable('portfolio_experiences', {
  id: text('id').primaryKey(),
  company: text('company').notNull(),
  location: text('location').notNull().default(''),
  periodStart: date('period_start'),
  periodEnd: date('period_end'), // null = "Present"
  url: text('url'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const portfolioExperienceTranslations = pgTable(
  'portfolio_experience_translations',
  {
    experienceId: text('experience_id')
      .notNull()
      .references(() => portfolioExperiences.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(), // 'en' | 'es' | 'dk'
    role: text('role').notNull().default(''),
    description: text('description').notNull().default(''),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.experienceId, t.locale] }),
  }),
)

export const portfolioSkills = pgTable('portfolio_skills', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  iconSlug: text('icon_slug'),
  category: text('category').notNull().default('General'),
  proficiency: integer('proficiency').notNull().default(3), // 1-5
  visible: boolean('visible').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const portfolioProjects = pgTable('portfolio_projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  coverImageUrl: text('cover_image_url'),
  link: text('link'),
  category: text('category').notNull().default('Frontend'),
  featured: boolean('featured').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const portfolioProjectTranslations = pgTable(
  'portfolio_project_translations',
  {
    projectId: text('project_id')
      .notNull()
      .references(() => portfolioProjects.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    description: text('description').notNull().default(''),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.locale] }),
  }),
)

export const portfolioTestimonials = pgTable('portfolio_testimonials', {
  id: text('id').primaryKey(),
  authorName: text('author_name').notNull(),
  authorRole: text('author_role').notNull().default(''),
  authorCompany: text('author_company').notNull().default(''),
  avatarUrl: text('avatar_url'),
  visible: boolean('visible').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const portfolioTestimonialTranslations = pgTable(
  'portfolio_testimonial_translations',
  {
    testimonialId: text('testimonial_id')
      .notNull()
      .references(() => portfolioTestimonials.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    quote: text('quote').notNull().default(''),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.testimonialId, t.locale] }),
  }),
)

// Flat key/value store for hero, about, stats, contact, social, site meta
export const portfolioContent = pgTable('portfolio_content', {
  key: text('key').primaryKey(),
  valueEn: text('value_en').notNull().default(''),
  valueEs: text('value_es').notNull().default(''),
  valueDk: text('value_dk').notNull().default(''),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// i18n overrides — loaded at runtime, fallback to static JSON
export const portfolioTranslations = pgTable(
  'portfolio_translations',
  {
    locale: text('locale').notNull(),
    translationKey: text('translation_key').notNull(),
    value: text('value').notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.locale, t.translationKey] }),
  }),
)

// ---------------------------------------------------------------------------
// Portfolio Services
// ---------------------------------------------------------------------------

export const portfolioServices = pgTable('portfolio_services', {
  id: text('id').primaryKey(),
  iconSlug: text('icon_slug').notNull().default('code'),
  visible: boolean('visible').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const portfolioServiceTranslations = pgTable(
  'portfolio_service_translations',
  {
    serviceId: text('service_id')
      .notNull()
      .references(() => portfolioServices.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    title: text('title').notNull().default(''),
    description: text('description').notNull().default(''),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.serviceId, t.locale] }),
  }),
)

