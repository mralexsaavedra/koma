import type { Metadata } from "next";

import { HomeView } from "@/presentation/views/home-view";

export const metadata: Metadata = {
  title: "Koma - Comic Manager",
  description: "Sovereign Comic Manager",
};

export const dynamic = "force-dynamic";

const HomePage = async () => {
  return <HomeView />;
};

export default HomePage;
