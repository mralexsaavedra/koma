import Image from "next/image";
import { memo } from "react";

import { ComicMetadata } from "@koma/core";

interface SearchResultItemProps {
  comic: ComicMetadata;
  isAdding: boolean;
  onAdd: (isbn: string) => void;
  onView: (isbn: string) => void;
}

export const SearchResultItem = memo(
  ({ comic, isAdding, onAdd, onView }: SearchResultItemProps) => {
    return (
      <div
        onClick={() => onView(comic.isbn)}
        className="group hover:border-primary-100 hover:shadow-primary-500/5 flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-lg"
      >
        <div className="relative aspect-2/3 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {comic.coverUrl ? (
            <Image
              src={comic.coverUrl}
              alt={comic.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-xs text-gray-400">
              <span className="text-lg">📚</span>
              <span className="mt-1 scale-75 tracking-wide uppercase">
                No Cover
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col py-1">
          <h4 className="font-comic group-hover:text-primary-600 line-clamp-2 text-lg leading-tight font-bold text-gray-900">
            {comic.title}
          </h4>
          <p className="font-medium text-gray-500">{comic.publisher}</p>
          <p className="mt-1 text-sm text-gray-400">
            {comic.authors.join(", ")}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(comic.isbn);
            }}
            disabled={isAdding}
            className="mt-4 self-start rounded-full bg-gray-900 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-900/20 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isAdding ? "Adding..." : "Add to Collection"}
          </button>
        </div>
      </div>
    );
  },
);

SearchResultItem.displayName = "SearchResultItem";
