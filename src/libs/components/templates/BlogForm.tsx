import { FC } from "react"
import { Quill, Label, Button, TextArea } from "../atoms"
import SubtitleInput from "../molecules/SubtitleInput"

interface BlogFormProps {
  onSubmit: (e: any) => void,
  data?: {
    title?: string,
    content?: string
    subtitle?: string
  }
}

export const BlogForm: FC<BlogFormProps> = ({ onSubmit, data }) => {
  return (
    <form action={onSubmit}>
      <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 shadow px-4 py-2 mb-4">
        <h1 className="text-2xl font-semibold">BLOG</h1>
        <Button type="submit">Submit</Button>
      </div>


      <div>
        <Label htmlFor="title">Title</Label>
        <TextArea
          inputSize={"xl"}
          placeholder="Mobil Untuk Masa Depan"
          rows={1}
          defaultValue={data?.title}
          name="title"
        />
      </div>

      <SubtitleInput subtitle={data?.subtitle} />

      <div className="mt-4">
        <Label className="mb-4" htmlFor="content">Content</Label>
        <Quill name="content" className="min-h-[300px]" content={data?.content} />
      </div>
    </form>
  )
}
