"use server";

import { revalidatePath } from "next/cache";

import { ComicMetadata } from "@koma/core";

import { addComicUseCase, searchComicsExternalUseCase } from "@/lib/di";

export async function searchComicsAction(
  query: string,
): Promise<ComicMetadata[]> {
  if (!query) return [];
  return await searchComicsExternalUseCase.execute({ query });
}

export async function addComicAction(formData: FormData) {
  const isbn = formData.get("isbn")?.toString();

  if (!isbn) {
    throw new Error("ISBN is required");
  }

  const comic = await addComicUseCase.execute({ isbn });
  revalidatePath("/");

  return { id: comic.id };
}
