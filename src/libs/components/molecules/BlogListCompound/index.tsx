"use client"

import { useState } from "react";
import { Blog } from "@/libs/zod/schema";
import { getBlogs } from "@/libs/services/blog";
import Card from "@/libs/components/molecules/Card";
import InfiniteScroll from "@/libs/components/atoms/InfiniteScroll";
import Link from "next/link"
import Image from "next/image";

type itemList = Blog & { slug: string, id: string }

export default function BlogListCompound() {
  const [blogs, setBlogs] = useState<itemList[]>([]);

  const getMoreData = async (page: number) => {
    const res = async () => {
      const apiBlogs = await getBlogs(page)
      return apiBlogs
    }
    const data = await res()
    if (!data) return false
    const mappedData: itemList[] = data.map((blog) => {
      return {
        title: blog.title,
        subtitle: blog.subtitle ?? "",
        banner: blog.banner ?? "",
        slug: blog.slug,
      } as itemList
    })
    setBlogs([...blogs, ...mappedData])
    return true
  }
  return (
    <InfiniteScroll currentPage={1} onUpdate={getMoreData}>
      {blogs.map((blog) => {
        return (
          <Card className="px-4 mb-3 py-2 break-inside-avoid h-fit horver:bg-gray-100" key={blog.slug}>
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
          </Card>
        )
      })}
      <InfiniteScroll.Trigger />
    </InfiniteScroll>
  );
}
