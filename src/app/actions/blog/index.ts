"use server"

import { BlogSchema } from "@/libs/zod/schema"
import { storeBlog, updateBlog, getBlog, destroyBlog, getBlogs } from "@/libs/services/blog"
import { revalidatePath } from "next/cache"

export async function createBlog(formData: FormData) {
  const title = formData.get("title")
  const content = formData.get("content")

  const blog = BlogSchema.parse({
    title: title as string,
    content: content as string
  })

  try {
    await storeBlog(blog)
    revalidatePath("/")
  } catch (error) {
    console.log(error)
  }
}

export async function editBlog(id: string, formData: FormData) {
  try {
    await getBlog(id)
  } catch (error) {
    throw new Error("Blog not found") // TODO: handle error
  }

  const title = formData.get("title")
  const content = formData.get("content")

  const blog = BlogSchema.parse({
    title: title as string,
    content: content as string
  })

  revalidatePath("/")
  revalidatePath("/blog/[id]")

  try {
    await updateBlog(id, blog)
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function removeBlog(id: string) {
  try {
    await getBlog(id)
  } catch (error) {
    throw new Error("Blog not found") // TODO: handle error
  }
  try {
    await destroyBlog(id)
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function getBlogList() {
  try {
    const data = await getBlogs()
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

export async function getBlogById(id: string) {
  try {
    const data = await getBlog(id)
    return data
  } catch (error) {
    console.log(error) // TODO: handle error
  }
}

