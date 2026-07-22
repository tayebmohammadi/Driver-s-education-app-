import Link from "next/link";
import type { ReactNode } from "react";
import type { CourseNavigationDTO } from "@/types/learning";
import { CourseSidebar } from "./course-sidebar";
import { ProgressBar } from "./progress-bar";

interface LearningLayoutProps {
  navigation: CourseNavigationDTO;
  courseSlug: string;
  activeLessonId?: string;
  children: ReactNode;
}

export function LearningLayout({
  navigation,
  courseSlug,
  activeLessonId,
  children,
}: LearningLayoutProps) {
  return (
    <div className="learning-layout">
      <div className="learning-layout__hub-bar">
        <Link href="/home">← Back to DMV Study</Link>
        <Link href="/home" className="learning-layout__hub-logo">
          DMV Study
        </Link>
      </div>
      <aside className="learning-layout__sidebar">
        <ProgressBar progress={navigation.progress} />
        <CourseSidebar
          navigation={navigation}
          courseSlug={courseSlug}
          activeLessonId={activeLessonId}
        />
      </aside>
      <main className="learning-layout__main">{children}</main>
    </div>
  );
}
