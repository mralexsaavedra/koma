import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/presentation/components/organisms/navbar";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface ComicDetailViewProps {
  comic: ComicViewModel;
}

export const ComicDetailView = ({ comic }: ComicDetailViewProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-480">
        <div className="mb-6">
          <Link
            href="/library"
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            &larr; Back to Library
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Cover Image */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              {comic.coverUrl ? (
                <Image
                  src={comic.coverUrl}
                  alt={comic.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Status
                </span>
                <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                  {comic.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="font-mplus mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {comic.title}
              </h1>
              {comic.authors.length > 0 && (
                <p className="text-xl text-gray-600">
                  by{" "}
                  <span className="font-medium text-gray-900">
                    {comic.authors.join(", ")}
                  </span>
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-500">Publisher</dt>
                <dd className="font-medium text-gray-900">
                  {comic.publisher || "Unknown Publisher"}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-500">ISBN</dt>
                <dd className="font-mono text-sm text-gray-900">
                  {comic.isbn}
                </dd>
              </div>
            </div>

            {/* Actions Placeholder */}
            <div className="border-t border-gray-100 pt-8">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Actions</h3>
              <div className="flex gap-4">
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800">
                  Mark as Read
                </button>
                <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
