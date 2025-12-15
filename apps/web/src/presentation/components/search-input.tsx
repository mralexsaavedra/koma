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
    <form
      onSubmit={onSearch}
      className="group relative flex w-full items-center"
    >
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for comics by title, author, or ISBN..."
          className="w-full rounded-full border border-gray-200 bg-white/80 py-4 pr-32 pl-12 text-lg shadow-sm backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:outline-none dark:border-gray-800 dark:bg-gray-900/80 dark:text-white dark:focus:border-primary-500 dark:focus:bg-gray-900"
        />
        <div className="absolute inset-y-1 right-1">
          <button
            type="submit"
            disabled={isSearching}
            className="flex h-full items-center rounded-full bg-gray-900 px-6 font-medium text-white transition-transform hover:scale-105 hover:bg-gray-800 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-gray-900 dark:bg-primary-600 dark:hover:bg-primary-500"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
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
