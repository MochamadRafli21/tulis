import { getBlogList } from "@/app/actions";
import { Button, MasonryContainer } from "@/libs/components/atoms";
import Link from "next/link"
import BlogList from "@/libs/components/molecules/BlogList";

export default async function Home() {
  const getData = async () => {
    const data = await getBlogList()
    const mappedBlogs = data?.map((blog) => {
      return {
        title: blog.title,
        subtitle: blog.subtitle ?? '',
        content: blog.content,
        slug: blog.slug,
        is_published: blog.is_published ?? false,
        banner: blog.banner
      }
    })
    return mappedBlogs
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
      <MasonryContainer className="max-w-5xl px-4 w-full">
        <BlogList initialBlogs={blogs ?? []} />
      </MasonryContainer>

    </main>
  )
}
