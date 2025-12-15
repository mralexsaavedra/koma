import type { Metadata } from "next";

import { SeriesTitleNormalizer } from "@koma/core";

import { repositories } from "@/lib/di";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";
import { LibraryView } from "@/presentation/views/library-view";

export const metadata: Metadata = {
  title: "Library - Koma",
  description: "Your comic collection",
};

export const dynamic = "force-dynamic";

// ...

const LibraryPage = async () => {
  const comics = await repositories.comic.listAll();

  // Group comics by normalized series title
  const seriesMap = new Map<string, (typeof comics)[0]>();

  comics.forEach((comic) => {
    const normalizedTitle = SeriesTitleNormalizer.normalize(comic.title);
    if (!seriesMap.has(normalizedTitle)) {
      seriesMap.set(normalizedTitle, comic);
    }
  });

  const uniqueSeries = Array.from(seriesMap.values());

  const comicViewModels: ComicViewModel[] = uniqueSeries.map((c) => ({
    id: c.id,
    isbn: `SERIES-${c.isbn}`, // Mark as series visually/logically if needed, but ID is what matters for link
    title: SeriesTitleNormalizer.normalize(c.title), // Use Series title
    publisher: c.publisher,
    authors: c.authors,
    status: c.status,
    coverUrl: c.coverUrl,
  }));

  return <LibraryView comics={comicViewModels} />;
};

export default LibraryPage;
