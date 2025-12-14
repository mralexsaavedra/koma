import type { Metadata } from "next";
import { Bangers, Geist_Mono, M_PLUS_Rounded_1c } from "next/font/google";

import { ToastProvider } from "../presentation/providers/toast-provider";
import "./globals.css";
import { ReactNode } from "react";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

const mplus = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-mplus",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${mplus.variable} ${bangers.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
};

export default RootLayout;
