import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface ComicMetadataBarProps {
  comic: ComicViewModel;
}

export const ComicMetadataBar = ({ comic }: ComicMetadataBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 pb-8 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">4.5</span>
        <div className="flex text-yellow-400">★★★★☆</div>
      </div>
      <div className="h-4 w-px bg-gray-200" />
      <div>
        <strong className="text-gray-900">128</strong> pages
      </div>
      <div className="h-4 w-px bg-gray-200" />
      <div>
        <strong className="text-gray-900">Publisher:</strong>{" "}
        {comic.publisher || "Unknown"}
      </div>
    </div>
  );
};
