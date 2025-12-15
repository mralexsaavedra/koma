"use server";

import { revalidatePath } from "next/cache";

import { ComicMetadata } from "@koma/core";

import { addComicUseCase, searchComicsExternalUseCase } from "@/lib/di";
import { APP_ROUTES } from "@/presentation/constants/routes";

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
  revalidatePath(APP_ROUTES.HOME);

  return { id: comic.id };
}
