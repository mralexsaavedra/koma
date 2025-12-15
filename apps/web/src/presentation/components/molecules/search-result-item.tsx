import Image from "next/image";
import { memo, useCallback } from "react";

import { ComicMetadata } from "@koma/core";

interface SearchResultItemProps {
  comic: ComicMetadata;
  onView: (isbn: string) => void;
}

export const SearchResultItem = memo(
  ({ comic, onView }: SearchResultItemProps) => {
    const handleClick = useCallback(() => {
      onView(comic.isbn);
    }, [comic.isbn, onView]);

    return (
      <div
        onClick={handleClick}
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
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-gray-900 opacity-0 transition-opacity group-hover:opacity-100">
            <span>View Details</span>
            <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>
    );
  },
);

SearchResultItem.displayName = "SearchResultItem";
