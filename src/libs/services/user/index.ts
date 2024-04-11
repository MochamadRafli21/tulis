"use server"

import { db } from "@/libs/database";
import { user } from "@/libs/database/schema";
import { CreateUser, EditUser } from "@/libs/zod/schema";
import { generateEmailVerificationToken } from "@/libs/services/email";

import { eq } from "drizzle-orm";
import * as argon from "argon2";

export const storeUser = async ({ name, email, password }: CreateUser) => {

  const emailToken = generateEmailVerificationToken();
  const passwordHash = await argon.hash(password);

  const data = await db
    .insert(user)
    .values({
      name,
      email,
      password: passwordHash,
      verification_token: emailToken,
      is_verified: false
    })
    .returning();
  return data[0];
}

export const activateUser = async (token: string) => {
  const data = await db
    .update(user)
    .set({
      is_verified: true,
      verification_token: null
    })
    .where(eq(user.verification_token, token))
    .returning();
  return data[0];
}

export const updateUser = async (id: string, { name, avatar, banner, bio }: EditUser) => {
  const data = await db
    .update(user)
    .set({
      name,
      avatar,
      banner,
      bio
    })
    .where(eq(user.id, id))
    .returning();
  return data[0];
}

export const getUserById = async (id: string) => {
  const data = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      banner: user.banner,
      bio: user.bio,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      is_verified: user.is_verified
    })
    .from(user)
    .where(eq(user.id, id))
    .limit(1);

  return data[0];
}

export const getUserByEmail = async (email: string) => {
  const data = await db.query.user.findFirst({
    where: (user, { eq }) => (eq(user.email, email)),
  })

  return data;
}

export const getUserList = async () => {
  const data = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      banner: user.banner,
      bio: user.bio,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      is_verified: user.is_verified
    })
    .from(user)
    .where(eq(user.is_verified, true))
  return data
}
