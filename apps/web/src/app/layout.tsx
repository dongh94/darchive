import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/index.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  "https://donghee.kim";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Donghee Archive",
  description: "A personal archive for life, development, and meaningful moments.",
  icons: {
    icon: "/images/d-archive-logo.png",
    apple: "/images/d-archive-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
