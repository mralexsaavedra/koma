import type { Metadata } from "next";

import { comicRepo } from "@/lib/di";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";
import { HomeView } from "@/presentation/views/home-view";

export const metadata: Metadata = {
  title: "Koma - Comic Manager",
  description: "Sovereign Comic Manager",
};

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const comics = await comicRepo.listAll();

  const comicViewModels: ComicViewModel[] = comics.map((c) => ({
    id: c.id,
    isbn: c.isbn,
    title: c.title,
    publisher: c.publisher,
    authors: c.authors,
    status: c.status,
    coverUrl: c.coverUrl,
  }));

  return <HomeView comics={comicViewModels} />;
};

export default HomePage;
