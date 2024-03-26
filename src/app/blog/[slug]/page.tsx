import { getBlogBySlug } from "@/app/actions";
import { Button, QuilContent } from "@/libs/components/atoms";
import Link from "next/link"

export default async function BlogDetail({ params }: {
  params: {
    slug: string
  }
}) {

  const slug = params.slug

  const getData = async () => {
    const data = await getBlogBySlug(slug)
    return data
  }

  const blog = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 shadow px-4 py-2 mb-4">
        <h1 className="text-2xl font-semibold">BLOG</h1>
        <Link href={`/blog/${blog?.id}/edit`}>
          <Button variant="secondary" type="submit">Edit Blog</Button>
        </Link>
      </div>

      <div className="py-8 max-w-5xl w-3/5">
        <div className="mb-6 w-full items-start">
          <h1 className="text-5xl font-bold">{blog?.title}</h1>
        </div>
        <QuilContent className="mt-2" content={blog ? blog.content : ""} />
      </div>
    </main >
  )
}

