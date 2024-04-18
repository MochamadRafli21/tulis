"use client"

import { Blog } from "@/libs/zod/schema";
import { getBlogs } from "@/libs/services/blog";
import { getUserBlogs } from "@/libs/services/bloguser";
import Card from "@/libs/components/molecules/card";
import InfiniteScroll from "@/libs/components/atoms/infinite-scroll";
import { QuilContent } from "@/libs/components/atoms";


import { useState, useEffect, useRef } from "react";
import Link from "next/link"
import Image from "next/image";
import { useSearchParams } from 'next/navigation'


type itemList = Blog & {
  slug: string,
  id: string,
  content: string,
  createdBy: {
    id: string,
    name: string,
    avatar: string
  },
  createdAt: string
}

export default function BlogList({ userId }: { userId?: string }) {
  const query = useSearchParams()?.get("q") as string
  const [blogs, setBlogs] = useState<itemList[]>([]);
  const page = 1

  const scrollTriggerRef = useRef<{ resetScroll: () => void }>(null);

  const getMoreData = async (page: number) => {
    const res = async () => {
      const apiBlogs = userId ? await getUserBlogs(userId, page, 10) : await getBlogs(page, 10, query)
      return apiBlogs
    }
    const data = await res()
    if (data.length === 0) return true
    const mappedData: itemList[] = data.map((blog) => {
      return {
        id: blog.id,
        title: blog.title,
        subtitle: blog.subtitle ?? "",
        banner: blog.banner ?? "",
        slug: blog.slug,
        content: `<p>${blog.content.replaceAll(/<.*?>/g, "").substring(0, 200)}</p>`,
        is_published: blog.is_published,
        createdBy: {
          id: blog.createdBy.id,
          name: blog.createdBy.name,
          avatar: blog.createdBy.avatar
        },
        createdAt: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "",
      } as itemList
    })
    setBlogs([...blogs, ...mappedData])
    return false
  }

  useEffect(() => {
    setBlogs([])
    scrollTriggerRef.current?.resetScroll()
  }, [query])

  return (
    <InfiniteScroll currentPage={page} onUpdate={getMoreData}>
      {blogs.map((blog) => {
        return (
          <Card className="mb-3 py-2 break-inside-avoid h-fit horver:bg-gray-100" key={blog.slug}>
            <Link href={`/article/${blog.slug}`}>
              <div className="px-4 py-2">
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
                {blog.subtitle &&
                  <p className="text-gray-500">{blog.subtitle}</p>
                }
              </div>
              <QuilContent className="!h-fit text-gray-400 line-clamp-3 truncate" content={blog.content} />
            </Link>
            <div className="px-3 py-2 text-gray-500 flex text-xs justify-between items-center">
              <Link href={`/user/${blog.createdBy.id}`} className="flex items-center gap-2">
                {
                  blog.createdBy?.avatar &&
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                      src={blog.createdBy?.avatar ?? ""}
                      alt="avatar"
                    />
                  </div>
                }
                <p>{blog.createdBy?.name}</p>
              </Link>
              <p>{blog.createdAt}</p>
            </div>
          </Card>
        )
      })}
      <InfiniteScroll.Trigger ref={scrollTriggerRef} />
      <div className="h-10"></div>
    </InfiniteScroll>
  );
}
