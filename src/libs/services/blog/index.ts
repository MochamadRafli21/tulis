"use server"

import { db } from "@/libs/database";
import { blog } from "@/libs/database/schema";
import { Blog } from "@/libs/zod/schema";
import { eq, desc } from "drizzle-orm";
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
      banner: banner ?? ''
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
      banner: banner ?? ''
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
    .select()
    .from(blog)
    .where(eq(blog.slug, slug))
    .limit(1);

  if (data.length > 0) {
    data[0].content = DOMPurify.sanitize(data[0].content);
  }
  return data[0];
}

export const getBlogById = async (id: string) => {
  const data = await db
    .select()
    .from(blog)
    .where(eq(blog.id, id))
    .limit(1);

  if (data.length > 0) {
    data[0].content = DOMPurify.sanitize(data[0].content);
  }
  return data[0];
}

export const getBlogs = async (page?: number, pageSize?: number) => {
  if (!page) page = 1;
  if (!pageSize) pageSize = 10;

  const data = await db
    .select()
    .from(blog)
    .where(eq(blog.is_published, true))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(blog.id));

  if (data.length > 0) {
    data.forEach((item) => {
      item.content = DOMPurify.sanitize(item.content);
    });
  }
  return data;
}

