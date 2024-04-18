"use server"
import {
  getUserById,
  updateUser,
  storeUser,
  getUserByEmail,
  requestForgetPassword,
  setPasswordWithToken
} from "@/libs/services/user"
import {
  verifyToken,
  findUserToken,
  sendEmail,
  generateEmailVerificationLink,
  generatePasswordResetLink
} from "@/libs/services"
import { getSession } from "@/libs/utils"
import {
  EditUserSchema,
  EditUserResponse,
  CreateUserSchema,
  CreateUserResponse,
  NewPasswordSchema,
  ForgetPasswordSchema,
  ForgetPasswordResponse,
  NewPasswordResponse
} from "@/libs/zod/schema"
import { ZodError } from "zod"
import { revalidatePath } from "next/cache"

export async function getUser(id: string) {
  try {
    const data = await getUserById(id)
    if (!data) {
      throw new Error("User not found")
    }
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function getCurrentUser() {
  try {
    const session = getSession()
    if (!session) {
      throw new Error("User not found")
    }

    const { id } = await verifyToken(session)
    if (!id) {
      throw new Error("User not found")
    }

    const data = await getUserById(id)
    if (!data) {
      throw new Error("User not found")
    }
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function updateProfile(prevData: EditUserResponse, formData: FormData)
  : Promise<EditUserResponse> {
  const name = formData.get("name") as string;
  const avatar = formData.get("avatar") as string;
  const bio = formData.get("bio") as string;
  const banner = formData.get("banner") as string;

  try {
    const session = getSession()
    if (!session) {
      return {
        "errors": {
          "name": "",
          "avatar": "",
          "bio": "",
          "banner": ""
        },
        "message": "Failed To Get User Data",
        "data": {
          "name": name,
          "avatar": avatar,
          "bio": bio,
          "banner": banner
        }
      }
    }

    const token = await verifyToken(session)
    if (!token) {
      return {
        "errors": {
          "name": "",
          "avatar": "",
          "bio": "",
          "banner": ""
        },
        "message": "Failed To Get User Data",
        "data": {
          "name": name,
          "avatar": avatar,
          "bio": bio,
          "banner": banner
        }
      }
    }

    const data = await getUserById(token.id)
    if (!data) {
      return {
        "errors": {
          "name": "",
          "avatar": "",
          "bio": "",
          "banner": ""
        },
        "message": "Failed To Get User Data",
        "data": {
          "name": name,
          "avatar": avatar,
          "bio": bio,
          "banner": banner
        }
      }
    }
    const payload = EditUserSchema.parse({
      name: name as string,
      avatar: avatar as string,
      bio: bio as string,
      banner: banner as string
    })

    const user = await updateUser(data.id, payload)
    revalidatePath("/")
    revalidatePath("/profile")

    return {
      "errors": undefined,
      "message": "Profile updated successfully",
      "data": {
        "name": user.name,
        "avatar": user.avatar as string,
        "bio": user.bio as string,
        "banner": user.banner as string
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      return {
        "errors": {
          "name": errorMap.name?.[0] ?? "",
          "avatar": errorMap.avatar?.[0] ?? "",
          "bio": errorMap.bio?.[0] ?? "",
          "banner": errorMap.banner?.[0] ?? ""
        },
        "message": "Failed to update profile",
        "data": {
          name,
          avatar,
          bio,
          banner
        }
      }
    } else {
      return {
        "errors": {
          "name": "",
          "avatar": "",
          "bio": "",
          "banner": ""
        },
        "message": "Failed to update profile",
        "data": {
          name,
          avatar,
          bio,
          banner
        }
      }
    }
  }
}


export async function registerUser(prevData: CreateUserResponse, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const payload = CreateUserSchema.parse({
      name: name as string,
      email: email as string,
      password: password as string
    })
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      if (existingUser?.is_verified === true) {
        return {
          "errors": {
            "name": "",
            "email": "",
            "password": ""
          },
          "message": "User Already Exist",
          "data": {
            "name": existingUser.name,
            "email": existingUser.email,
            "password": ""
          }
        } as CreateUserResponse
      } else if (existingUser?.is_verified === false) {
        const verificationLink = generateEmailVerificationLink(existingUser.verification_token as string)
        await sendEmail(
          existingUser.email,
          "Tulis Email Verification",
          `Please Click On The Link To Verify Your Email: ${verificationLink}`
        )
        return {
          "errors": undefined,
          "message": "User created successfully",
          "data": {
            "name": existingUser.name,
            "email": existingUser.email,
            "password": ""
          }
        } as CreateUserResponse
      }
    } else {
      const user = await storeUser(payload)

      const verificationLink = generateEmailVerificationLink(user.verification_token as string)
      await sendEmail(
        user.email,
        "Tulis Email Verification",
        `Please Click On The Link To Verify Your Email: ${verificationLink}`
      )
      return {
        "errors": undefined,
        "message": "User created successfully",
        "data": {
          "name": user.name,
          "email": user.email,
          "password": ""
        }
      } as CreateUserResponse
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      return {
        "errors": {
          "name": errorMap.name?.[0] ?? "",
          "email": errorMap.email?.[0] ?? "",
          "password": errorMap.password?.[0] ?? ""
        },
        "message": "Failed to update profile",
        "data": {
          name,
          email,
          password
        }
      } as CreateUserResponse
    } else {
      return {
        "errors": {
          "name": "",
          "email": "",
          "password": ""
        },
        "message": "Failed to Create User",
        "data": {
          name,
          email,
          password
        }
      } as CreateUserResponse
    }
  }
}

export const forgetPassword = async (prevState: ForgetPasswordResponse, formData: FormData) => {
  const email = formData.get("email") as string

  const payload = ForgetPasswordSchema.parse({
    email
  })

  const user = await getUserByEmail(email)
  if (!user) {
    return {
      "errors": {
        "email": "Email not found"
      },
      "message": "Email not found",
      "data": {
        "email": ""
      }
    }
  }

  const { verification_token } = await requestForgetPassword(payload.email)

  if (!verification_token) {
    return {
      "errors": {
        "email": "Failed To Send Email"
      },
      "message": "Failed To Send Email",
      "data": {
        "email": ""
      }
    }
  }

  const verificationLink = generatePasswordResetLink(verification_token)
  await sendEmail(
    user.email,
    "Tulis Email Verification",
    `Please Click On The Link To Verify Your Email: ${verificationLink}`
  )
  return {
    "errors": undefined,
    "message": "Request sent successfully",
    "data": {
      "email": user.email
    }
  }

}


export const updateUserPasswordByToken = async (token: string, formData: FormData) => {
  const password = formData.get("password") as string
  try {

    const payload = NewPasswordSchema.parse({
      password
    })

    const data = await setPasswordWithToken(token, payload.password)

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

    return {
      "errors": undefined,
      "message": "Activation successful",
      "data": {
        "email": data.email,
        "access_token": token
      }
    }

  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      return {
        "errors": {
          "password": errorMap.password?.[0] ?? ""
        },
        "message": "Failed to update profile",
        "data": {
          password
        }
      } as NewPasswordResponse
    } else {
      return {
        "errors": {
          "password": ""
        },
        "message": "Failed to Create User",
        "data": {
          password
        }
      } as NewPasswordResponse
    }
  }

}

export const isVerificationCodeValid = async (token: string) => {
  const data = await findUserToken(token)
  if (!data) {
    return false
  }
  return {
    "errors": undefined,
    "message": "Activation successful",
    "data": {
      "email": data.email,
      "access_token": token
    }
  };
}
