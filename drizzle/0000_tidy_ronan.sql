CREATE TABLE "auth_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"id_token" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "auth_accounts_provider_id_account_id_unique" UNIQUE("provider_id","account_id")
);
--> statement-breakpoint
CREATE TABLE "auth_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "auth_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "auth_users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "auth_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "auth_verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_content" (
	"key" text PRIMARY KEY NOT NULL,
	"value_en" text DEFAULT '' NOT NULL,
	"value_es" text DEFAULT '' NOT NULL,
	"value_dk" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_experience_translations" (
	"experience_id" text NOT NULL,
	"locale" text NOT NULL,
	"role" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "portfolio_experience_translations_experience_id_locale_pk" PRIMARY KEY("experience_id","locale")
);
--> statement-breakpoint
CREATE TABLE "portfolio_experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"period_start" date,
	"period_end" date,
	"url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_project_translations" (
	"project_id" text NOT NULL,
	"locale" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "portfolio_project_translations_project_id_locale_pk" PRIMARY KEY("project_id","locale")
);
--> statement-breakpoint
CREATE TABLE "portfolio_projects" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"cover_image_url" text,
	"link" text,
	"category" text DEFAULT 'Frontend' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_service_translations" (
	"service_id" text NOT NULL,
	"locale" text NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "portfolio_service_translations_service_id_locale_pk" PRIMARY KEY("service_id","locale")
);
--> statement-breakpoint
CREATE TABLE "portfolio_services" (
	"id" text PRIMARY KEY NOT NULL,
	"icon_slug" text DEFAULT 'code' NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_skills" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon_slug" text,
	"category" text DEFAULT 'General' NOT NULL,
	"proficiency" integer DEFAULT 3 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_testimonial_translations" (
	"testimonial_id" text NOT NULL,
	"locale" text NOT NULL,
	"quote" text DEFAULT '' NOT NULL,
	CONSTRAINT "portfolio_testimonial_translations_testimonial_id_locale_pk" PRIMARY KEY("testimonial_id","locale")
);
--> statement-breakpoint
CREATE TABLE "portfolio_testimonials" (
	"id" text PRIMARY KEY NOT NULL,
	"author_name" text NOT NULL,
	"author_role" text DEFAULT '' NOT NULL,
	"author_company" text DEFAULT '' NOT NULL,
	"avatar_url" text,
	"visible" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_translations" (
	"locale" text NOT NULL,
	"translation_key" text NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "portfolio_translations_locale_translation_key_pk" PRIMARY KEY("locale","translation_key")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"avatar" text,
	"auth_user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_auth_user_id_unique" UNIQUE("auth_user_id")
);
--> statement-breakpoint
ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "portfolio_experience_translations" ADD CONSTRAINT "portfolio_experience_translations_experience_id_portfolio_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."portfolio_experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_project_translations" ADD CONSTRAINT "portfolio_project_translations_project_id_portfolio_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."portfolio_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_service_translations" ADD CONSTRAINT "portfolio_service_translations_service_id_portfolio_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."portfolio_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_testimonial_translations" ADD CONSTRAINT "portfolio_testimonial_translations_testimonial_id_portfolio_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."portfolio_testimonials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth_user_id_auth_users_id_fk" FOREIGN KEY ("auth_user_id") REFERENCES "public"."auth_users"("id") ON DELETE set null ON UPDATE cascade;