import { ComicViewModel } from "../view-models/comic-view-model";

import { ComicGrid } from "../components/comic-grid";
import { SearchComicForm } from "../components/search-comic-form";

interface HomeViewProps {
  comics: ComicViewModel[];
}

export function HomeView({ comics }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="mx-auto max-w-4xl space-y-12 px-4">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="font-comic text-5xl font-extrabold tracking-wider text-gray-900">
            Koma Library
          </h1>
          <p className="text-lg text-gray-600">
            Manage your comic collection with style.
          </p>
        </header>

        {/* Action Section - Search */}
        <section>
          <SearchComicForm />
        </section>

        {/* List Section */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">
            Your Collection ({comics.length})
          </h2>
          <ComicGrid comics={comics} />
        </section>
      </main>
    </div>
  );
}
