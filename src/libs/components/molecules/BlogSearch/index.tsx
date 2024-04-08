"use client"
import { Input } from "../../atoms/Input"
import SetDisplay from "../../atoms/SetDisplay"
import SelectProvider from "../../atoms/Select"
import Card from "../../molecules/Card"

import { getBlogs } from "@/libs/services/blog";
import { Blog } from "@/libs/zod/schema";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

type itemList = Blog & { slug: string, id: string, content: string }

export default function BlogSearch({ query }: { query?: string }) {

  const router = useRouter()
  const [value, setValue] = useState(query ?? "");
  const [data, setData] = useState<itemList[]>([]);

  const openBlog = (slug: string) => {
    router.push("/blog/" + slug)
  }

  const submitSearch = () => {
    if (!value) return
    router.push("?q=" + value)
  }

  const onSelect = (i: number) => {
    if (i === 0) {
      submitSearch()
    } else {
      openBlog(data[i - 1].slug)
    }
  }

  const getQueryData = async () => {
    const res = async () => {
      const apiBlogs = await getBlogs(1, 5, value)
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
        content: `<p>${blog.content.replaceAll(/<.*?>/g, "").substring(0, 200)}</p>`,
      } as itemList
    })
    setData([...mappedData])
    return true
  }

  useEffect(() => {
    if (!value) return
    getQueryData()
  }, [value])

  return (
    <>
      <div className="relative z-[99]">
        <SetDisplay>
          <SelectProvider>
            <div className="flex flex-col">
              <SetDisplay.ToggleDisplay targetState={true}>
                <SelectProvider.Control onSelect={onSelect}>
                  <Input onChange={(e) => setValue(e.target.value)} value={value} className="w-full" variant={"bordered"} />
                </SelectProvider.Control>
              </SetDisplay.ToggleDisplay>
              <SetDisplay.ShowContent>
                <div className='relative'>
                  <div className='absolute'>
                    <div className='flex flex-col'>
                      <Card className='bg-white px-2 py-3 h-fit max-h-[300px] overflow-y-auto'>
                        <div className='flex flex-col'>
                          <SelectProvider.Content >
                            {value &&
                              <div
                                className='cursor-pointer px-2 py-1 rounded'
                                onClick={() => submitSearch()}
                                key={-1}
                              >
                                {value + "..."}
                              </div>

                            }
                            {
                              data.map((item) => {
                                return (
                                  <div
                                    className='cursor-pointer px-2 py-1 rounded'
                                    onClick={() => openBlog(item.slug)}
                                    key={data.indexOf(item)}
                                  >
                                    {item.title}
                                  </div>
                                )
                              })
                            }
                          </SelectProvider.Content>
                        </div>
                      </Card>
                    </div>

                  </div>
                </div>
                {
                  typeof window === "object" &&
                  createPortal(
                    <SetDisplay.ToggleDisplay targetState={false}>
                      <div className='absolute z-10 top-0 left-0 w-screen h-screen' />
                    </SetDisplay.ToggleDisplay>
                    , document.body)
                }
              </SetDisplay.ShowContent>
            </div>
          </SelectProvider>
        </SetDisplay>

      </div>
    </>
  )
}
