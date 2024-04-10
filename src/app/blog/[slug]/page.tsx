import { getBlogBySlug, getUser } from "@/app/actions";
import { Button, QuilContent } from "@/libs/components/atoms";
import Link from "next/link"
import Image from "next/image"
import { getSession } from "@/libs/utils";
import { NavBar } from "@/libs/components/organisms/navbar";
import { SquarePen } from "lucide-react"

export default async function BlogDetail({ params }: {
  params: {
    slug: string
  }
}) {
  const user = await getUser()

  const session = getSession()

  const slug = params.slug

  const getData = async () => {
    const data = await getBlogBySlug(slug)
    return data
  }

  const blog = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar
        title={user?.name.split(" ")[0] ?? ""}
        isSearchable={true}
        className="w-full"
      >
        {session &&
          <Link href={`/blog/${blog?.id}/edit`}>
            <Button variant="bordered" className="p-1 px-2 text-secondary flex gap-2 items-center">
              <SquarePen />
              <h1 className="">Edit</h1>
            </Button>
          </Link>
        }
      </NavBar>

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

