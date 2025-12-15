import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollectionStatus } from "@koma/core";

import { getComicDetailsUseCase, searchComicsExternalUseCase } from "@/lib/di";
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

  // Fetch related volumes (Un-grouped)
  // We use the title. If it is "Naruto no 19/72", we attempt to clean it or search as is.
  // Ideally we should use the cleaned series title, but for now let's try searching the title.
  // The SearchComicsExternalUseCase has normalization logic INSIDE it for grouping,
  // but for the QUERY itself, we are sending the string.
  // If the title is "Naruto", we get all Naruto.
  // If the title is "Naruto no 19/72", Google search might match specific one.
  // We might want to "clean" the title here similar to the useCase logic to ensure we get the series.
  const cleanedTitle = comic.title
    .replace(/\b(vol|no|volume|part)\.?\s*\d+/gi, "")
    .replace(/#\d+/g, "")
    .replace(/\s\d+\/\d+/g, "") // 19/72
    .trim();

  const relatedMetas = await searchComicsExternalUseCase.execute({
    query: cleanedTitle,
    groupBySeries: false, // Ensure we get individual volumes
  });

  // Map metadata to View Model (Comic)
  // We need to map `ComicMetadata` to `ComicViewModel`.
  const relatedComics = relatedMetas.map((meta) => ({
    ...meta,
    id: meta.isbn, // Use ISBN as temp ID
    status: CollectionStatus.WANTED, // Default
    acquiredAt: undefined, // Series/Search result implies not owned yet or unknown
  }));

  return <ComicDetailView comic={comic} relatedComics={relatedComics} />;
}
