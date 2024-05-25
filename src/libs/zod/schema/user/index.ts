import { z } from "zod";
import { responseData } from "@/libs/type";

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type User = z.infer<typeof UserResponse>;
export type EditUser = z.infer<typeof EditUserSchema>;
export type ForgetPassword = z.infer<typeof ForgetPasswordSchema>;
export type NewPassword = z.infer<typeof NewPasswordSchema>;

export type EditUserResponse = responseData<EditUser>;
export type CreateUserResponse = responseData<CreateUser>;
export type ForgetPasswordResponse = responseData<ForgetPassword>;
export type NewPasswordResponse = responseData<NewPassword>;

export const ForgetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .nonempty({ message: "Password cannot be empty" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
});

export const CreateUserSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password cannot be empty" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
    .regex(/(?=.*\W)/, {
      message: "Password must contain at least one special character",
    }),
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

