import type { Metadata } from "next";

import { SeriesTitleNormalizer } from "@koma/core";

import { getLibraryUseCase } from "@/lib/di";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";
import { LibraryView } from "@/presentation/views/library-view";

export const metadata: Metadata = {
  title: "Library - Koma",
  description: "Your comic collection",
};

export const dynamic = "force-dynamic";

const LibraryPage = async () => {
  const librarySeries = await getLibraryUseCase.execute();

  const comicViewModels: ComicViewModel[] = librarySeries.map((series) => ({
    id: series.representativeComic.id,
    isbn: `SERIES-${series.representativeComic.isbn}`,
    title: SeriesTitleNormalizer.normalize(series.representativeComic.title),
    publisher: series.representativeComic.publisher,
    authors: series.representativeComic.authors,
    status: series.representativeComic.status,
    coverUrl: series.representativeComic.coverUrl,
    // potentially pass totalVolumes to view model if needed
  }));

  return <LibraryView comics={comicViewModels} />;
};

export default LibraryPage;
