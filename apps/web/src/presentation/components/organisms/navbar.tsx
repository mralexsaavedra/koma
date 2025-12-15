"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserIcon } from "@/presentation/components/atoms/icons/user-icon";
import { KomaLogo } from "@/presentation/components/atoms/koma-logo";

const NAV_ITEMS = [
  { label: "Library", href: "/" },
  { label: "Lists", href: "#" },
  { label: "Activity", href: "#" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex origin-left scale-[0.4] items-center">
            <KomaLogo />
          </div>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`hover:text-primary-600 text-sm ${
                  isActive
                    ? "font-bold text-gray-900"
                    : "font-medium text-gray-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
            <UserIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
