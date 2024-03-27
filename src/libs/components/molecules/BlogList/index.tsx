"use client"

import { useState } from "react";
import { Blog } from "@/libs/zod/schema";
import { getBlogs } from "@/libs/services/blog";
import { IntersectionContainer } from "@/libs/components/atoms";
import Card from "@/libs/components/molecules/Card";
import Link from "next/link"
import Image from "next/image";

type itemList = Blog & { slug: string }

export default function BlogList({ initialBlogs, isNext }: { initialBlogs: itemList[], isNext?: boolean }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [is_done, setDone] = useState(isNext ?? false);
  const [page, setPage] = useState(2);

  const loadMoreBlog = async () => {
    const apiBlogs = await getBlogs(page)
    if (apiBlogs.length === 0) {
      setDone(true)
      return
    }
    apiBlogs.forEach((blog) => {
      setBlogs([...blogs, {
        title: blog.title,
        subtitle: blog.subtitle ?? '',
        content: blog.content,
        banner: blog.banner,
        slug: blog.slug,
        is_published: blog.is_published ?? false
      }])
    })
    setPage(page + 1)
  }

  return (
    <div>
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
      {is_done ? '' :
        <IntersectionContainer onView={loadMoreBlog} />
      }
    </div>
  );
}
