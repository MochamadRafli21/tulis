"use client"

import { Label, Input, Quill } from "../atoms"
import ImageUpload from "../molecules/ImageUpload"
import { SubmitButton } from "../molecules"
import { EditUserResponse } from "@/libs/zod/schema"

import { FC, useEffect } from "react"
import Image from "next/image"
import { ImageUpIcon } from "lucide-react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  onSubmit: (prevState: EditUserResponse, e: FormData) => Promise<EditUserResponse>,
  data?: {
    email?: string,
    name?: string,
    bio?: string,
    banner?: string,
    avatar?: string
  }
}

export const ProfileForm: FC<ProfileFormProps> = ({ onSubmit, data }) => {
  const router = useRouter()
  const [formState, formAction] = useFormState(onSubmit, {
    message: "",
    errors: undefined,
    data: {
      name: data?.name ?? "",
      bio: data?.bio ?? "",
      banner: data?.banner ?? "",
      avatar: data?.avatar ?? "",
    }
  })

  useEffect(() => {
    if (!formState.errors && formState.message) {
      router.push("/")
    }
  }, [formState])

  return (
    <form action={formAction}>
      <div className="w-full h-32 border-b bg-gray-200 pt-4 border-gray-300 relative">
        <ImageUpload image_url={data?.banner} name="banner" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center w-full mt-8">
        <div className="md:col-span-1 relative">
          <div className="bg-gray-100 border border-gray-300 hover:bg-gray-200 w-40 h-40 p-4 justify-center items-center flex rounded-full">
            <ImageUpload
              image_url={data?.avatar}
              name="avatar"
              label={
                <ImageUpIcon className="w-10 h-10 text-gray-500" />
              }
            >
              <Image src={data?.avatar ?? ""} alt="avatar" fill={true} className="rounded-full w-40 h-40" />
            </ImageUpload>
          </div>
        </div>
        <div className="w-full md:col-span-2">
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              inputSize={"md"}
              placeholder="tul***@email.com"
              defaultValue={data?.email}
              variant="secondary"
              disabled
              name="email"
              className="mt-2"
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              inputSize={"md"}
              placeholder="Mochamad Rafli"
              defaultValue={data?.name}
              name="name"
              className="mt-2"
            />
            {
              formState.errors?.name &&
              <p className="text-xs text-red-500">{formState.errors?.name}</p>
            }
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="bio">Biodata</Label>
        <Quill
          name="bio"
          readOnly={false}
          className=""
          content={data?.bio}
        />
        {
          formState.errors?.bio &&
          <p className="text-xs text-red-500">{formState.errors?.bio}</p>
        }
      </div>

      <SubmitButton className="mt-4 w-full" type="submit">Submit</SubmitButton>
    </form>
  )
}
