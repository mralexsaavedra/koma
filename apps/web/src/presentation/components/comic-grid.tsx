import { ComicViewModel } from "../view-models/comic-view-model";
import { ComicCard } from "./comic-card";

interface ComicGridProps {
  comics: ComicViewModel[];
}

export const ComicGrid = ({ comics }: ComicGridProps) => {
  if (comics.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-gray-500">
        You have no comics yet. Start searching!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
};
