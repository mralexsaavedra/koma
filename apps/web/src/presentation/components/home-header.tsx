export const HomeHeader = () => {
  return (
    <header className="space-y-4 text-center">
      <h1 className="font-comic bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-6xl font-black tracking-widest text-transparent sm:text-7xl lg:text-8xl dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
        KOMA
      </h1>
      <p className="mx-auto max-w-xl text-lg font-medium text-zinc-600 sm:text-xl dark:text-zinc-400">
        Your sovereign comic book manager.
      </p>
    </header>
  );
};
