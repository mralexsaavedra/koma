import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useMemo, useState } from "react";

import { useAddComicMutation } from "@/presentation/hooks/mutations/use-add-comic-mutation";
import { useSearchComicsQuery } from "@/presentation/hooks/queries/use-search-comics-query";
import { useToast } from "@/presentation/providers/toast-provider";

export const useComicSearch = () => {
  const [query, setQuery] = useState("");
  const [executedQuery, setExecutedQuery] = useState("");
  const { showToast } = useToast();
  const router = useRouter();

  const { data: queryResults = [], isFetching: isSearching } =
    useSearchComicsQuery(executedQuery);

  const { mutate: addComic, isPending: isAdding } = useAddComicMutation(
    () => {
      showToast("Comic added to your collection!", "success");
      router.refresh();
    },
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
