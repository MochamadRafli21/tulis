"use client"
import { useState } from 'react';
import SetDisplay from "../../atoms/SetDisplay"
import SelectProvider from "../../atoms/Select"
import Card from "../../molecules/Card"
import { Input } from "../../atoms"
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function BlogSearch({ query }: { query?: string }) {
  const router = useRouter()
  const [value, setValue] = useState(query ?? "");

  const data = ["test", "test2"]

  const submitSearch = () => {
    if (!value) return
    router.push("?q=" + value)
  }

  const onSelect = (i: number) => {
    if (i === 0) {
      submitSearch()
    } else {
      setValue(data[i - 1])
    }
  }

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
                                    onClick={() => setValue(item)}
                                    key={data.indexOf(item)}
                                  >
                                    {item}
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
