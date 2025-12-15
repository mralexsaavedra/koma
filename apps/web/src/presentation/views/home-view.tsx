import { ComicGrid } from "@/presentation/components/organisms/comic-grid";
import { Navbar } from "@/presentation/components/organisms/navbar";
import { SearchSection } from "@/presentation/components/organisms/search-section";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface HomeViewProps {
  comics: ComicViewModel[];
}

export const HomeView = ({ comics }: HomeViewProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="relative">
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-480">
          <div className="mb-12">
            <section className="w-full transition-all duration-500 ease-in-out">
              <SearchSection />
            </section>
          </div>

          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-comic text-3xl font-bold tracking-wide text-gray-800">
                Your Collection{" "}
                <span className="ml-2 font-sans text-lg font-medium text-gray-400">
                  ({comics.length})
                </span>
              </h2>
            </div>
            <ComicGrid comics={comics} />
          </section>
        </main>
      </div>
    </div>
  );
};
