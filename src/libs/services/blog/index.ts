"use server"

import { db } from "@/libs/database";
import { blog } from "@/libs/database/schema";
import { Blog } from "@/libs/zod/schema";
import { eq, desc } from "drizzle-orm";
import DOMPurify from "isomorphic-dompurify";

export const storeBlog = async ({ title, content, is_published }: Blog) => {
  const data = await db
    .insert(blog)
    .values({ title, content, is_published })
    .returning();
  return data[0];
}

export const updateBlog = async (id: string, { title, content, is_published }: Blog) => {
  const data = await db
    .update(blog)
    .set({ title, content, is_published })
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

export const getBlog = async (id: string) => {
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

export const getBlogs = async () => {
  const data = await db
    .select()
    .from(blog)
    .orderBy(desc(blog.id));

  if (data.length > 0) {
    data.forEach((item) => {
      item.content = DOMPurify.sanitize(item.content);
    });
  }
  return data;
}

