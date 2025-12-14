import Image from "next/image";
import { Comic } from "@koma/core";

interface ComicCardProps {
  comic: Comic;
}

export function ComicCard({ comic }: ComicCardProps) {
  return (
    <article className="group relative flex flex-col gap-3">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-200 shadow-md transition group-hover:shadow-xl">
        {comic.coverUrl ? (
          <Image
            src={comic.coverUrl}
            alt={comic.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Cover
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="leading-snug font-semibold text-gray-900">
          {comic.title}
        </h3>
        <p className="truncate text-sm text-gray-500">
          {comic.authors.join(", ")}
        </p>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
          {comic.status}
        </span>
      </div>
    </article>
  );
}
