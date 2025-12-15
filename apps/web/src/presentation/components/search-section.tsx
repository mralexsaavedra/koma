"use client";

import { useComicSearch } from "../hooks/controllers/use-comic-search";
import { SearchInput } from "./search-input";
import { SearchResultsList } from "./search-results-list";

export const SearchSection = () => {
  const {
    query,
    setQuery,
    results,
    isSearching,
    isAdding,
    handleSearch,
    handleAdd,
  } = useComicSearch();

  return (
    <div className="w-full space-y-12">
      <div className="mx-auto max-w-3xl px-4">
        <SearchInput
          query={query}
          setQuery={setQuery}
          isSearching={isSearching}
          onSearch={handleSearch}
        />
      </div>

      {results.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SearchResultsList
            results={results}
            isAdding={isAdding}
            onAdd={handleAdd}
          />
        </div>
      )}

      {results.length === 0 && query && !isSearching && (
        <p className="text-center text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
};
