"use server"

import { BlogSchema } from "@/libs/zod/schema"
import { storeBlog, updateBlog, getBlogPublic, getBlogById, destroyBlog, getBlogs } from "@/libs/services/blog"
import { revalidatePath } from "next/cache"

export async function createBlog(formData: FormData) {
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
    await storeBlog(blog)
    revalidatePath("/")
  } catch (error) {
    console.log(error)
  }
}

export async function editBlog(id: string, formData: FormData) {
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
  try {
    await getBlogById(id)
  } catch (error) {
    throw new Error("Blog not found") // TODO: handle error
  }
  try {
    await destroyBlog(id)
    revalidatePath("/")
  } catch (error) {
    throw new Error("Failed To Delete Blog") // TODO: handle error
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

