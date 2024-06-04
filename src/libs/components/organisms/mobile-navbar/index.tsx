"use client"

import Link from 'next/link'
import { SquarePen, Home, CircleUserRound } from "lucide-react"
import { Button } from "@/libs/components/atoms";
import { getSession } from "@/libs/services/auth";
import { useState, useEffect } from 'react';

interface MobileNavBarProps {
  children?: React.ReactNode
}

export default function MobileNavBar({ children }: MobileNavBarProps) {
  const [session, setSession] = useState(false)
  useEffect(() => {
    getSession().then((data) => {
      if (data) {
        setSession(true)
      }
    })
  }, [])
  return (
    <div className={"fixed bottom-0 z-20 w-full md:hidden"}>
      <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white bg-opacity-95 backdrop-blur-sm flex justify-between items-center rounded-lg border px-3 py-2">
        <div className="flex md:flex-row justify-evenly items-center w-full">
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
      </div >
    </div >
  )
}
