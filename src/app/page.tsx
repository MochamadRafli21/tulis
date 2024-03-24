import { getBlogList } from "@/app/actions";
import { renderHTML } from "@/libs/utils/renderHTML";
import { Button } from "@/libs/components/atoms";
import Link from "next/link"


export default async function Home() {
  const getData = async () => {
    const data = await getBlogList()
    return data
  }

  const blogs = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 shadow px-4 py-2 mb-4">
        <h1 className="text-2xl font-semibold">BLOG</h1>
        <Link href="/blog/add">
          <Button variant="secondary" type="submit">Create Blog</Button>
        </Link>
      </div>
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          blogs?.map((blog: any) => (
            <div className="px-2 py-1 " key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <h1 className="text-2xl font-semibold text-black">{blog.title}</h1>
                <div className="mt-2 line-clamp-3 text-gray-500">
                  {renderHTML(blog.content)}
                </div>
              </Link>
            </div>
          ))
        }

      </div>
    </main>
  )
}
