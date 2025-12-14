export const comicKeys = {
  all: ["comics"] as const,
  lists: () => [...comicKeys.all, "list"] as const,
  search: (query: string) => [...comicKeys.all, "search", query] as const,
};
