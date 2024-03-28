// src/db/seed.ts
import { user } from "../../schema";
import * as argon2 from "argon2";

export const userseed = async (db: any) => {
  const data: (typeof user.$inferInsert)[] = [];
  const password = process.env.ADMIN_PASSWORD
  const email = process.env.ADMIN_EMAIL
  if (!password) {
    throw new Error("ADMIN_PASSWORD not found on .env.development");
  }
  if (!email) {
    throw new Error("ADMIN_PASSWORD not found on .env.development");
  }
  const hash = await argon2.hash(password);

  data.push({
    name: process.env.ADMIN_NAME ?? "",
    email: email,
    password: hash,
    is_verified: true
  });

  console.log("Seed user start");
  await db.insert(user).values(data);
  console.log("Seed user done");
};
