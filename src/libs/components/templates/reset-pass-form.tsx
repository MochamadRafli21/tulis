"use client"

import { Label, Input } from "../atoms"
import { SubmitButton } from "../molecules"
import { NewPasswordResponse } from "@/libs/zod/schema"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"

interface ResetFormProps {
  onSubmit: (prevState: NewPasswordResponse, e: FormData) => Promise<NewPasswordResponse>,
  data?: {
    password?: string
  },
}

export const ResetForm: FC<ResetFormProps> = ({ onSubmit, data }) => {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)

  const [formState, formAction] = useFormState(onSubmit, {
    message: "",
    errors: undefined,
    data: {
      password: "",
    }
  })

  useEffect(() => {
    if (!formState.errors && formState.message) {
      setIsSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }
  }, [formState])

  return (
    <>{
      isSuccess
        ? <div className="text-green-500">
          <h1>Reset Password Success</h1>
        </div>
        :
        <form action={formAction}>
          <div className="mt-4">
            <Label htmlFor="password">New Password</Label>
            <Input
              inputSize={"md"}
              placeholder="**********"
              defaultValue={data?.password}
              type="password"
              name="password"
              className="mt-2"
            />
            {
              formState.errors?.password &&
              <p className="text-xs text-red-500">{formState.errors?.password}</p>
            }
          </div>
          <SubmitButton className="mt-4 w-full" type="submit">Submit</SubmitButton>
        </form>
    }
    </>
  )
}
