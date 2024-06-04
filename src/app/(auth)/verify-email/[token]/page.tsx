import { verifyEmail } from "@/app/actions";
import Card from "@/libs/components/molecules/card";
import Link from "next/link"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export default async function Activate({ params }: { params: { token: string } }) {

  const verified = await verifyEmail(params.token)
  if (!verified.errors) {
    revalidatePath("/")
    redirect('/login')
  }
  return (
    <main className="flex min-h-screen flex-col justify-center items-center place-items-center">
      <Card className="p-6 w-full md:w-[300px] bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl ">
        {
          verified.errors ?
            <h1 className="text-2xl font-semibold">{verified.message}</h1>
            :
            <>
              <h1 className="text-2xl font-semibold">Email Verified!</h1>
              <Link href="/login" className="text-gray-400 text-sm mt-1"><p>Click Here To Login</p></Link>
            </>
        }
      </Card>
    </main>
  )
}
