ALTER TABLE "follow" RENAME COLUMN "userId" TO "followerId";--> statement-breakpoint
ALTER TABLE "follow" ADD COLUMN "followingId" uuid NOT NULL;