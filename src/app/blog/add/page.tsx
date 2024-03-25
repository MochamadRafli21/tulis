import { createBlog } from "@/app/actions";
import { redirect } from "next/navigation";
import { BlogForm } from "@/libs/components";

export default function BlogAdd() {

  const onSubmit = async (e: any) => {
    "use server"
    createBlog(e)
    redirect("/")
  }

  return (
    <main className="flex min-h-screen bg-secondary-100 flex-col items-center justify-between p-4 md:px-24">
      <div className="bg-white min-h-screen w-full max-w-5xl justify-center py-4 text-sm lg:flex">
        <BlogForm onSubmit={onSubmit} />
      </div>
    </main>
  )
}
