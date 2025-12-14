import type { Metadata } from "next";

import { comicRepo } from "@/lib/di";
import { HomeView } from "@/presentation/views/home-view";

export const metadata: Metadata = {
  title: "Koma - Comic Manager",
  description: "Sovereign Comic Manager",
};

export default async function HomePage() {
  const comics = await comicRepo.listAll();

  return <HomeView comics={comics} />;
}
