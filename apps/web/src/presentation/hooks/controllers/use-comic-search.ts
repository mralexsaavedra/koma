import { FormEvent, useCallback, useMemo, useState } from "react";

import { useToast } from "../../providers/toast-provider";
import { useAddComicMutation } from "../mutations/use-add-comic-mutation";
import { useSearchComicsQuery } from "../queries/use-search-comics-query";

export const useComicSearch = () => {
  const [query, setQuery] = useState("");
  const [executedQuery, setExecutedQuery] = useState("");
  const { showToast } = useToast();

  const { data: queryResults = [], isFetching: isSearching } =
    useSearchComicsQuery(executedQuery);

  const { mutate: addComic, isPending: isAdding } = useAddComicMutation(
    () => showToast("Comic added to your collection!", "success"),
    (error) => showToast(error.message || "Failed to add comic", "error"),
  );

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      setExecutedQuery(query.trim());
    },
    [query],
  );

  const handleAdd = useCallback(
    (isbn: string) => {
      const formData = new FormData();
      formData.set("isbn", isbn);
      addComic(formData);
    },
    [addComic],
  );

  const results = useMemo(() => queryResults, [queryResults]);

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
