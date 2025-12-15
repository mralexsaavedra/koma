import type { Metadata } from "next";
import { Bangers, M_PLUS_Rounded_1c } from "next/font/google";
import { ReactNode } from "react";

import { QueryProvider } from "@/presentation/providers/query-provider";
import { ToastProvider } from "@/presentation/providers/toast-provider";

import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "block",
});

const mplus = M_PLUS_Rounded_1c({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-mplus",
  display: "block",
});

export const metadata: Metadata = {
  title: "Koma",
  description: "Self-hosted comic manager",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${mplus.variable} ${bangers.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
