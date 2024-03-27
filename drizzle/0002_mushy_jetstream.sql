ALTER TABLE "blogs" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "banner" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "subtitle" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_slug_unique" UNIQUE("slug");