import { Button } from "@/libs/components/atoms";
import { LucideLogIn } from "lucide-react";
import Link from "next/link";

export const LoginOverlay = () => {
  return (
    <div className="w-full mt-[-220px] z-30">
      <div className="bg-gradient-to-t from-white h-48 w-full">
      </div>
      <div className="flex flex-col items-center gap-4 justify-center bg-white w-full pt-8 pb-12 mb-48">
        <h1 className="text-xl">Enjoy Your Reading?</h1>
        <Link href="/login">
          <Button variant="bordered" className="p-1 px-2 text-secondary flex gap-2 items-center">
            <h1 className="">Login Now !</h1>
            <LucideLogIn />
          </Button>
        </Link>
      </div>
    </div>
  )
}
