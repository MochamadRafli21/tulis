import Link from 'next/link'
import { FC } from "react";
import { cn } from '@/libs/utils/cn'
import { SquarePen, Home, CircleUserRound } from "lucide-react"
import { Button } from "@/libs/components/atoms";

interface MobileNavBarProps {
  children?: React.ReactNode
  className?: string
}

export const MobileNavBar: FC<MobileNavBarProps> = ({ children, className }) => {
  return (
    <div className={cn([className, "sticky bottom-0 z-20 w-full"])}>
      <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white bg-opacity-95 backdrop-blur-sm flex justify-between items-center rounded-lg border px-3 py-2">
        <div className="flex md:flex-row justify-evenly items-center w-full">
          <Link href="/">
            <Button variant="bordered" className="p-2 w-12 h-12 flex justify-center border-none items-center">
              <Home />
            </Button>
          </Link>
          {
            true ?
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
      </div >
    </div >
  )
}
