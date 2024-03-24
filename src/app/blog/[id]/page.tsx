import { getBlogById } from "@/app/actions";
import { renderHTML } from "@/libs/utils/renderHTML";

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

  const blog = await getData()

  return (
    <main className="flex min-h-screen bg-secondary-100 flex-col items-center justify-between px-24">
      <div className="bg-white min-h-screen w-full max-w-5xl justify-center py-4">
        <div>
          <h1>{blog?.title}</h1>
        </div>
        <div>
          {blog && renderHTML(blog?.content)}
        </div>
      </div>
    </main>
  )
}

