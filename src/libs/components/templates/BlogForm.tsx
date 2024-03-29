import { FC } from "react"
import { Quill, Label, Button, TextArea } from "../atoms"
import SubtitleInput from "../molecules/SubtitleInput"
import BannerInput from "../molecules/BannerInput"

interface BlogFormProps {
  onSubmit: (e: any) => void,
  onDelete?: (e: any) => void,
  data?: {
    title?: string,
    content?: string
    subtitle?: string
    banner?: string
  }
}

export const BlogForm: FC<BlogFormProps> = ({ onSubmit, onDelete, data }) => {
  return (
    <>
      <div className="fixed top-0 left-0 bg-white w-full mb-12 flex justify-between items-center rounded-lg border border-gray-300 shadow px-4 py-2">
        <h1 className="text-2xl font-semibold">BLOG</h1>
        <div className="flex gap-4">
          {
            onDelete &&
            <form id="deleteForm" action={onDelete} >
              <Button form="deleteForm" variant={"danger"} type="submit">Delete</Button>
            </form>

          }
          <Button form="submitForm" type="submit">Submit</Button>

        </div>
      </div>
      <form id="submitForm" action={onSubmit}>

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
          />
        </div>

        <div className="mt-4">
          <SubtitleInput subtitle={data?.subtitle} />
        </div>


        <div className="mt-4 bg-white h-fit">
          <Label className="mb-4" htmlFor="content">Content</Label>
          <Quill name="content" readOnly={false} className="min-h-[300px]" content={data?.content} />
        </div>
      </form>
    </>
  )
}
