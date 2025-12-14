import { Comic } from "@koma/core";

import { AddComicForm } from "../components/add-comic-form";
import { ComicCard } from "../components/comic-card";

interface HomeViewProps {
  comics: Comic[];
}

export function HomeView({ comics }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <main className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Koma Library
          </h1>
          <p className="text-lg text-gray-600">
            Manage your comic collection with style.
          </p>
        </header>

        {/* Action Section */}
        <AddComicForm />

        {/* List Section */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">
            Your Collection ({comics.length})
          </h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>

          {comics.length === 0 && (
            <div className="py-20 text-center text-gray-400">
              No comics found. Add one above to start!
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
