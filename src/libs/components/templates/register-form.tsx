"use client"

import { Label, Input } from "../atoms"
import { SubmitButton } from "../molecules"
import { CreateUserResponse } from "@/libs/zod/schema"

import { FC, useEffect, useState } from "react"
import { useFormState } from "react-dom"

interface RegisterFormProps {
  onSubmit: (prevState: CreateUserResponse, e: FormData) => Promise<CreateUserResponse>,
  data?: {
    name?: string,
    email?: string,
    password?: string
  }
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, data }) => {
  const [isSuccess, setIsSuccess] = useState(false)

  const [formState, formAction] = useFormState(onSubmit, {
    message: "",
    errors: undefined,
    data: {
      name: "",
      email: "",
      password: "",
    }
  })

  useEffect(() => {
    if (!formState.errors && formState.message) {
      setIsSuccess(true)
    }
  }, [formState])

  return (
    <>{
      isSuccess
        ? <div className="text-green-500">
          <h1>Register Success</h1>
          <p>Please check your email for activation link</p>
        </div>
        :
        <form action={formAction}>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              inputSize={"md"}
              placeholder="Mochamad Rafli"
              defaultValue={data?.name}
              name="name"
              type="text"
              className="mt-2"
            />
            {
              formState.errors?.name &&
              <p className="text-xs text-red-500">{formState.errors?.name}</p>
            }
          </div>

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


    }
    </>
  )
}
