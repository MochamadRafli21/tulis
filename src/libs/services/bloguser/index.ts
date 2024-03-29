"use server"

import { db } from "@/libs/database";
import { bloguser, blog } from "@/libs/database/schema";
import { eq, desc } from "drizzle-orm";

export const storeBlogUser = async ({ userId, blogId }: { userId: string, blogId: string }) => {
  const data = await db
    .insert(bloguser)
    .values({
      userId: userId,
      blogId: blogId
    })
    .returning();
  return data[0];
}

export const findBlogUser = async ({ userId, blogId }: { userId: string, blogId: string }) => {
  const data = await db.query.bloguser.findFirst({
    where: (bloguser, { eq }) => (eq(bloguser.userId, userId), eq(bloguser.blogId, blogId)),
  })
  return data;
}

export const deleteBlogUser = async ({ userId, blogId }: { userId: string, blogId: string }) => {
  const data = await db
    .delete(bloguser)
    .where(
      (
        eq(bloguser.userId, userId),
        eq(bloguser.blogId, blogId)
      )
    )
    .returning();
  return data[0];
}

export const getUserBlogs = async (userId: string) => {
  const data = await db
    .select({
      id: bloguser.id,
      title: blog.title
    })
    .from(bloguser)
    .innerJoin(blog, eq(bloguser.blogId, blog.id))
    .where(eq(bloguser.userId, userId))
    .orderBy(desc(bloguser.id));
  return data;
}
