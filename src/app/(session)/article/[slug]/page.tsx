import { getBlogBySlug, getLikes } from "@/app/actions";
import { Button, QuilContent } from "@/libs/components/atoms";
import { getSession } from "@/libs/services";
import { LikeBtn } from "@/libs/components/molecules/like-button";
import { Header } from "@/libs/components/organisms";
import { LoginOverlay } from "@/libs/components/molecules/login-overlay";

import { SquarePen, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function BlogDetail({ params }: {
  params: {
    slug: string
  }
}) {
  const session = await getSession()

  const slug = params.slug

  const getData = async () => {
    const data = await getBlogBySlug(slug)
    return data
  }

  const getBlogLikes = async () => {
    const data = await getLikes(slug)
    return data
  }

  const blog = await getData()
  const likes = await getBlogLikes()
  const currentUser = session
  const isCurrentUser = currentUser ? blog?.userId === currentUser?.id : false
  const isLiked = currentUser ? likes?.data.map((like) => like.userId).includes(currentUser?.id) : false

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header
        title="PageUp"
        isSearchable={true}
        className="w-full"
      >
        {isCurrentUser &&
          <Link href={`/article/${blog?.id}/edit`}>
            <Button variant="bordered" className="p-1 px-2 text-secondary flex gap-2 items-center">
              <SquarePen />
              <h1 className="">Edit</h1>
            </Button>
          </Link>
        }
      </Header>

      <div className="p-8 max-w-5xl w-full lg:w-3/5 relative">
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
          <div className="flex justify-between items-center px-4 w-full border-3 border-gray-300 ">
            <div className="flex gap-4 items-center">
              <Link href={`/user/${blog?.createdBy.id}`} className="flex items-center gap-2">
                <div className="relative w-[32px] h-[32px] rounded-full">
                  <Image
                    fill={true}
                    className="w-full w-[60px] h-[60px] object-contain rounded-full"
                    src={blog?.createdBy?.avatar ?? ""}
                    alt="banner"
                  />
                </div>
                <div className="flex flex-col text-xs">
                  <p className="text-gray-500 font-semibold h-fit">{blog?.createdBy?.name}</p>
                  <p>Pembaruan Terakhir pada: {blog?.updatedAt?.toISOString().split("T")[0]}</p>
                </div>
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <h3>Like: {likes?.likesCount}</h3>
              {session ?
                <LikeBtn id={blog?.id as string} is_liked={isLiked || false} />
                :
                <Link href="/login">
                  <Heart />
                </Link>
              }
            </div>
          </div>
        </div>
        <QuilContent className={"mt-2 " + session ? "" : "max-h-[800px] overflow-hidden"} content={blog ? blog.content : ""} />
      </div>
      {
        !session &&
        <LoginOverlay />
      }
    </main >
  )
}

