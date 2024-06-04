import { ProfileForm } from "@/libs/components/templates";
import { getCurrentUser, updateProfile } from "@/app/actions";
import { getSession } from "@/libs/services";

import { redirect } from "next/navigation"

export default async function Profile() {
  const session = await getSession()

  const user = await getCurrentUser()
  if (!session) {
    redirect('/')
  }


  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="md:border border-gray-300 p-4 min-h-screen w-full md:w-10/12 max-w-screen-lg">
        <ProfileForm
          onSubmit={updateProfile}
          data={
            {
              name: user?.name ?? '',
              bio: user?.bio ?? '',
              email: user?.email ?? '',
              banner: user?.banner ?? '',
              avatar: user?.avatar ?? '',
            }
          } />
      </div>
    </main>
  )
}
