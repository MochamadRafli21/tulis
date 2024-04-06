import { z } from "zod";
import { responseData } from "@/libs/type";

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type User = z.infer<typeof UserResponse>;
export type EditUser = z.infer<typeof EditUserSchema>;

export type EditUserResponse = responseData<EditUser>;

export const CreateUserSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password cannot be empty" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const UserResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string(),
  bio: z.string(),
  banner: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  is_verified: z.boolean(),
});

export const EditUserSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  bio: z.string(),
  banner: z.string(),
  avatar: z.string(),
});

