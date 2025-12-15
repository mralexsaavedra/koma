import Image from "next/image";
import { memo } from "react";

import { ComicViewModel } from "../view-models/comic-view-model";

interface ComicCardProps {
  comic: ComicViewModel;
}

export const ComicCard = memo(function ComicCard({ comic }: ComicCardProps) {
  return (
    <article className="group relative flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 group-hover:ring-black/10 dark:bg-zinc-800 dark:ring-white/10 dark:group-hover:ring-white/20">
        {comic.coverUrl ? (
          <Image
            src={comic.coverUrl}
            alt={comic.title}
            fill
            className="object-cover transition duration-500 will-change-transform group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 15vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600">
            <span className="text-4xl">📚</span>
            <span className="mt-2 text-xs font-medium tracking-wider uppercase">
              No Cover
            </span>
          </div>
        )}

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="space-y-1.5 px-1">
        <h3 className="font-comic line-clamp-2 text-lg leading-tight font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
          {comic.title}
        </h3>
        <p className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {comic.authors.join(", ")}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-500/10 ring-inset dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-400/20">
            {comic.status}
          </span>
        </div>
      </div>
    </article>
  );
});
