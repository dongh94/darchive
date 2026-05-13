"use client";

import Link from "next/link";
import { Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { homeNavItems } from "../data/home-content";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function HomeNavbar() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="home-glass fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-5 md:px-12">
      <Link href="/" className="flex items-center gap-3" aria-label="D-Archive home">
        <span className="flex gap-0.5" aria-hidden="true">
          <span className="h-6 w-1.5 rounded-full bg-[#4285f4]" />
          <span className="h-6 w-1.5 rounded-full bg-[#ea4335]" />
          <span className="h-6 w-1.5 rounded-full bg-[#fbbc05]" />
          <span className="h-6 w-1.5 rounded-full bg-[#34a853]" />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">D-Archive</span>
      </Link>

      <div className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
        {homeNavItems.map((item) => (
          <Link key={item.title} href={item.href} className="transition-colors hover:text-foreground">
            {item.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted sm:inline-flex"
          aria-label="Search archive"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div>
    </nav>
  );
}
