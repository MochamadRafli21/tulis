import { getBlogList } from "@/app/actions";
import { Button } from "@/libs/components/atoms";
import Link from "next/link"
import Image from "next/image";

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
      <div className="max-w-5xl columns-1 md:columns-2 lg:columns-3 gap-3 px-4 w-full">
        {
          blogs?.map((blog: any) => (
            <div className="px-4 mb-3 py-2 break-inside-avoid border border-gray-200 rounded-lg h-fit horver:bg-gray-100" key={blog.slug}>
              <Link href={`/blog/${blog.slug}`}>
                {blog.banner &&
                  <div className="relative w-full h-[150px]">
                    <Image
                      fill={true}
                      className="w-full max-w-screen max-h-[300px] h-[300px] object-cover rounded-lg"
                      src={blog?.banner ?? ""}
                      alt="banner"
                    />
                  </div>
                }
                <h1 className="text-2xl font-semibold text-black mt-4 mb-1">{blog.title}</h1>
                <p className="text-gray-500 mb-4">{blog.subtitle}</p>
              </Link>
            </div>
          ))
        }

      </div>
    </main>
  )
}
