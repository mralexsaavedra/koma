import { ComicViewModel } from "../../view-models/comic-view-model";
import { ComicCard } from "../molecules/comic-card";

interface ComicGridProps {
  comics: ComicViewModel[];
}

export const ComicGrid = ({ comics }: ComicGridProps) => {
  if (comics.length === 0) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
        <div className="mb-4 text-4xl">📚</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          No comics found
        </h3>
        <p className="text-gray-500">
          Your collection is empty. Start by adding some comics!
        </p>
      </div>
    );
  }

  return (
    <div className="xs:grid-cols-2 3xl:grid-cols-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 xl:grid-cols-6 2xl:grid-cols-8">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
};
