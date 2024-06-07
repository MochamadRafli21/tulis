import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { user } from '../user';

export const follow = pgTable('follow', {
  id: uuid('id').defaultRandom().primaryKey(),
  followerId: uuid('followerId').notNull(),
  followingId: uuid('followingId').notNull(),
  ...baseSchema
});

export const followRelations = relations(follow, ({ one }) => ({
  followerId: one(user, {
    fields: [follow.followerId],
    references: [user.id],
  }),
  followingId: one(user, {
    fields: [follow.followingId],
    references: [user.id],
  }),
}));
