"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useCallback, useState } from "react";

import { CollectionStatus } from "@koma/core";

import { SpinnerIcon } from "@/presentation/components/atoms/icons/spinner-icon";
import { APP_ROUTES } from "@/presentation/constants/routes";
import { useAddComicMutation } from "@/presentation/hooks/mutations/use-add-comic-mutation";
import { useToast } from "@/presentation/providers/toast-provider";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface IssueCardProps {
  comic: ComicViewModel;
}

export const IssueCard = ({ comic }: IssueCardProps) => {
  const { showToast } = useToast();
  const [isAdded, setIsAdded] = useState(
    comic.status !== CollectionStatus.WANTED,
  );

  const { mutate: addComic, isPending } = useAddComicMutation(
    () => {
      setIsAdded(true);
      showToast("Comic added!", "success");
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
      <Link
        href={APP_ROUTES.COMIC_DETAIL(comic.id || comic.isbn)}
        className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all group-hover:shadow-md"
      >
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

        <div className="absolute top-0 right-0 rounded-bl-lg bg-gray-900/80 px-2 py-1 text-xs font-bold text-white backdrop-blur-xs">
          #{comic.title.match(/(\d+)(\/\d+)?$/)?.[1] || "?"}
        </div>
      </Link>

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
          <SpinnerIcon className="h-4 w-4 animate-spin text-gray-600" />
        ) : isAdded ? (
          "✔"
        ) : (
          "+"
        )}
      </button>
    </div>
  );
};
