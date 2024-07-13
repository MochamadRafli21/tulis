import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { user } from '../user';
import { blog } from '../blog';

export const like = pgTable('like', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userid').notNull(),
  blogId: uuid('blogid').notNull(),
  ...baseSchema
});

export const likeRelations = relations(like, ({ one }) => ({
  likeerId: one(user, {
    fields: [like.userId],
    references: [user.id],
  }),
  likeingId: one(blog, {
    fields: [like.blogId],
    references: [blog.id],
  }),
}));
