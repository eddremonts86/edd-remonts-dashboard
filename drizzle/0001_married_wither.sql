ALTER TABLE "portfolio_project_translations" ADD COLUMN "problem" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_project_translations" ADD COLUMN "context" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_project_translations" ADD COLUMN "role" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_project_translations" ADD COLUMN "decisions" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_project_translations" ADD COLUMN "complexity" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_project_translations" ADD COLUMN "results" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_projects" ADD COLUMN "repository_url" text;--> statement-breakpoint
ALTER TABLE "portfolio_projects" ADD COLUMN "internal_image_url" text;--> statement-breakpoint
ALTER TABLE "portfolio_projects" ADD COLUMN "scale_label" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_projects" ADD COLUMN "impact_label" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_projects" ADD COLUMN "architecture_label" text DEFAULT '' NOT NULL;