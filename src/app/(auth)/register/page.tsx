import { registerUser } from "@/app/actions";
import { CreateUserResponse } from "@/libs/zod/schema"
import Card from "@/libs/components/molecules/card";
import { RegisterForm } from "@/libs/components/templates";
import Link from "next/link"

export default async function Register() {

  const onSubmit = async (prevState: CreateUserResponse, e: FormData) => {
    "use server"
    const response = await registerUser(prevState, e)
    return response as CreateUserResponse
  }

  return (
    <main className="flex min-h-screen flex-col justify-center place-items-center">
      <Card className="p-6 w-full md:w-[300px] bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl ">
        <h1 className="text-2xl font-semibold">Start Your Journey NOW!</h1>
        <RegisterForm onSubmit={onSubmit} />
        <Link href="/login" className="text-gray-400 text-sm mt-1"><p>Already have an account?</p></Link>
      </Card>
    </main>
  )
}
