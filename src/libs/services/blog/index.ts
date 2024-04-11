"use server"

import { db } from "@/libs/database";
import { blog, bloguser } from "@/libs/database/schema";
import { Blog } from "@/libs/zod/schema";
import { eq, desc, and, ilike, or } from "drizzle-orm";
import DOMPurify from "isomorphic-dompurify";
import { generateSlug } from "@/libs/utils";

export const storeBlog = async ({ title, content, is_published, subtitle, banner }: Blog) => {
  const data = await db
    .insert(blog)
    .values({
      title,
      content,
      is_published,
      slug: generateSlug(title),
      subtitle: subtitle ?? '',
      banner: banner ?? '',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .returning();
  return data[0];
}

export const updateBlog = async (id: string, { title, content, is_published, subtitle, banner }: Blog) => {
  const data = await db
    .update(blog)
    .set({
      title,
      content,
      is_published,
      slug: generateSlug(title),
      subtitle: subtitle ?? '',
      banner: banner ?? '',
      updatedAt: new Date()
    })
    .where(eq(blog.id, id))
    .returning();
  return data[0];
}

export const destroyBlog = async (id: string) => {
  const data = await db
    .delete(blog)
    .where(eq(blog.id, id))
    .returning();
  return data[0];
}

export const getBlogPublic = async (slug: string) => {
  const data = await db
    .select(
      {
        id: blog.id,
        title: blog.title,
        subtitle: blog.subtitle,
        banner: blog.banner,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        slug: blog.slug,
        content: blog.content,
        is_published: blog.is_published,
        userId: bloguser.userId,
        blogId: bloguser.blogId
      }
    )
    .from(blog)
    .where(eq(blog.slug, slug))
    .limit(1)
    .innerJoin(bloguser, eq(blog.id, bloguser.blogId));

  if (data.length > 0) {
    data[0].content = DOMPurify.sanitize(data[0].content);
  }
  return data[0];
}

export const getBlogById = async (id: string) => {
  const data = await db
    .select({
      id: blog.id,
      title: blog.title,
      subtitle: blog.subtitle,
      banner: blog.banner,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      slug: blog.slug,
      content: blog.content,
      is_published: blog.is_published,
      userId: bloguser.userId,
      blogId: bloguser.blogId
    })
    .from(blog)
    .where(eq(blog.id, id))
    .limit(1)
    .innerJoin(bloguser, eq(blog.id, bloguser.blogId));

  if (data.length > 0) {
    data[0].content = DOMPurify.sanitize(data[0].content);
  }
  return data[0];
}

export const getBlogs = async (page?: number, pageSize?: number, q?: string) => {
  if (!page) page = 1;
  if (!pageSize) pageSize = 10;

  const data = await db
    .select({
      id: blog.id,
      title: blog.title,
      subtitle: blog.subtitle,
      banner: blog.banner,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      content: blog.content,
      is_published: blog.is_published,
      slug: blog.slug,
      userId: bloguser.userId,
      blogId: bloguser.blogId,
    })
    .from(blog)
    .where(
      and(
        eq(blog.is_published, true),
        ...q
          ? [
            or(
              ilike(blog.title, `%${q}%`),
              ilike(blog.subtitle, `%${q}%`)
            )
          ]
          : []
      )
    )
    .limit(pageSize)
    .innerJoin(bloguser, eq(blog.id, bloguser.blogId))
    .offset((page - 1) * pageSize)
    .orderBy(desc(blog.createdAt));

  if (data.length > 0) {
    data.forEach((item) => {
      item.content = DOMPurify.sanitize(item.content);
    });
  }

  return data;
}

