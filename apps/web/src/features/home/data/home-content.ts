import type { LucideIcon } from "lucide-react";
import { BookOpen, Clock, Code2, Folder, Heart } from "lucide-react";

export type HomeNavigationItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent?: boolean;
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
    eyebrow: "Personal Platform",
    title: "Donghee Archive",
    headline: "삶과 개발, 그리고 중요한 순간들을 기록하는 개인 플랫폼",
    description: "이곳은 단순한 포트폴리오가 아니라, 배운 것과 만든 것, 그리고 소중한 순간들을 함께 쌓아가는 개인 아카이브입니다.",
  },
  intro: {
    eyebrow: "About This Platform",
    body: "이 사이트는 삶의 중요한 순간과 개발자로서의 기록을 함께 담기 위해 만든 개인 플랫폼입니다. Wedding, DevLogs, Timeline, Projects처럼 서로 다른 이야기들이 하나의 흐름 안에서 자연스럽게 이어지도록 구성하고 있습니다.",
  },
  quote: "기록은 지나간 시간을 남기는 일이기도 하지만, 앞으로의 나를 만들어가는 일이기도 하다고 생각합니다.",
  footer: {
    brand: "Donghee Archive",
    description: "A personal platform for recording life, development, and meaningful moments.",
  },
} as const;

export const heroActions: HomeNavigationItem[] = [
  {
    title: "Wedding",
    description: "우리의 결혼 이야기와 소중한 순간들",
    href: "/wedding",
    icon: Heart,
    accent: true,
  },
  {
    title: "DevLogs",
    description: "개발 과정에서 배운 것과 경험한 것들",
    href: "#",
    icon: Code2,
  },
  {
    title: "About",
    description: "나에 대한 이야기와 생각들",
    href: "#",
    icon: BookOpen,
  },
];

export const archiveNavigation: HomeNavigationItem[] = [
  ...heroActions,
  {
    title: "Timeline",
    description: "시간 순으로 기록된 삶의 흐름",
    href: "#",
    icon: Clock,
  },
  {
    title: "Projects",
    description: "만들고 실험한 프로젝트들",
    href: "#",
    icon: Folder,
  },
];

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
    title: "Building a Personal Archive",
    description: "개인 아카이브 플랫폼을 설계하며 배운 것들",
    date: "2026.04.10",
    href: "#",
  },
];
