import { Comic } from "@koma/core";

import { ComicCard } from "../components/comic-card";
import { SearchComicForm } from "../components/search-comic-form";

interface HomeViewProps {
  comics: Comic[];
}

export function HomeView({ comics }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="mx-auto max-w-4xl space-y-12 px-4">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
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

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
            {comics.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                You have no comics yet. Start searching!
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
