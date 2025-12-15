import type { Metadata } from "next";

import { repositories } from "@/lib/di";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";
import { LibraryView } from "@/presentation/views/library-view";

export const metadata: Metadata = {
  title: "Library - Koma",
  description: "Your comic collection",
};

export const dynamic = "force-dynamic";

const LibraryPage = async () => {
  const comics = await repositories.comic.listAll();

  const comicViewModels: ComicViewModel[] = comics.map((c) => ({
    id: c.id,
    isbn: c.isbn,
    title: c.title,
    publisher: c.publisher,
    authors: c.authors,
    status: c.status,
    coverUrl: c.coverUrl,
  }));

  return <LibraryView comics={comicViewModels} />;
};

export default LibraryPage;
