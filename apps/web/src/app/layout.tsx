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
  const themeScript = `
    (() => {
      try {
        const savedTheme = window.localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : prefersDark ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
      } catch {
        document.documentElement.classList.add("light");
      }
    })();
  `;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
