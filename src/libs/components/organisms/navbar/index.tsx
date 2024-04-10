import Link from 'next/link'
import BlogSearch from "@/libs/components/molecules/blog-search";
import { FC } from "react";
import { cn } from '@/libs/utils/cn'

interface NavBarProps {
  title: string
  isSearchable?: boolean
  children?: React.ReactNode
  className?: string
}

export const NavBar: FC<NavBarProps> = ({ title, isSearchable, children, className }) => {
  return (
    <div className={cn([className, "sticky top-5 z-20 w-full px-4 mt-4"])}>
      <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white bg-opacity-95 backdrop-blur-sm flex justify-between items-center rounded-lg border px-3 py-2">
        <div className="flex flex-col md:flex-row gap-2 md:items-center w-full">
          <Link href="/">
            <h1 className="text-xl font-semibold w-fit">{title}.</h1>
          </Link>
          <div className="w-full flex justify-between items-center">
            {isSearchable &&
              <BlogSearch />
            }
            {
              children
            }
          </div>
        </div>
      </div>
    </div>
  )
}
