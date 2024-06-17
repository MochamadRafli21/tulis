import { Button, MasonryContainer, QuilContent } from "@/libs/components/atoms";
import Card from "@/libs/components/molecules/card";
import BlogList from "@/libs/components/molecules/blog-list";
import { Header } from "@/libs/components/organisms/header";
import { getUser } from "@/app/actions";
import { getSession } from "@/libs/services";

import Image from "next/image"
import Link from "next/link"
import { SquarePen } from "lucide-react"
import { FollowBtn } from "@/libs/components/molecules/follow-button";

export default async function User({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)
  const session = await getSession()
  const currentUser = session
  const isCurrentUser = currentUser ? user?.id === currentUser?.id : false
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
      >
        {session &&
          <Link href="/article/add">
            <Button variant="bordered" className="p-1 px-2 text-secondary flex gap-2 items-center">
              <SquarePen />
              <h1 className="">PageUp</h1>
            </Button>
          </Link>
        }
      </Header>

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
            <div className="mt-4 flex gap-4 px-3 pt-4 w-full items-center justify-between font-semibold text-xs md:text-sm text-gray-600">
              <Link href={`/user/${user?.id}/follower`}>
                <h6>Follower: {user?.followerCount ? user?.followerCount : 0}</h6>
              </Link>
              <Link href={`/user/${user?.id}/following`}>
                <h6>Following: {user?.followingCount ? user?.followingCount : 0}</h6>
              </Link>
              <FollowBtn id={params?.id} is_following={user?.is_following ?? false} />
            </div>
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
