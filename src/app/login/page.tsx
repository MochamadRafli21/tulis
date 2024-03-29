import Card from "@/libs/components/molecules/Card";
import { LoginForm } from "@/libs/components/templates";
import { createJWT } from "@/app/actions";
import { getSession } from "@/libs/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Login() {

  const onSubmit = async (e: any) => {
    "use server"
    await createJWT(e)

    const session = getSession()
    console.log(session)
    if (session) {
      revalidatePath("/")
      redirect("/")
    }
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
