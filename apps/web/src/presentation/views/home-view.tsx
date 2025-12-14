import { Comic } from "@koma/core";
import { AddComicForm } from "../components/add-comic-form";
import { ComicCard } from "../components/comic-card";

interface HomeViewProps {
  comics: Comic[];
}

export function HomeView({ comics }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <main className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
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
          <h2 className="text-2xl font-bold mb-6">
            Your Collection ({comics.length})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>

          {comics.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No comics found. Add one above to start!
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
