import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getComicDetailsUseCase, getSeriesDetailsUseCase } from "@/lib/di";
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
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { id } = await params;
  const details = await getSeriesDetailsUseCase.execute(id);

  if (!details) {
    notFound();
  }

  const { series, volumes } = details;

  const comicViewModel = ComicMapper.toViewModel(series);
  const relatedComicsViewModel = ComicMapper.toViewModelList(volumes);

  return (
    <SeriesDetailView
      series={comicViewModel}
      volumes={relatedComicsViewModel}
    />
  );
}
