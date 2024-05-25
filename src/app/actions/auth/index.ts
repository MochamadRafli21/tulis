"use server"
import { getUserByEmail, generateToken, activateUser } from "@/libs/services"
import * as argon from "argon2"
import { cookies } from 'next/headers'
import { LoginResponse } from "@/libs/zod/schema"
import { revalidatePath } from "next/cache"

export async function createJWT(
  prevState: LoginResponse,
  formData: FormData
): Promise<LoginResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      "errors": {
        "email": "Email is required",
        "password": "Password is required",
        "access_token": ""
      },
      "message": "Login failed",
      "data": {
        "email": email,
        "password": password,
        "access_token": ""
      }
    }
  }
  // check if user exist
  //
  const user = await getUserByEmail(email as string)
  if (!user || !user.is_verified) {
    return {
      "errors": {
        "email": "Email Or Password Does Not Match With Our Records",
        "password": "Email Or Password Does Not Match With Our Records",
        "access_token": ""
      },
      "message": "Login failed",
      "data": {
        "email": email,
        "password": password,
        "access_token": ""
      }
    }
  }
  // check if password matches
  //
  const passwordMatch = await argon.verify(user.password, password)

  if (!passwordMatch) {
    return {
      "errors": {
        "email": "Email Or Password Does Not Match With Our Records",
        "password": "Email Or Password Does Not Match With Our Records",
        "access_token": ""
      },
      "message": "Login failed",
      "data": {
        "email": email,
        "password": password,
        "access_token": ""
      }
    }
  }
  // create jwt token
  //
  const token = await generateToken(email as string, user.id)

  if (!token) {
    return {
      "errors": {
        "email": "",
        "password": "",
        "access_token": "Failed To Create Token, Please Try Again Later"
      },
      "message": "Login failed",
      "data": {
        "email": email,
        "password": password,
        "access_token": ""
      }
    }
  }
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })

  return {
    "errors": undefined,
    "message": "Login successful",
    "data": {
      "email": email,
      "password": password,
      "access_token": token
    }
  }
}

export const verifyEmail = async (token: string) => {
  const data = await activateUser(token)
  if (!data) {
    return {
      "errors": {
        "email": "",
        "password": "",
        "access_token": "Failed To Verify Token, Please Try Again Later"
      },
      "message": "Activation failed",
      "data": {
        "email": "",
        "password": "",
        "access_token": ""
      }
    }
  }
  revalidatePath("/login")

  return {
    "errors": undefined,
    "message": "Activation successful",
    "data": {
      "email": data.email,
      "access_token": token
    }
  }
}

export const logout = async () => {
  console.log('delete')
  cookies().set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    path: '/',
  })
}
