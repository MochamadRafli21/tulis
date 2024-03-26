import { pgTable, text, uuid, boolean } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';

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
