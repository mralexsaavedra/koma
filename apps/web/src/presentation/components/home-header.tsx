export const HomeHeader = () => {
  return (
    <header className="space-y-4 text-center">
      <h1 className="font-comic from-primary-500 via-secondary-500 to-accent-500 dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400 bg-linear-to-r bg-clip-text text-6xl font-black tracking-widest text-transparent sm:text-7xl lg:text-8xl">
        KOMA
      </h1>
      <p className="mx-auto max-w-xl text-lg font-medium text-gray-600 sm:text-xl dark:text-gray-400">
        Your sovereign comic book manager.
      </p>
    </header>
  );
};
