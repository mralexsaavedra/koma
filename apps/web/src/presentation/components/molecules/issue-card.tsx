"use client";

import Image from "next/image";
import { MouseEvent, useCallback, useState } from "react";

import { useAddComicMutation } from "@/presentation/hooks/mutations/use-add-comic-mutation";
import { useToast } from "@/presentation/providers/toast-provider";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface IssueCardProps {
  comic: ComicViewModel;
}

export const IssueCard = ({ comic }: IssueCardProps) => {
  const { showToast } = useToast();
  const [isAdded, setIsAdded] = useState(comic.status !== "WANTED"); // Simple check

  const { mutate: addComic, isPending } = useAddComicMutation(
    () => {
      setIsAdded(true);
      showToast("Comic added!", "success");
      // Optionally router.refresh() but local state is faster for "Quick Add" feed
    },
    (error) => showToast(error.message || "Failed to add", "error"),
  );

  const handleAdd = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const formData = new FormData();
      formData.set("isbn", comic.isbn);
      addComic(formData);
    },
    [addComic, comic.isbn],
  );

  return (
    <div className="group relative flex flex-col items-center gap-2">
      {/* Cover */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all group-hover:shadow-md">
        {comic.coverUrl ? (
          <Image
            src={comic.coverUrl}
            alt={comic.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 150px"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-2xl opacity-20">#</span>
          </div>
        )}

        {/* Top-Right Number Badge (heuristic extraction) */}
        <div className="absolute top-0 right-0 rounded-bl-lg bg-gray-900/80 px-2 py-1 text-xs font-bold text-white backdrop-blur-xs">
          {/* Try to extract number from title usually in patterns like "Naruto 1" or "Vol 2" or "No. 3" */}
          #{comic.title.match(/(\d+)(\/\d+)?$/)?.[1] || "?"}
        </div>
      </div>

      {/* Add Button (Floating/Bottom) */}
      <button
        onClick={handleAdd}
        disabled={isAdded || isPending}
        className={`flex h-8 w-full items-center justify-center rounded-md text-sm font-bold transition-all ${
          isAdded
            ? "cursor-default bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-sm"
        } `}
      >
        {isPending ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        ) : isAdded ? (
          "✔"
        ) : (
          "+"
        )}
      </button>
    </div>
  );
};
