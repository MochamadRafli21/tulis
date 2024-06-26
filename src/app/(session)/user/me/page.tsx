import { MasonryContainer, QuilContent } from "@/libs/components/atoms";
import Card from "@/libs/components/molecules/card";
import BlogList from "@/libs/components/molecules/blog-list";
import { Header } from "@/libs/components/organisms";
import { getUser } from "@/app/actions";
import { getSession } from "@/libs/services";

import Image from "next/image"
import Link from "next/link"
import { SquarePen } from "lucide-react"
import { redirect } from "next/navigation"

export default async function UserMe() {
  const session = await getSession()
  const currentUser = session
  if (!currentUser) {
    redirect('/')
  }
  const user = await getUser(currentUser.id)
  const isCurrentUser = currentUser.id ?? false
  if (user && !user?.banner) {
    const placholderImage = await fetch('https://source.unsplash.com/random/?write')
    user.banner = placholderImage.url
  }


  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header
        title="PageUp"
        isSearchable={true}
        className="w-full"
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-4">

        <div className="px-4 md:px-8 md:top-16 md:h-full md:col-span-1 my-4 md:my-0 w-full justify-center">
          <Card className="block md:sticky md:top-24 px-2 py-5 w-full bg-white bg-opacity-85">
            <div className="mb-4 flex justify-center">
              {
                user?.avatar &&
                <div className="relative w-40 h-40 rounded-full">
                  <Image
                    fill={true}
                    className="w-40 h-40 object-cover rounded-full"
                    src={user?.avatar ?? ""}
                    alt="banner"
                  />
                </div>
              }
            </div>
            <div className="flex justify-between px-3 pt-4 items-center">
              <h1 className="text-2xl font-semibold col-span-2">{user?.name}</h1>

              {
                isCurrentUser &&
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

        <div className="col-span-2 min-h-screen w-full px-4 py-3 md:py-0 md:px-4">
          <div
            style={{
              backgroundImage: `url(${user?.banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className={"hidden md:block w-full px-2 md:px-4 pt-4 h-40"}>
          </div>
          <MasonryContainer className="max-w-5xl mt-4 w-full">
            <BlogList userId={user?.id} />
          </MasonryContainer>
        </div>

      </div>

    </main>
  )
}
