import type { Metadata } from "next";
import { ProjectsPage } from "@/features/projects/projects-page";

export const metadata: Metadata = {
  title: "Projects | Donghee Archive",
  description: "프론트엔드 개발자 김동희의 프로젝트 중심 포트폴리오",
};

export default function Page() {
  return <ProjectsPage />;
}
