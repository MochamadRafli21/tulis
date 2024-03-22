import { pgTable, text, uuid, json, boolean } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';

export const blog = pgTable('blogs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: json('content').notNull(),
  is_published: boolean('is_published').default(false),
  ...baseSchema,
});
