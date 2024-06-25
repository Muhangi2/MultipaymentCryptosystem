import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-csv-importer/dist/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multipayment app",
  description:
    "This is an application that is used to send multiple transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
