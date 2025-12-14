import { FormEvent, useCallback, useState, useTransition } from "react";

import { ComicMetadata } from "@koma/core";

import { addComicAction, searchComicsAction } from "@/actions/comic-actions";

import { useToast } from "../providers/toast-provider";

export const useComicSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ComicMetadata[]>([]);
  const [isSearching, startTransition] = useTransition();
  const [isAdding, startAddTransition] = useTransition();
  const { showToast } = useToast();

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;

      startTransition(async () => {
        const comics = await searchComicsAction(query);
        setResults(comics);
      });
    },
    [query],
  );

  const handleAdd = useCallback(
    (isbn: string) => {
      startAddTransition(async () => {
        try {
          const formData = new FormData();
          formData.append("isbn", isbn);
          await addComicAction(formData);
          showToast("Comic added to collection!", "success");
        } catch {
          showToast("Failed to add comic. Try again.", "error");
        }
      });
    },
    [showToast],
  );

  return {
    query,
    setQuery,
    results,
    isSearching,
    isAdding,
    handleSearch,
    handleAdd,
  };
};
