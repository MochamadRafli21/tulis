"use server"
import { getUserById, getUserList, updateUser } from "@/libs/services/user"
import { verifyToken } from "@/libs/services"
import { getSession } from "@/libs/utils"
import { EditUserSchema, EditUserResponse } from "@/libs/zod/schema"
import { ZodError } from "zod"

export async function getUser() {
  try {
    //const data = await getUserById(id)
    const data = await getUserList()
    if (!data) {
      throw new Error("User not found")
    }
    return data[0]
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
  }
}

