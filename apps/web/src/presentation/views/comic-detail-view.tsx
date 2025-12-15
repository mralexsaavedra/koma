import Image from "next/image";
import Link from "next/link";

import { ArrowLeftIcon } from "@/presentation/components/atoms/icons/arrow-left-icon";
import { CheckIcon } from "@/presentation/components/atoms/icons/check-icon";
import { HeartIcon } from "@/presentation/components/atoms/icons/heart-icon";
import { ShoppingCartIcon } from "@/presentation/components/atoms/icons/shopping-cart-icon";
import { Navbar } from "@/presentation/components/organisms/navbar";
import { APP_ROUTES } from "@/presentation/constants/routes";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface ComicDetailViewProps {
  comic: ComicViewModel;
}

export const ComicDetailView = ({ comic }: ComicDetailViewProps) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-480">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={APP_ROUTES.LIBRARY}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Library</span>
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-[300px_1fr] lg:gap-16">
          {/* Left Column: Cover & Actions */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-100 shadow-xl ring-1 ring-gray-900/5 sm:max-w-75">
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

            {/* Mobile Title */}
            <div className="block md:hidden">
              <h1 className="font-comic text-3xl font-bold text-gray-900">
                {comic.title}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {comic.authors.join(", ")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-gray-800 active:scale-95">
                <CheckIcon className="h-5 w-5" />
                <span>I Have It</span>
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3 font-bold text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-50">
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Buy</span>
              </button>
              <button className="text-primary-600 hover:bg-primary-50 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                <HeartIcon className="h-5 w-5" />
                <span>Add to Desire List</span>
              </button>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-8">
            <div className="hidden md:block">
              <h1 className="font-comic text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {comic.title}
              </h1>
              {comic.authors.length > 0 && (
                <p className="mt-4 text-2xl text-gray-600">
                  <span className="font-medium text-gray-900">
                    {comic.authors.join(", ")}
                  </span>
                </p>
              )}
            </div>

            {/* Metadata Bar */}
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

            {/* Synopsis */}
            <div className="prose prose-lg prose-gray max-w-none">
              <h3 className="text-xl font-bold text-gray-900">Synopsis</h3>
              {comic.synopsis ? (
                <div
                  className="leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: comic.synopsis }}
                />
              ) : (
                <p className="text-gray-400 italic">
                  No synopsis available for this comic.
                </p>
              )}
            </div>

            {/* Footer Details */}
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
          </div>
        </div>
      </div>
    </div>
  );
};
