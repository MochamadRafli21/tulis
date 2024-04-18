import { editBlog, removeBlog, getBlogDetail } from "@/app/actions";
import { verifyToken } from "@/libs/services";
import { BlogForm } from "@/libs/components";
import { redirect } from "next/navigation";
import { getSession } from "@/libs/utils";
import { BlogResponse } from "@/libs/zod/schema";

export default async function BlogUpdate({ params }: {
  params: {
    slug: string
  }
}) {
  const session = getSession()

  const id = params.slug

  const getData = async () => {
    const data = await getBlogDetail(id)
    return data
  }

  const onSubmit = async (prevState: BlogResponse, e: FormData) => {
    "use server"
    const data = await editBlog(id, e)
    return data

  }

  const onDelete = async () => {
    "use server"
    removeBlog(id)
    redirect("/")
  }

  const blog = await getData()
  const currentUser = session && await verifyToken(session)
  const isCurrentUser = currentUser ? blog?.userId === currentUser?.id : false
  if (!isCurrentUser) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen bg-secondary-100 flex-col items-center justify-between px-2 md:px-24">
      <div className="bg-white min-h-screen h-fit w-full max-w-3xl justify-center md:p-4 text-sm">
        <BlogForm onSubmit={onSubmit} onDelete={onDelete}
          data={{
            title: blog?.title,
            content: blog?.content,
            subtitle: blog?.subtitle ?? '',
            banner: blog?.banner ?? ''
          }} />
      </div>
    </main>
  )
}
