import { editBlog, getBlogById } from "@/app/actions";
import { BlogForm } from "@/libs/components";
import { redirect } from "next/navigation";

export default async function BlogAdd({ params }: {
  params: {
    id: string
  }
}) {

  const id = params.id

  const getData = async () => {
    const data = await getBlogById(id)
    return data
  }

  const onSubmit = async (e: any) => {
    "use server"
    editBlog(id, e)

    redirect("/")
  }

  const blog = await getData()

  return (
    <main className="flex min-h-screen bg-secondary-100 flex-col items-center justify-between p-2 md:px-24">
      <div className="bg-white min-h-screen w-full max-w-3xl justify-center md:p-4 text-sm lg:flex">
        <BlogForm onSubmit={onSubmit} data={{ title: blog?.title, content: blog?.content }} />
      </div>
    </main>
  )
}
