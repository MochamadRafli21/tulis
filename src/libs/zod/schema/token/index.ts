import { responseData } from "@/libs/type";

export type TokenPayload = {
  email: string
  id: string
  iat: number
  exp: number
  expiresAt: number
}

type LoginData = {
  email: string
  password: string
  access_token: string
}

export type LoginResponse = responseData<LoginData>
