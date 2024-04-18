import Card from "@/libs/components/molecules/card";
import { LoginForm } from "@/libs/components/templates";
import { createJWT } from "@/app/actions";
import { getSession } from "@/libs/utils";
import { revalidatePath } from "next/cache";
import { LoginResponse } from "@/libs/zod/schema"

export default async function Login() {

  const onSubmit = async (prevState: LoginResponse, e: FormData) => {
    "use server"
    const response = await createJWT(prevState, e)
    const session = getSession()
    if (session) {
      revalidatePath("/")
    }
    return response
  }

  return (
    <main className="flex min-h-screen flex-col justify-center place-items-center">
      <Card className="p-6 w-full md:w-[300px] bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl ">
        <h1 className="text-2xl font-semibold">Login</h1>
        <LoginForm onSubmit={onSubmit} />
      </Card>
    </main>
  )
}
