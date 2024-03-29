"use server"
import { getUserByEmail, generateToken } from "@/libs/services"
import * as argon from "argon2"
import { cookies } from 'next/headers'


export const createJWT = async (formData: FormData) => {
  const email = formData.get("email")
  const password = formData.get("password")


  if (!email || !password) {
    throw new Error("Email and password are required")
  }
  // check if user exist
  //
  const user = await getUserByEmail(email as string)
  if (!user || !user.is_verified) {
    throw new Error("User not found, check your email and password")
  }
  // check if password matches
  //
  const passwordMatch = await argon.verify(user.password, password as string)

  if (!passwordMatch) {
    throw new Error("User not found, check your email and password")
  }
  // create jwt token
  //
  const token = await generateToken(email as string, user.id)

  if (!token) {
    throw new Error("Failed to create token")
  }
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })

  return token
}
