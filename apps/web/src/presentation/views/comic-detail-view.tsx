import { ImageWithFallback } from "@/presentation/components/atoms/image-with-fallback";
import { ComicActionButtons } from "@/presentation/components/molecules/comic-action-buttons";
import { ComicInfoGrid } from "@/presentation/components/molecules/comic-info-grid";
import { ComicMetadataBar } from "@/presentation/components/molecules/comic-metadata-bar";
import { Navbar } from "@/presentation/components/organisms/navbar";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface ComicDetailViewProps {
  comic: ComicViewModel;
}

export const ComicDetailView = ({ comic }: ComicDetailViewProps) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-480">
        <div className="grid gap-12 md:grid-cols-[300px_1fr] lg:gap-16">
          {/* Left Column: Cover & Actions */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-100 shadow-xl ring-1 ring-gray-900/5 sm:max-w-75">
              <ImageWithFallback
                src={comic.coverUrl}
                alt={comic.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
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

            <ComicActionButtons />
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
            <ComicMetadataBar comic={comic} />

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
            <ComicInfoGrid comic={comic} />
          </div>
        </div>
      </div>
    </div>
  );
};
