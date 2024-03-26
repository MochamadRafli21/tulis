import { z } from "zod";

export type Blog = z.infer<typeof BlogSchema>;

export const BlogSchema = z.object({
  title: z.string().nonempty({ message: "Title cannot be empty" }),
  content: z.string().nonempty({ message: "Content cannot be empty" }),
  subtitle: z.string(),
  is_published: z.boolean().default(true),
});

