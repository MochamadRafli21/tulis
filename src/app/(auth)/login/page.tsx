import Card from "@/libs/components/molecules/card";
import { LoginForm } from "@/libs/components/templates";
import { createJWT } from "@/app/actions";
import { getSession } from "@/libs/services";
import { revalidatePath } from "next/cache";
import { LoginResponse } from "@/libs/zod/schema"
import Link from "next/link"

export default async function Login() {

  const onSubmit = async (prevState: LoginResponse, e: FormData) => {
    "use server"
    const response = await createJWT(prevState, e)
    const session = await getSession()
    if (session) {
      revalidatePath("/")
    }
    return response
  }

  return (
    <main className="flex min-h-screen flex-col justify-center place-items-center">
      <div>
        <Card className="p-6 w-full md:w-[300px] bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl ">
          <h1 className="text-2xl font-semibold">Login</h1>
          <LoginForm onSubmit={onSubmit} />
          <Link href="/register" className="text-gray-400 text-sm mt-1"><p>Dont have an account?</p></Link>
          <Link href="/forget" className="text-gray-400 text-sm mt-1"><p>Forget Password?</p></Link>
        </Card>
      </div>
    </main>
  )
}
