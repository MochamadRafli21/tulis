"use client"

import { Button, ButtonProps } from "@/libs/components/atoms"
import { LoaderCircleIcon } from "lucide-react"
import { FC } from "react"
import { useFormStatus } from "react-dom"
import { cn } from "@/libs/utils/cn"

export const SubmitButton: FC<ButtonProps> = ({ children, className, ...props }) => {
  const { pending } = useFormStatus()

  return (
    <Button {...props} type="submit" className={cn("w-full", className)} aria-disabled={pending}>
      {pending ? <LoaderCircleIcon className="h-5 animate-spin text-center w-full" /> : children}
    </Button>
  )
}
