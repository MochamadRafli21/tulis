import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';

export const bloguser = pgTable('bloguser', {
  id: uuid('id').defaultRandom().primaryKey(),
  blogId: uuid('blogId').notNull(),
  userId: uuid('userId').notNull(),
  ...baseSchema
});
