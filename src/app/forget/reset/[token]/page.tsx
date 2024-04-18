import { updateUserPasswordByToken, isVerificationCodeValid } from "@/app/actions";
import { NewPasswordResponse } from "@/libs/zod/schema"
import Card from "@/libs/components/molecules/card";
import { ResetForm } from "@/libs/components/templates";

export default async function Reset({ params }: {
  params: {
    token: string
  }
}) {

  const onSubmit = async (prevState: NewPasswordResponse, e: FormData) => {
    "use server"
    const response = await updateUserPasswordByToken(params.token, e)
    return response as NewPasswordResponse
  }

  const isValid = await isVerificationCodeValid(params.token)

  return (
    <main className="flex min-h-screen flex-col justify-center place-items-center">
      <Card className="p-6 w-full md:w-[300px] bg-white bg-opacity-95 backdrop-filter backdrop-blur-xl ">
        {
          isValid
            ? <ResetForm onSubmit={onSubmit} />
            : <h1 className="text-2xl font-semibold">Invalid Token</h1>
        }
      </Card>
    </main>
  )
}
