import { pgTable, text, uuid, boolean } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { bloguser } from '../bloguser';
import { relations } from 'drizzle-orm';

export const blog = pgTable('blogs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  banner: text('banner'),
  subtitle: text('subtitle').default(''),
  content: text('content').notNull(),
  is_published: boolean('is_published').default(false),
  ...baseSchema,
});

export const blogRelation = relations(blog, ({ one }) => ({
  bloguser: one(bloguser, {
    fields: [blog.id],
    references: [bloguser.userId],
  })
}));
