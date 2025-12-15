import { ComicMetadata } from "@koma/core";

import { SearchResultItem } from "./search-result-item";

interface SearchResultsListProps {
  results: ComicMetadata[];
  isAdding: boolean;
  onAdd: (isbn: string) => void;
}

export const SearchResultsList = ({
  results,
  isAdding,
  onAdd,
}: SearchResultsListProps) => {
  return (
    <div className="3xl:grid-cols-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {results.map((comic) => (
        <SearchResultItem
          key={comic.isbn}
          comic={comic}
          isAdding={isAdding}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
};
