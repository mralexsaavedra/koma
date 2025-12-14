"use server";

import { revalidatePath } from "next/cache";

import { addComicUseCase } from "@/lib/di";

export async function addComicAction(formData: FormData) {
  const isbn = formData.get("isbn")?.toString();

  if (!isbn) {
    throw new Error("ISBN is required");
  }

  await addComicUseCase.execute({ isbn });
  revalidatePath("/");
}
