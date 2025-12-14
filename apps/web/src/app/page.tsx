import type { Metadata } from "next";
import { addComicAction } from "@/actions/comic-actions";
import { comicRepo } from "@/lib/di";

export const metadata: Metadata = {
  title: "Koma - Comic Manager",
  description: "Sovereign Comic Manager",
};

export default async function Home() {
  const comics = await comicRepo.listAll();

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
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Add New Comic</h2>
          <form action={addComicAction} className="flex gap-3">
            <input
              type="text"
              name="isbn"
              placeholder="ISBN (e.g., 978-84-679-4260-6)"
              required
              className="flex-1 rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition shadow-md active:scale-95"
            >
              Add
            </button>
          </form>
        </section>

        {/* List Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Your Collection ({comics.length})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comics.map((comic) => (
              <article
                key={comic.id}
                className="group relative flex flex-col gap-3"
              >
                <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-200 shadow-md transition group-hover:shadow-xl">
                  {comic.coverUrl ? (
                    <img
                      src={comic.coverUrl}
                      alt={comic.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Cover
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 leading-snug">
                    {comic.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {comic.authors.join(", ")}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {comic.status}
                  </span>
                </div>
              </article>
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
