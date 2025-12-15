const KomaLogo = () => (
  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
    <div className="bg-primary-500 shadow-primary-500/30 flex items-center justify-center rounded-2xl px-5 py-3 shadow-lg">
      <span className="font-mplus text-5xl font-bold text-white sm:text-6xl">
        コマ
      </span>
    </div>
    <span className="font-comic text-6xl font-black tracking-tighter text-black sm:text-7xl lg:text-8xl">
      KOMA
    </span>
  </div>
);

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
