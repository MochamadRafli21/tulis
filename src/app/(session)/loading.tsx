import { Header } from "@/libs/components/organisms/header";

export default async function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header
        title="PageUp"
        isSearchable={true}
        className="w-full"
      />
      <div className="w-full mt-4">
        <div className="flex min-h-screen w-full px-4 py-3 md:py-0 justify-center items-center">
          <h1 className="animate-bounce text-2xl font-semibold">Loading...</h1>
        </div>
      </div>
    </main>
  )
}
