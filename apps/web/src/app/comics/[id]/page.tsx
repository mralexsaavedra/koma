import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeriesTitleNormalizer } from "@koma/core";

import { getComicDetailsUseCase, searchComicsExternalUseCase } from "@/lib/di";
import { ComicMapper } from "@/presentation/mappers/comic-mapper";
import { ComicDetailView } from "@/presentation/views/comic-detail-view";
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

  const seriesTitle = SeriesTitleNormalizer.normalize(comic.title);
  const query = seriesTitle.length > 1 ? seriesTitle : comic.title;

  const relatedMetas = await searchComicsExternalUseCase.execute({
    query: query,
    groupBySeries: false,
  });

  const comicViewModel = ComicMapper.toViewModel(comic);
  const relatedComicsViewModel = ComicMapper.toViewModelList(relatedMetas);

  const isExplicitSeries = comic.isbn.startsWith("AL-");

  if (isExplicitSeries) {
    return (
      <SeriesDetailView
        series={comicViewModel}
        volumes={relatedComicsViewModel}
      />
    );
  }

  return (
    <ComicDetailView
      comic={comicViewModel}
      relatedComics={relatedComicsViewModel}
    />
  );
}
