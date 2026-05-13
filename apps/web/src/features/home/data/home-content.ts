import type { LucideIcon } from "lucide-react";
import { BookOpen, Briefcase, Code2, Globe, Heart } from "lucide-react";

export type HomeNavigationItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: "blue" | "red" | "yellow" | "green";
  size: "featured" | "wide" | "standard" | "tall";
  tags: string[];
  image?: string;
  status?: string;
};

export type HomeUpdate = {
  category: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

export const homeContent = {
  hero: {
    eyebrow: "Between Tech and Life, a space for my records.",
    title: "Tech & Life",
    highlightedTitle: "나를 기록하는 공간.",
    description:
      "개발하며 배운 것들, 살아가며 남기고 싶은 순간들.\n이곳은 단순한 포트폴리오를 넘어, 나의 경험과 생각이 쌓여가는 개인 아카이브입니다.",
  },
  archive: {
    eyebrow: "D-Archive",
    title: "The Continuous Record",
    action: "Explore All Fragments",
  },
  footer: {
    brand: "D-Archive",
    copyright: "© 2026 D-Archive. All rights recorded.",
    status: "Status: Living.",
  },
} as const;

export const archiveNavigation: HomeNavigationItem[] = [
  {
    title: "Wedding",
    description: "우리의 결혼 이야기와 소중한 순간들을 기록합니다.",
    href: "/wedding",
    icon: Heart,
    accent: "red",
    size: "featured",
    tags: ["Life", "Moment"],
    image: "/images/wedding/hero-couple.jpeg",
  },
  {
    title: "DevLogs",
    description: "개발 과정에서 배운 것과 경험한 것들은 추후 정리해 공개할 예정입니다.",
    href: "#archive",
    icon: Code2,
    accent: "blue",
    size: "standard",
    tags: ["Coming", "Soon"],
    status: "추후 진행 예정",
  },
  {
    title: "Projects",
    description: "상상하고 실험하며 만든 결과물들.",
    href: "/projects",
    icon: Globe,
    accent: "green",
    size: "tall",
    tags: ["Build", "Lab"],
  },
  {
    title: "Experience",
    description: "경험의 흐름에 따라 쌓인 일과 배움의 기록.",
    href: "/experience",
    icon: Briefcase,
    accent: "yellow",
    size: "standard",
    tags: ["Career"],
  },
  {
    title: "About",
    description: "나에 대한 이야기와 철학을 담았습니다.",
    href: "#about",
    icon: BookOpen,
    accent: "blue",
    size: "wide",
    tags: ["Philosophy", "Story"],
  },
];

export const heroActions = [
  {
    title: "Explore Archive",
    href: "#archive",
    variant: "primary",
  },
  {
    title: "About Me",
    href: "#about",
    variant: "secondary",
  },
] as const;

export const latestUpdates: HomeUpdate[] = [
  {
    category: "Wedding",
    title: "Our Story",
    description: "두 사람이 만나 하나의 이야기를 만들어가기까지",
    date: "2026.04.15",
    href: "/wedding",
  },
  {
    category: "DevLogs",
    title: "DevLogs Coming Soon",
    description: "개발 기록은 아카이브 구조를 정리한 뒤 순차적으로 추가할 예정입니다.",
    date: "Coming soon",
    href: "#archive",
  },
];

export const homeNavItems = [
  { title: "Wedding", href: "/wedding" },
  { title: "DevLogs", href: "#archive" },
  { title: "Projects", href: "/projects" },
  { title: "Experience", href: "/experience" },
  { title: "About", href: "#about" },
] as const;

export const footerLinks = [
  { title: "Twitter", href: "#" },
  { title: "GitHub", href: "#" },
  { title: "LinkedIn", href: "#" },
  { title: "Medium", href: "#" },
] as const;
