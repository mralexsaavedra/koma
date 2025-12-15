import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeriesTitleNormalizer } from "@koma/core";

import { getComicDetailsUseCase, searchComicsExternalUseCase } from "@/lib/di";
import { ComicMapper } from "@/presentation/mappers/comic-mapper";
import { SeriesDetailView } from "@/presentation/views/series-detail-view";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const comic = await getComicDetailsUseCase.execute({ idOrIsbn: id });

  if (!comic) {
    return {
      title: "Series Not Found",
    };
  }

  return {
    title: `${comic.title} (Series) - Koma`,
    description: `Series details for ${comic.title}`,
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { id } = await params;
  const comic = await getComicDetailsUseCase.execute({ idOrIsbn: id });

  if (!comic) {
    notFound();
  }

  // Use domain service to clean title
  const seriesTitle = SeriesTitleNormalizer.normalize(comic.title);
  const query = seriesTitle.length > 1 ? seriesTitle : comic.title;

  const relatedMetas = await searchComicsExternalUseCase.execute({
    query: query,
    groupBySeries: false,
  });

  const comicViewModel = ComicMapper.toViewModel(comic);
  const relatedComicsViewModel = ComicMapper.toViewModelList(relatedMetas);

  return (
    <SeriesDetailView
      series={comicViewModel}
      volumes={relatedComicsViewModel}
    />
  );
}
