import { ComicViewModel } from "../view-models/comic-view-model";
import { HomeHeader } from "../components/home-header";
import { ComicGrid } from "../components/comic-grid";
import { SearchComicForm } from "../components/search-comic-form";

interface HomeViewProps {
  comics: ComicViewModel[];
}

export const HomeView = ({ comics }: HomeViewProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="mx-auto max-w-4xl space-y-12 px-4">
        <HomeHeader />

        <section>
          <SearchComicForm />
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">
            Your Collection ({comics.length})
          </h2>
          <ComicGrid comics={comics} />
        </section>
      </main>
    </div>
  );
};
