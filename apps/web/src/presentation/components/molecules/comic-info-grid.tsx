import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface ComicInfoGridProps {
  comic: ComicViewModel;
}

export const ComicInfoGrid = ({ comic }: ComicInfoGridProps) => {
  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        <div>
          <dt className="text-xs font-semibold text-gray-500 uppercase">
            ISBN
          </dt>
          <dd className="mt-1 font-mono text-sm font-medium text-gray-900">
            {comic.isbn}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-gray-500 uppercase">
            Status
          </dt>
          <dd className="mt-1">
            <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-gray-900 ring-1 ring-gray-200 ring-inset">
              {comic.status}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-gray-500 uppercase">
            Acquired
          </dt>
          <dd className="mt-1 text-sm font-medium text-gray-900">
            {/* Placeholder date */}
            {new Date().toLocaleDateString()}
          </dd>
        </div>
      </div>
    </div>
  );
};
