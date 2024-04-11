"use server"

import { db } from "@/libs/database";
import { bloguser, blog } from "@/libs/database/schema";
import { eq, desc } from "drizzle-orm";
import DOMPurify from "isomorphic-dompurify";

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

export const getUserBlogs = async (userId: string, page?: number, pageSize?: number) => {
  if (!page) page = 1;
  if (!pageSize) pageSize = 10;

  const data = await db
    .select({
      id: bloguser.id,
      title: blog.title,
      slug: blog.slug,
      banner: blog.banner,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      subtitle: blog.subtitle,
      content: blog.content,
      is_published: blog.is_published,
      userId: bloguser.userId,
      blogId: bloguser.blogId,
    })
    .from(bloguser)
    .innerJoin(blog, eq(bloguser.blogId, blog.id))
    .where(eq(bloguser.userId, userId))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(bloguser.id));

  if (data.length > 0) {
    data.forEach((item) => {
      item.content = DOMPurify.sanitize(item.content);
    });
  }
  return data;
}
