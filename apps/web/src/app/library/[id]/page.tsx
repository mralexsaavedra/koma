import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { repositories } from "@/lib/di";
import { ComicDetailView } from "@/presentation/views/comic-detail-view";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const comic = await repositories.comic.findById(id);

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
  const comic = await repositories.comic.findById(id);

  if (!comic) {
    notFound();
  }

  return <ComicDetailView comic={comic} />;
}
