import { FC } from "react"
import { Label, Button, Input } from "../atoms"

interface LoginFormProps {
  onSubmit: (e: any) => void,
  data?: {
    email?: string,
    password?: string
  }
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, data }) => {
  return (
    <form action={onSubmit}>


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
      </div>

      <Button className="mt-4 w-full" type="submit">Submit</Button>
    </form>
  )
}
