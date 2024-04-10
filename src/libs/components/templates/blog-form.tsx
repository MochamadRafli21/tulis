"use client"
import { NavBar } from "../organisms"
import { Quill, Label, TextArea } from "../atoms"
import { SubmitButton } from "../molecules"
import SubtitleInput from "../molecules/subtitle-input"
import BannerInput from "../molecules/banner-input"
import { BlogResponse } from "@/libs/zod/schema"

import { Save, X } from "lucide-react"
import { useEffect, FC } from "react"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"

interface BlogFormProps {
  onSubmit: (p: BlogResponse, e: FormData) => Promise<BlogResponse>,
  onDelete?: (e: any) => void,
  data?: {
    title?: string,
    content?: string
    subtitle?: string
    banner?: string
  }
}

export const BlogForm: FC<BlogFormProps> = ({ onSubmit, onDelete, data }) => {
  const router = useRouter()
  const [formState, formAction] = useFormState(onSubmit, {
    message: "",
    errors: undefined,
    data: {
      title: data?.title ?? "",
      content: data?.content ?? "",
      subtitle: data?.subtitle ?? "",
      banner: data?.banner ?? ""
    }
  })

  useEffect(() => {
    if (!formState.errors && formState.message) {
      router.push("/")
    }
  }, [formState])

  return (
    <>
      <NavBar
        title={onDelete ? "Edit" : "Create"}
      >
        <div></div>
        <div className="flex gap-4">
          {
            onDelete &&
            <form id="deleteForm" action={onDelete} >
              <SubmitButton className="flex items-center text-center gap-2 w-24" form="deleteForm" variant={"danger"} type="submit">
                <X />
                Delete
              </SubmitButton>
            </form>

          }
          <SubmitButton className="flex items-center gap-2 w-24 text-center" form="submitForm" type="submit">
            <Save />
            Submit
          </SubmitButton>

        </div>
      </NavBar>

      <form id="submitForm" action={formAction}>

        <div className="w-full h-20"></div>


        <BannerInput image_url={data?.banner} />


        <div className="mt-8">
          <Label htmlFor="title">Title</Label>
          <TextArea
            inputSize={"xl"}
            placeholder="Mobil Untuk Masa Depan"
            rows={1}
            defaultValue={data?.title}
            name="title"
            className="mt-2"
            variant={formState.errors?.title ? "danger" : "primary"}
          />
          {
            formState.errors?.title &&
            <p className="text-xs text-red-500">{formState.errors?.title}</p>
          }
        </div>

        <div className="mt-4">
          <SubtitleInput subtitle={data?.subtitle} />
        </div>


        <div className="mt-4 bg-white">
          <Label className="mb-4" htmlFor="content">Content</Label>
          {
            formState.errors?.title &&
            <p className="my-4 text-xs text-red-500">{formState.errors?.content}</p>
          }
          <Quill
            name="content"
            readOnly={false}
            className={"" + (formState.errors?.content ? "border border-red-500" : "")}
            content={data?.content}
          />
        </div>
      </form>
    </>
  )
}
