import { getBlogList } from "@/app/actions";
import { renderHTML } from "@/libs/utils/renderHTML";

import Link from "next/link"


export default async function Home() {
  const getData = async () => {
    const data = await getBlogList()
    return data
  }

  const blogs = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        blogs?.map((blog: any) => (
          <div key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <h1>{blog.title}</h1>
              {renderHTML(blog.content)}
            </Link>
          </div>
        ))

      }
    </main>
  )
}
