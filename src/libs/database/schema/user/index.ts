import { pgTable, text, uuid, boolean } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar').default(''),
  bio: text('bio').default(''),
  banner: text('banner').default(''),
  is_verified: boolean('is_verified').default(false),
  verification_token: text('verification_token').default(''),
  ...baseSchema,
});
