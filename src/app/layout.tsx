import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products",
  description: "List of products with description and prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
