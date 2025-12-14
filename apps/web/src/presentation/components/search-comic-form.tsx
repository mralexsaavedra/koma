"use client";

import Image from "next/image";

import { useComicSearch } from "../hooks/use-comic-search";

export const SearchComicForm = () => {
  const {
    query,
    setQuery,
    results,
    isSearching,
    isAdding,
    handleSearch,
    handleAdd,
  } = useComicSearch();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {results.map((comic) => (
            <div
              key={comic.isbn}
              className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-2/3 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                {comic.coverUrl ? (
                  <Image
                    src={comic.coverUrl}
                    alt={comic.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No Cover
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <h4 className="line-clamp-2 font-bold text-gray-900">
                  {comic.title}
                </h4>
                <p className="text-sm text-gray-500">{comic.publisher}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {comic.authors.join(", ")}
                </p>
                <button
                  onClick={() => handleAdd(comic.isbn)}
                  disabled={isAdding}
                  className="mt-3 self-start rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                >
                  {isAdding ? "Adding..." : "Add to Collection"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && query && !isSearching && (
        <p className="text-center text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
};
