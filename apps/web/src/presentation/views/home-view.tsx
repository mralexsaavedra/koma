import { Navbar } from "@/presentation/components/organisms/navbar";
import { SearchSection } from "@/presentation/components/organisms/search-section";

export const HomeView = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="relative">
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-480">
          <div className="mb-12">
            <section className="w-full transition-all duration-500 ease-in-out">
              <SearchSection />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
