"use server"
import { getUserById, getUserList } from "@/libs/services/user"

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

