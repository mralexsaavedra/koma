import { useCallback, useState, useTransition } from "react";

import { ComicMetadata } from "@koma/core";

import { addComicAction, searchComicsAction } from "@/actions/comic-actions";

export const useComicSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ComicMetadata[]>([]);
  const [isSearching, startTransition] = useTransition();
  const [isAdding, startAddTransition] = useTransition();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;

      startTransition(async () => {
        const comics = await searchComicsAction(query);
        setResults(comics);
      });
    },
    [query],
  );

  const handleAdd = useCallback((isbn: string) => {
    startAddTransition(async () => {
      const formData = new FormData();
      formData.append("isbn", isbn);
      await addComicAction(formData);
      alert("Comic added!");
    });
  }, []);

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
