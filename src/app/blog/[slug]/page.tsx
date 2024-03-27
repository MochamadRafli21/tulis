import { getBlogBySlug } from "@/app/actions";
import { Button, QuilContent } from "@/libs/components/atoms";
import Link from "next/link"
import Image from "next/image"

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

      <div className="p-8 max-w-5xl w-full lg:w-3/5">
        {

          blog?.banner &&
          <div className="relative w-full h-[300px] mb-8">
            <Image
              fill={true}
              className="w-full max-w-screen max-h-[300px] h-[300px] object-contain rounded-lg"
              src={blog?.banner ?? ""}
              alt="banner"
            />
          </div>

        }
        <div className="mb-4 w-full items-start md:px-5 md:py-3 leading-10">
          <h1 className="text-[42px] font-bold">{blog?.title}</h1>
          <h2 className="text-2xl text-gray-500 mt-5 mb-6">{blog?.subtitle}</h2>
        </div>
        <QuilContent className="mt-2" content={blog ? blog.content : ""} />
      </div>
    </main >
  )
}

