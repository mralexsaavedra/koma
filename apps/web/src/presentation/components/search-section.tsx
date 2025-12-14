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
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <SearchInput
        query={query}
        setQuery={setQuery}
        isSearching={isSearching}
        onSearch={handleSearch}
      />

      {results.length > 0 && (
        <SearchResultsList
          results={results}
          isAdding={isAdding}
          onAdd={handleAdd}
        />
      )}

      {results.length === 0 && query && !isSearching && (
        <p className="text-center text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
};
