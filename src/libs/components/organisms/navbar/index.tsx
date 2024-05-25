import Link from 'next/link'
import { SquarePen, Home, CircleUserRound, LogOut } from "lucide-react"
import { Button } from "@/libs/components/atoms";
import { getSession } from "@/libs/services";
import { LogoutBtn } from '../../molecules/logout-button';

interface NavBarProps {
  children?: React.ReactNode
}

export default async function NavBar({ children }: NavBarProps) {
  const session = await getSession()
  return (
    <div className={"hidden md:block w-16 fixed top-0 z-20"}>
      <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white bg-opacity-95 backdrop-blur-sm border px-3 py-2">
        <div className="flex flex-col py-4 justify-between min-h-screen">
          <div>
            <Link href="/">
              <Button variant="bordered" className="p-2 w-12 h-12 flex justify-center border-none items-center">
                <Home />
              </Button>
            </Link>
            {
              session ?
                <>
                  <Link href="/article/add">
                    <Button variant="bordered" className="p-2 w-12 h-12 flex justify-center border-none items-center">
                      <SquarePen />
                    </Button>
                  </Link>
                  <Link href="/user/me">
                    <Button variant="bordered" className="p-2 w-12 h-12 flex justify-center border-none items-center">
                      <CircleUserRound />
                    </Button>
                  </Link>
                </>
                :
                <>
                  <Link href="/login">
                    <Button variant="bordered" className="p-2 w-12 h-12 flex justify-center border-none items-center">
                      <SquarePen />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="bordered" className="p-2 w-12 h-12 flex justify-center border-none items-center">
                      <CircleUserRound />
                    </Button>
                  </Link>
                </>
            }
            {
              children
            }

          </div>
          {
            session ?
              <LogoutBtn />
              : null
          }
        </div>
      </div >
    </div >
  )
}
