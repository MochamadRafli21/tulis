import { Button, MasonryContainer } from "@/libs/components/atoms";
import Link from "next/link"
import Card from "@/libs/components/molecules/Card";
import { QuilContent } from "@/libs/components/atoms";
import BlogListCompound from "@/libs/components/molecules/BlogListCompound";
import { getUser } from "@/app/actions";

import Image from "next/image"

export default async function Home() {
  const user = await getUser()
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className={
        user?.banner ? `bg-[url(${user?.banner}))]` : "bg-gradient-to-r from-cyan-500 to-blue-500 " + "w-full px-2 md:px-4 pt-4 flex flex-col place-items-center"}>

        <div className="w-full bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl flex justify-between items-center rounded-lg border border-gray-300 shadow px-4 py-2 mb-4">
          <h1 className="text-2xl font-semibold">BLOG</h1>
          <Link href="/blog/add">
            <Button variant="secondary" type="submit">Create Blog</Button>
          </Link>
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
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
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
    </main>
  )
}
