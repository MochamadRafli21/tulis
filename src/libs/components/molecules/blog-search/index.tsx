"use client"
import { Input } from "../../atoms/input"
import SetDisplay from "../../atoms/set-display"
import SelectProvider from "../../atoms/select"
import Card from "../../molecules/card"

import { getBlogs } from "@/libs/services/blog";
import { Blog } from "@/libs/zod/schema";

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

type itemList = Blog & { slug: string, id: string, content: string }

export default function BlogSearch() {
  const query = useSearchParams()?.get("q") as string

  const router = useRouter()
  const [value, setValue] = useState(query ?? "");
  const [data, setData] = useState<itemList[]>([]);

  const openBlog = (slug: string) => {
    router.push("/blog/" + slug)
  }

  const submitSearch = () => {
    if (!value) return
    router.push("/?q=" + value)
  }

  const onSelect = (i: number) => {
    if (i === 0) {
      submitSearch()
    } else {
      openBlog(data[i - 1].slug)
    }
    onBackdropClick()
  }

  const backdropRef = useRef<HTMLDivElement>(null);
  const onBackdropClick = () => {
    backdropRef.current?.click();
  };

  const searchInputRef = useRef<HTMLInputElement>(null);

  const getQueryData = async () => {
    const res = async () => {
      const apiBlogs = await getBlogs(1, 5, value)
      return apiBlogs
    }
    const data = await res()
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
  }


  useEffect(() => {
    if (!value) return
    getQueryData()
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [value])

  return (
    <>
      <div className="relative z-[99]">
        <SetDisplay>
          <SelectProvider>
            <div className="flex flex-col">
              <SetDisplay.ToggleFocusDisplay targetState={true}>
                <label htmlFor="search">
                  <SelectProvider.Control onSelect={onSelect}>
                    <Input
                      name="search"
                      id="search"
                      placeholder="Search..."
                      ref={searchInputRef}
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      className="w-full"
                      variant={"bordered"}
                      inputSize={"sm"}
                      autoComplete="off"
                    />
                  </SelectProvider.Control>
                </label>
              </SetDisplay.ToggleFocusDisplay>
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
                                onClick={(e) => {
                                  e.stopPropagation()
                                  console.log(e)
                                  searchInputRef.current?.focus()
                                  submitSearch()
                                }}
                                key={-1}
                              >
                                {value ? value + "..." : "Search..."}
                              </div>

                            }
                            {
                              data.map((item) => {
                                return (
                                  <div
                                    className='cursor-pointer px-2 py-1 rounded'
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      console.log(e)
                                      searchInputRef.current?.focus()
                                      openBlog(item.slug)
                                    }}
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
                      <div ref={backdropRef} className='absolute z-10 top-0 left-0 w-screen h-screen' />
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
