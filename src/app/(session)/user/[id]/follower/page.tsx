import { Button } from "@/libs/components/atoms";
import Card from "@/libs/components/molecules/card";
import { Header } from "@/libs/components/organisms/header";
import { getUserFollower } from "@/app/actions";
import { getSession } from "@/libs/services";

import Image from "next/image"
import Link from "next/link"
import { SquarePen } from "lucide-react"

export default async function UserFollower({ params }: { params: { id: string } }) {
  const follower = await getUserFollower(params.id)
  const session = await getSession()

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

      <div className="w-full md:max-w-[400px] grid grid-cols-1 mx-auto mt-4">
        <div className="px-4 md:px-8 md:top-16 md:h-full md:col-span-1 my-4 md:my-0 w-full justify-center">
          {
            follower && follower.map((user: { name: string, bio: string | null, id: string, avatar: string | null }) => {
              return (
                <Link key={user.id} href={`/user/${user.id}`}>
                  <Card className="max-w-sm max-h-[80px] h-fit px-4 py-2 flex items-center">
                    {
                      <div className="relative w-16 h-16 rounded-full">
                        <Image
                          fill={true}
                          className="w-16 h-16 object-cover rounded-full"
                          src={user?.avatar ?? ""}
                          alt="avatar"
                        />
                      </div>
                    }
                    <div className="pl-4">
                      <h1 className="text-sm font-semibold">{user.name}</h1>
                    </div>
                  </Card>
                </Link>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}
