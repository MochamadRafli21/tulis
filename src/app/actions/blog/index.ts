"use server"

import { BlogSchema } from "@/libs/zod/schema"
import {
  storeBlog,
  updateBlog,
  getBlogPublic,
  getBlogById,
  destroyBlog,
  getBlogs,
  findBlogUser,
  storeBlogUser,
  deleteBlogUser
} from "@/libs/services"
import { revalidatePath } from "next/cache"
import { verifyToken } from "@/libs/services"
import { getSession } from "@/libs/utils"

export async function createBlog(formData: FormData) {
  const session = getSession()
  if (!session) {
    throw new Error("User not found")
  }
  const { id } = await verifyToken(session)
  if (!id) {
    throw new Error("User not found")
  }
  const title = formData.get("title")
  const content = formData.get("content")
  const subtitle = formData.get("subtitle")
  const banner = formData.get("banner")
  const blog = BlogSchema.parse({
    title: title as string,
    content: content as string,
    subtitle: subtitle as string,
    banner: banner ? banner as string : ''
  })

  try {
    const data = await storeBlog(blog)
    await storeBlogUser({ userId: id, blogId: data.id })
    revalidatePath("/")
  } catch (error) {
    console.log(error)
  }
}

export async function editBlog(id: string, formData: FormData) {
  const session = getSession()
  if (!session) {
    throw new Error("User not found")
  }
  const { id: userId } = await verifyToken(session)
  if (!userId) {
    throw new Error("User not found")
  }
  const blogUser = await findBlogUser({ userId, blogId: id })
  if (!blogUser) {
    throw new Error("Blog not found")
  }

  if (!id) {
    throw new Error("User not found")
  }
  try {
    await getBlogById(id)
  } catch (error) {
    throw new Error("Blog not found") // TODO: handle error
  }

  const title = formData.get("title")
  const content = formData.get("content")
  const subtitle = formData.get("subtitle")
  const banner = formData.get("banner")

  const blog = BlogSchema.parse({
    title: title as string,
    content: content as string,
    subtitle: subtitle as string,
    banner: banner as string
  })

  try {
    await updateBlog(id, blog)
    revalidatePath("/")
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function removeBlog(id: string) {
  const session = getSession()
  if (!session) {
    throw new Error("User not found")
  }
  try {
    const { id: userId } = await verifyToken(session)
    const blogUser = await findBlogUser({ userId, blogId: id })
    if (!blogUser) {
      throw new Error("Blog not found")
    }
    await destroyBlog(id)
    await deleteBlogUser({ userId, blogId: id })
    revalidatePath("/")
  } catch (error) {
    throw new Error("Failed To Delete Blog") // TODO: handle error
  }
}

export async function getBlogList(page = 1, pageSize = 10) {
  try {
    const data = await getBlogs(page, pageSize)
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const data = await getBlogPublic(slug)
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function getBlogDetail(id: string) {
  try {
    const data = await getBlogById(id)
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

