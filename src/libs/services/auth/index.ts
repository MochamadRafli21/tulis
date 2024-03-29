"use server"
import { SignJWT, jwtVerify } from "jose"
import { TokenPayload } from "@/libs/zod/schema/token"

export async function generateToken(email: string, id: string) {

  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET must be set')
  }
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24
  const token = new SignJWT({ email, expiresAt, id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(new TextEncoder().encode(secret))

  return token
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET must be set')
  }
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
  return payload as TokenPayload
}

