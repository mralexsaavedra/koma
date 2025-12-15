import { KomaLogo } from "../atoms/koma-logo";

export const HomeHeader = () => {
  return (
    <header className="space-y-6 text-center">
      <KomaLogo />
      <p className="mx-auto max-w-xl text-lg font-medium text-gray-500 sm:text-xl">
        Your sovereign comic book manager.
      </p>
    </header>
  );
};
