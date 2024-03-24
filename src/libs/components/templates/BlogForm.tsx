import { FC } from "react"
import { Quill, Label, Button, Input } from "../atoms"

interface BlogFormProps {
  onSubmit: (e: any) => void,
  data?: {
    title?: string,
    content?: string
  }
}

export const BlogForm: FC<BlogFormProps> = ({ onSubmit, data }) => {
  return (
    <form action={onSubmit}>
      <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 shadow px-4 py-2 mb-4">
        <h1 className="text-2xl font-semibold">BLOG</h1>
        <Button type="submit">Submit</Button>
      </div>
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input inputSize={"lg"} placeholder="Mobil Untuk Masa Depan" type="text" defaultValue={data?.title} name="title" />
      </div>
      <div className="mt-4">
        <Label htmlFor="content">Content</Label>
        <Quill name="content" className="h-full" content={data?.content} />
      </div>
    </form>
  )
}
