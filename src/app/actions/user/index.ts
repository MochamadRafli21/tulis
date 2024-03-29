"use server"
import { getUserById, getUserList, updateUser } from "@/libs/services/user"
import { verifyToken } from "@/libs/services"
import { getSession } from "@/libs/utils"
import { EditUserSchema } from "@/libs/zod/schema"

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

    const token = await verifyToken(session)
    if (!token) {
      throw new Error("User not found")
    }

    const data = await getUserById(token.id)
    if (!data) {
      throw new Error("User not found")
    }
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function updateProfile(formData: FormData) {
  const name = formData.get("name")
  const avatar = formData.get("avatar")
  const bio = formData.get("bio")
  const banner = formData.get("banner")

  try {
    const session = getSession()
    if (!session) {
      throw new Error("User not found")
    }

    const token = await verifyToken(session)
    if (!token) {
      throw new Error("User not found")
    }

    const data = await getUserById(token.id)
    if (!data) {
      throw new Error("User not found")
    }
    const payload = EditUserSchema.parse({
      name: name as string,
      avatar: avatar as string,
      bio: bio as string,
      banner: banner as string
    })

    const user = await updateUser(data.id, payload)

    return user
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

