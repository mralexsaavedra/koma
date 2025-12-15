"use client";

import { ChangeEvent, FormEvent } from "react";

import { SearchIcon } from "@/presentation/components/atoms/icons/search-icon";
import { SpinnerIcon } from "@/presentation/components/atoms/icons/spinner-icon";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  isSearching: boolean;
  onSearch: (e: FormEvent) => void;
}

export const SearchInput = ({
  query,
  setQuery,
  isSearching,
  onSearch,
}: SearchInputProps) => {
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={onSearch}
      className="group relative flex w-full items-center"
    >
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search for comics by title, author, or ISBN..."
          className="w-full rounded-full border border-gray-200 bg-white/80 py-4 pr-32 pl-12 text-lg shadow-sm backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-200 focus:outline-none"
        />
        <div className="absolute inset-y-1 right-1">
          <button
            type="submit"
            disabled={isSearching}
            className="flex h-full items-center rounded-full bg-gray-900 px-6 font-medium text-white transition-transform hover:scale-105 hover:bg-gray-800 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-gray-900"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <SpinnerIcon className="h-4 w-4 text-white" />
                Processing
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
