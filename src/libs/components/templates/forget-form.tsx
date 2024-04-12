"use client"

import { Label, Input } from "../atoms"
import { SubmitButton } from "../molecules"
import { ForgetPasswordResponse } from "@/libs/zod/schema"

import { FC, useEffect, useState } from "react"
import { useFormState } from "react-dom"

interface ForgetPasswordFormProps {
  onSubmit: (prevState: ForgetPasswordResponse, e: FormData) => Promise<ForgetPasswordResponse>,
  data?: {
    email?: string,
  }
}

export const ForgetPasswordForm: FC<ForgetPasswordFormProps> = ({ onSubmit, data }) => {
  const [isSuccess, setIsSuccess] = useState(false)

  const [formState, formAction] = useFormState(onSubmit, {
    message: "",
    errors: undefined,
    data: {
      email: "",
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
          <h1>Sending Request Success</h1>
          <p>Please check your email for activation link</p>
        </div>
        :
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
          <SubmitButton className="mt-4 w-full" type="submit">Submit</SubmitButton>
        </form>


    }
    </>
  )
}
