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
import { BlogResponse, Blog } from "@/libs/zod/schema"
import { ZodError } from "zod"

export async function createBlog(
  prevState: BlogResponse,
  formData: FormData
): Promise<BlogResponse> {
  const session = getSession()
  if (!session) {
    throw new Error("User not found")
  }
  const { id } = await verifyToken(session)
  if (!id) {
    throw new Error("User not found")
  }
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const subtitle = formData.get("subtitle") as string;
  const banner = formData.get("banner") as string;

  try {
    const blog = BlogSchema.parse({
      title: title,
      content: content,
      subtitle: subtitle,
      banner: banner
    })
    const data = await storeBlog(blog)
    await storeBlogUser({ userId: id, blogId: data.id })
    revalidatePath("/")
    return {
      "errors": undefined,
      "message": "Blog created successfully",
      "data": {
        "title": data.title,
        "content": data.content,
        "subtitle": data.subtitle ?? '',
        "banner": data.banner
      }
    }

  } catch (error) {
    const zodError = error as ZodError
    const errorMap = zodError.flatten().fieldErrors
    return {
      "errors": {
        "title": errorMap.title?.[0] ?? "",
        "content": errorMap.content?.[0] ?? "",
        "subtitle": errorMap.subtitle?.[0] ?? "",
        "banner": errorMap.banner?.[0] ?? ""
      },
      "message": "Failed to create blog",
      "data": {
        "title": title,
        "content": content,
        "subtitle": subtitle,
        "banner": banner
      }
    }
  }
}

export async function editBlog(id: string, formData: FormData): Promise<BlogResponse> {
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

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const subtitle = formData.get("subtitle") as string;
  const banner = formData.get("banner") as string;


  try {
    const blog = BlogSchema.parse({
      title: title,
      content: content,
      subtitle: subtitle,
      banner: banner
    })
    const data = await updateBlog(id, blog)
    revalidatePath("/")
    return {
      "errors": undefined,
      "message": "Blog created successfully",
      "data": {
        "title": data.title,
        "content": data.content,
        "subtitle": data.subtitle ?? '',
        "banner": data.banner
      }
    }
  } catch (error) {
    const zodError = error as ZodError
    const errorMap = zodError.flatten().fieldErrors
    return {
      "errors": {
        "title": errorMap.title?.[0] ?? "",
        "content": errorMap.content?.[0] ?? "",
        "subtitle": errorMap.subtitle?.[0] ?? "",
        "banner": errorMap.banner?.[0] ?? ""
      },
      "message": "Failed to create blog",
      "data": {
        "title": title,
        "content": content,
        "subtitle": subtitle,
        "banner": banner
      }
    }
  }
}

export async function removeBlog(id: string): Promise<BlogResponse> {
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
    return {
      "errors": undefined,
      "message": "Blog created successfully",
      "data": {} as Omit<Blog, "is_published">
    }
  } catch (error) {
    return {
      "errors": {
        "title": "",
        "content": "",
        "subtitle": "",
        "banner": ""
      },
      "message": error as string,
      "data": {} as Omit<Blog, "is_published">
    }
  }
}

export async function getBlogList(page = 1, pageSize = 10, query = "") {
  try {
    const data = await getBlogs(page, pageSize, query)
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

