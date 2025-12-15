import Image from "next/image";
import { memo } from "react";

import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface ComicCardProps {
  comic: ComicViewModel;
}

export const ComicCard = memo(function ComicCard({ comic }: ComicCardProps) {
  return (
    <article className="group relative flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1">
      <div className="group-hover:shadow-primary-500/20 relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-2xl group-hover:ring-black/10">
        {comic.coverUrl ? (
          <Image
            src={comic.coverUrl}
            alt={comic.title}
            fill
            className="object-cover transition duration-500 will-change-transform group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 15vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gray-100 text-gray-400">
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
        <h3 className="font-comic group-hover:text-primary-600 line-clamp-2 text-lg leading-tight font-bold text-gray-900 transition-colors">
          {comic.title}
        </h3>
        <p className="truncate text-sm font-medium text-gray-500">
          {comic.authors.join(", ")}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600 ring-1 ring-gray-500/10 ring-inset">
            {comic.status}
          </span>
        </div>
      </div>
    </article>
  );
});
