"use client"

import { Blog } from "@/libs/zod/schema";
import { getBlogs } from "@/libs/services/blog";
import Card from "@/libs/components/molecules/Card";
import InfiniteScroll from "@/libs/components/atoms/InfiniteScroll";
import { QuilContent } from "@/libs/components/atoms";


import { useState, useEffect, useRef } from "react";
import Link from "next/link"
import Image from "next/image";
import { useSearchParams } from 'next/navigation'


type itemList = Blog & { slug: string, id: string, content: string }

export default function BlogListCompound() {
  const query = useSearchParams()?.get("q") as string
  const [blogs, setBlogs] = useState<itemList[]>([]);
  const page = 1

  const scrollTriggerRef = useRef<{ resetScroll: () => void }>(null);

  const getMoreData = async (page: number) => {
    const res = async () => {
      const apiBlogs = await getBlogs(page, 10, query)
      return apiBlogs
    }
    const data = await res()
    if (data.length === 0) return true
    const mappedData: itemList[] = data.map((blog) => {
      return {
        title: blog.title,
        subtitle: blog.subtitle ?? "",
        banner: blog.banner ?? "",
        slug: blog.slug,
        content: `<p>${blog.content.replaceAll(/<.*?>/g, "").substring(0, 200)}</p>`,
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
            <Link href={`/blog/${blog.slug}`}>
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
          </Card>
        )
      })}
      <InfiniteScroll.Trigger ref={scrollTriggerRef} />
    </InfiniteScroll>
  );
}
