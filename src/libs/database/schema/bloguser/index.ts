import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { blog } from '../blog';
import { user } from '../user';

export const bloguser = pgTable('bloguser', {
  id: uuid('id').defaultRandom().primaryKey(),
  blogId: uuid('blogId').notNull(),
  userId: uuid('userId').notNull(),
  ...baseSchema
});

export const bloguserRelations = relations(bloguser, ({ one }) => ({
  blog: one(blog, {
    fields: [bloguser.blogId],
    references: [blog.id],
  }),
  user: one(user, {
    fields: [bloguser.userId],
    references: [user.id],
  }),
}));
