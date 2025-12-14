import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

import { addComicAction, searchComicsAction } from "@/actions/comic-actions";

import { useToast } from "../providers/toast-provider";

export const useComicSearch = () => {
  const [query, setQuery] = useState("");
  const [executedQuery, setExecutedQuery] = useState("");
  const { showToast } = useToast();

  const { data: results = [], isFetching: isSearching } = useQuery({
    queryKey: ["search-comics", executedQuery],
    queryFn: () => searchComicsAction(executedQuery),
    enabled: !!executedQuery,
    staleTime: Infinity,
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setExecutedQuery(query.trim());
  };

  const { mutate: addComic, isPending: isAdding } = useMutation({
    mutationFn: addComicAction,
    onSuccess: () => {
      showToast("Comic added to your collection!", "success");
    },
    onError: (error) => {
      showToast(error.message || "Failed to add comic", "error");
    },
  });

  const handleAdd = (isbn: string) => {
    addComic(isbn);
  };

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
