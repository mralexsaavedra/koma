import Image from "next/image";
import Link from "next/link";

import { ArrowLeftIcon } from "@/presentation/components/atoms/icons/arrow-left-icon";
import { ComicSeriesGrid } from "@/presentation/components/organisms/comic-series-grid";
import { Navbar } from "@/presentation/components/organisms/navbar";
import { APP_ROUTES } from "@/presentation/constants/routes";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface SeriesDetailViewProps {
  series: ComicViewModel; // The "main" representative comic (usually Vol 1 or AniList data)
  volumes: ComicViewModel[];
}

export const SeriesDetailView = ({
  series,
  volumes,
}: SeriesDetailViewProps) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-480">
        <div className="mb-6">
          <Link
            href={APP_ROUTES.LIBRARY}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Library</span>
          </Link>
        </div>

        {/* Series Header */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Series Cover */}
          <div className="shrink-0">
            <div className="relative aspect-[2/3] w-32 overflow-hidden rounded-lg bg-gray-100 shadow-md sm:w-48">
              {series.coverUrl ? (
                <Image
                  src={series.coverUrl}
                  alt={series.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 128px, 192px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Series Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="font-comic text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {series.title}
              </h1>
              <p className="mt-2 text-xl font-medium text-gray-600">
                {series.authors.join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div>
                <strong className="block text-lg text-gray-900">
                  {volumes.length}
                </strong>
                <span>Volumes</span>
              </div>
              <div>
                <strong className="block text-lg text-gray-900">
                  {series.publisher || "Unknown"}
                </strong>
                <span>Publisher</span>
              </div>
            </div>

            <div className="prose prose-gray max-w-2xl">
              <p className="line-clamp-4">
                {series.synopsis?.replace(/<[^>]*>?/gm, "")}
              </p>
            </div>
          </div>
        </div>

        {/* Volumes Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Collection</h2>
            <div className="text-sm text-gray-500">
              {/* Potential Sort/Filter controls here */}
              {volumes.length} Items
            </div>
          </div>
          <ComicSeriesGrid comics={volumes} />
        </div>
      </div>
    </div>
  );
};
