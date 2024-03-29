import { Button, MasonryContainer, QuilContent } from "@/libs/components/atoms";
import Card from "@/libs/components/molecules/Card";
import BlogListCompound from "@/libs/components/molecules/BlogListCompound";
import { getUser } from "@/app/actions";
import { getSession } from "@/libs/utils";

import Image from "next/image"
import Link from "next/link"
import { SquarePen } from "lucide-react"

export default async function Home() {
  const user = await getUser()
  const session = getSession()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className={
        user?.banner ? `bg-[url(${user?.banner}))]` : "bg-gradient-to-r from-cyan-500 to-blue-500 " + "w-full px-2 md:px-4 pt-4 flex flex-col place-items-center"}>

        <div className="w-full bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl flex justify-between items-center rounded-lg border border-gray-300 shadow px-4 py-2 mb-4">
          <h1 className="text-2xl font-semibold">BLOG</h1>
        </div>


        <div className="p-8 max-w-screen-lg mb-12 w-full justify-center md:justify-start lg:w-10/12">
          <Card className="p-8 w-full md:w-[300px] bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl ">
            {
              user?.avatar &&
              <div className="relative w-full h-[300px] rounded-full">
                <Image
                  fill={true}
                  className="w-full max-w-screen max-h-[300px] h-[300px] object-contain rounded-full"
                  src={user?.avatar ?? ""}
                  alt="banner"
                />
              </div>
            }
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold col-span-2">{user?.name}</h1>

              {
                session &&
                <Link className="w-fit text-grey h-fit col-span-1" href={`/profile`}>
                  <SquarePen color="grey" />
                </Link>
              }
            </div>
            {
              user?.bio &&
              <QuilContent className="mt-2" content={user?.bio ?? ""} />
            }
          </Card>
        </div>

      </div>

      <MasonryContainer className="max-w-5xl px-4 my-12 w-full">
        <BlogListCompound />
      </MasonryContainer>

      {session &&
        <Link href="/blog/add">
          <Button variant="primary" className="fixed bottom-6 right-6 rounded-full p-4" type="submit">
            <SquarePen />
          </Button>
        </Link>
      }
    </main>
  )
}
