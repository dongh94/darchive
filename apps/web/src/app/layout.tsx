import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Donghee Archive",
  description: "A personal archive for life, development, and meaningful moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
