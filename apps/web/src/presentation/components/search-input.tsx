"use client";

import { FormEvent } from "react";

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
  return (
    <form onSubmit={onSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, author, or ISBN..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isSearching}
        className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {isSearching ? "Searching..." : "Search"}
      </button>
    </form>
  );
};
