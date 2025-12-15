import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useMemo, useState } from "react";

import { APP_ROUTES } from "@/presentation/constants/routes";
import { useSearchComicsQuery } from "@/presentation/hooks/queries/use-search-comics-query";

export const useComicSearch = () => {
  const [query, setQuery] = useState("");
  const [executedQuery, setExecutedQuery] = useState("");
  const router = useRouter();

  const { data: queryResults = [], isFetching: isSearching } =
    useSearchComicsQuery(executedQuery);

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      setExecutedQuery(query.trim());
    },
    [query],
  );

  const handleView = useCallback(
    (isbn: string) => {
      router.push(APP_ROUTES.COMIC_DETAIL(isbn));
    },
    [router],
  );

  const results = useMemo(() => queryResults, [queryResults]);

  return {
    query,
    setQuery,
    results,
    isSearching,
    handleSearch,
    handleView,
  };
};
