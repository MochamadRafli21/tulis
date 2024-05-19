import { createBlog } from "@/app/actions";
import { redirect } from "next/navigation";
import { BlogForm } from "@/libs/components";
import { getSession } from "@/libs/services";
export default async function BlogAdd() {

  const session = await getSession()
  if (!session) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen bg-secondary-100 flex-col items-center justify-between px-4 md:px-24">
      <div className="bg-white w-full max-w-5xl justify-center py-4 px-5">
        <BlogForm onSubmit={createBlog} />
      </div>
    </main>
  )
}
