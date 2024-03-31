import { z } from "zod";
import { responseData } from "@/libs/type";

export type Blog = z.infer<typeof BlogSchema>;
export type BlogResponse = responseData<Omit<Blog, "is_published">>;
export const BlogSchema = z.object({
  title: z.string().nonempty({ message: "Title cannot be empty" }),
  content: z.string().min(20, { message: "Content must be at least 10 characters" }).nonempty({ message: "Content cannot be empty" }),
  subtitle: z.string().optional().default(""),
  banner: z.string().nullable().default(""),
  is_published: z.boolean().default(true),
});


