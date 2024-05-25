"use client"

import { Button } from "@/libs/components/atoms"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout } from "@/app/actions/auth"

export const LogoutBtn = () => {
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Button
      variant="bordered"
      className="p-2 w-12 h-12 flex justify-center border-none items-center"
      onClick={handleLogout}
    >
      <LogOut />
    </Button>
  )
}
