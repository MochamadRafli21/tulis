import { forgetPassword } from "@/app/actions";
import { ForgetPasswordResponse } from "@/libs/zod/schema"
import Card from "@/libs/components/molecules/card";
import { ForgetPasswordForm } from "@/libs/components/templates";

export default async function Forget() {

  const onSubmit = async (prevState: ForgetPasswordResponse, e: FormData) => {
    "use server"
    const response = await forgetPassword(prevState, e)
    return response as ForgetPasswordResponse
  }

  return (
    <main className="flex min-h-screen flex-col justify-center place-items-center">
      <Card className="p-6 w-full md:w-[300px] bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl ">
        <h1 className="text-2xl font-semibold">Be Better Next Time</h1>
        <ForgetPasswordForm onSubmit={onSubmit} />
      </Card>
    </main>
  )
}
