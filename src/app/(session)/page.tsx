import { MasonryContainer } from "@/libs/components/atoms";
import BlogList from "@/libs/components/molecules/blog-list";
import { Header } from "@/libs/components/organisms/header";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header
        title="PageUp"
        isSearchable={true}
        className="w-full"
      />
      <div className="w-full mt-4">
        <div className="flex min-h-screen w-full px-4 py-3 md:py-0 justify-center">
          <MasonryContainer className="max-w-5xl mt-4 w-full">
            <BlogList />
          </MasonryContainer>
        </div>
      </div>
    </main>
  )
}
