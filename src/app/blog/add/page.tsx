import { createBlog } from "@/app/actions";
import { BlogForm } from "@/libs/components";

export default function BlogAdd() {

  return (
    <main className="flex min-h-screen bg-secondary-100 flex-col items-center justify-between px-24">
      <div className="bg-white min-h-screen w-full max-w-5xl justify-center py-4 text-sm lg:flex">
        <BlogForm onSubmit={createBlog} />
      </div>
    </main>
  )
}
