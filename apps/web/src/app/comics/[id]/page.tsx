import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getComicDetailsUseCase } from "@/lib/di";
import { ComicMapper } from "@/presentation/mappers/comic-mapper";
import { ComicDetailView } from "@/presentation/views/comic-detail-view";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const comic = await getComicDetailsUseCase.execute({ idOrIsbn: id });

  if (!comic) {
    return {
      title: "Comic Not Found",
    };
  }

  return {
    title: `${comic.title} - Koma`,
    description: `Details for ${comic.title}`,
  };
}

export default async function ComicDetailPage({ params }: Props) {
  const { id } = await params;
  const comic = await getComicDetailsUseCase.execute({ idOrIsbn: id });

  if (!comic) {
    notFound();
  }

  const comicViewModel = ComicMapper.toViewModel(comic);
  // No longer fetching relatedMetas for single comic view.

  return <ComicDetailView comic={comicViewModel} />;
}
