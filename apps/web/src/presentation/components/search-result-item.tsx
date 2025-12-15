import Image from "next/image";
import { memo } from "react";

import { ComicMetadata } from "@koma/core";

interface SearchResultItemProps {
  comic: ComicMetadata;
  isAdding: boolean;
  onAdd: (isbn: string) => void;
}

export const SearchResultItem = memo(
  ({ comic, isAdding, onAdd }: SearchResultItemProps) => {
    return (
      <div className="group flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition-all hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-500/20">
        <div className="relative aspect-2/3 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
          {comic.coverUrl ? (
            <Image
              src={comic.coverUrl}
              alt={comic.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-xs text-zinc-400 dark:text-zinc-500">
              <span className="text-lg">📚</span>
              <span className="mt-1 scale-75 tracking-wide uppercase">
                No Cover
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col py-1">
          <h4 className="font-comic line-clamp-2 text-lg leading-tight font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
            {comic.title}
          </h4>
          <p className="font-medium text-zinc-500 dark:text-zinc-400">
            {comic.publisher}
          </p>
          <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
            {comic.authors.join(", ")}
          </p>
          <button
            onClick={() => onAdd(comic.isbn)}
            disabled={isAdding}
            className="mt-4 self-start rounded-full bg-zinc-900 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-zinc-900/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-900/20 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 disabled:hover:translate-y-0 dark:bg-indigo-600 dark:shadow-indigo-500/20 dark:hover:bg-indigo-500 dark:hover:shadow-indigo-500/30 dark:focus:ring-indigo-500 dark:focus:ring-offset-zinc-900"
          >
            {isAdding ? "Adding..." : "Add to Collection"}
          </button>
        </div>
      </div>
    );
  },
);

SearchResultItem.displayName = "SearchResultItem";
