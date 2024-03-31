"use client"

import { Label, Input } from "../atoms"
import { SubmitButton } from "../molecules"
import { LoginResponse } from "@/libs/zod/schema"

import { FC, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"

interface LoginFormProps {
  onSubmit: (prevState: LoginResponse, e: FormData) => Promise<LoginResponse>,
  data?: {
    email?: string,
    password?: string
  }
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, data }) => {
  const router = useRouter()
  const [formState, formAction] = useFormState(onSubmit, {
    message: "",
    errors: undefined,
    data: {
      email: "",
      password: "",
      access_token: "",
    }
  })

  useEffect(() => {
    if (!formState.errors && formState.message) {
      router.push("/")
    }
  }, [formState])

  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          inputSize={"md"}
          placeholder="tul***@email.com"
          defaultValue={data?.email}
          name="email"
          type="email"
          className="mt-2"
        />
        {
          formState.errors?.email &&
          <p className="text-xs text-red-500">{formState.errors?.email}</p>
        }
      </div>

      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
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
  )
}
