import { Button, MasonryContainer } from "@/libs/components/atoms";
import BlogList from "@/libs/components/molecules/blog-list";
import { NavBar } from "@/libs/components/organisms/navbar";
import { getSession } from "@/libs/utils";

import Link from "next/link"
import { SquarePen } from "lucide-react"

export default async function Home() {
  const session = getSession()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar
        title="Tulis"
        isSearchable={true}
        className="w-full"
      >
        {session ?
          <Link href="/article/add">
            <Button variant="bordered" className="p-1 px-2 text-secondary flex gap-2 items-center">
              <SquarePen />
              <h1 className="">Tulis</h1>
            </Button>
          </Link> :
          <Link href="/login">
            <Button variant="bordered" className="p-1 px-2 text-secondary flex gap-2 items-center">
              <SquarePen />
              <h1 className="">Tulis</h1>
            </Button>
          </Link>
        }
      </NavBar>

      <div className="w-full mt-4">
        <div className="flex min-h-screen w-full px-4 py-3 md:py-0 justify-center">
          <MasonryContainer className="max-w-5xl mt-4 w-full">
            <BlogList />
          </MasonryContainer>
        </div>
      </div>
    </main>
  )
}
