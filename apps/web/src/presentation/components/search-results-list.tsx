import Image from "next/image";
import { ComicMetadata } from "@koma/core";

interface SearchResultsListProps {
  results: ComicMetadata[];
  isAdding: boolean;
  onAdd: (isbn: string) => void;
}

export const SearchResultsList = ({
  results,
  isAdding,
  onAdd,
}: SearchResultsListProps) => {
  return (
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
              onClick={() => onAdd(comic.isbn)}
              disabled={isAdding}
              className="mt-3 self-start rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "Add to Collection"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
