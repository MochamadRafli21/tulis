import { createBlog } from "@/app/actions";
import { redirect } from "next/navigation";
import { BlogForm } from "@/libs/components";
import { getSession } from "@/libs/utils";
export default function BlogAdd() {

  const session = getSession()
  if (!session) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen bg-secondary-100 flex-col items-center justify-between px-4 pt-4 md:px-24">
      <div className="bg-white w-full max-w-5xl justify-center py-4 px-5">
        <BlogForm onSubmit={createBlog} />
      </div>
    </main>
  )
}
