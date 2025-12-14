import { useQuery } from "@tanstack/react-query";

import { searchComicsAction } from "@/actions/comic-actions";
import { comicKeys } from "@/presentation/constants/query-keys";

export const useSearchComicsQuery = (query: string) => {
  return useQuery({
    queryKey: comicKeys.search(query),
    queryFn: () => searchComicsAction(query),
    enabled: !!query,
    staleTime: Infinity,
  });
};
