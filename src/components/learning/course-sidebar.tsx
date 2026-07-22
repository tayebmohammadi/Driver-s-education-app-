"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CourseNavigationDTO } from "@/types/learning";
import { LessonProgressBadge } from "./progress-bar";

interface CourseSidebarProps {
  navigation: CourseNavigationDTO;
  activeLessonId?: string;
  courseSlug: string;
}

export function CourseSidebar({
  navigation,
  activeLessonId,
  courseSlug,
}: CourseSidebarProps) {
  const defaultExpanded = useMemo(() => {
    const units = new Set<string>();
    const chapters = new Set<string>();

    for (const unit of navigation.units) {
      for (const chapter of unit.chapters) {
        if (chapter.lessons.some((l) => l.id === activeLessonId)) {
          units.add(unit.id);
          chapters.add(chapter.id);
        }
      }
    }

    return { units, chapters };
  }, [navigation, activeLessonId]);

  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(
    () => defaultExpanded.units
  );
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => defaultExpanded.chapters
  );

  function toggleUnit(unitId: string) {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  }

  function toggleChapter(chapterId: string) {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  }

  return (
    <nav className="course-sidebar" aria-label="Course navigation">
      <div className="course-sidebar__header">
        <Link href="/learn" className="course-sidebar__back">
          ← All courses
        </Link>
        <h2>{navigation.title}</h2>
        <p className="course-sidebar__region">{navigation.regionCode}</p>
      </div>

      <ol className="course-sidebar__units">
        {navigation.units.map((unit) => {
          const unitOpen = expandedUnits.has(unit.id);
          return (
            <li key={unit.id} className="sidebar-unit">
              <button
                type="button"
                className="sidebar-unit__toggle"
                onClick={() => toggleUnit(unit.id)}
                aria-expanded={unitOpen}
              >
                <span className="sidebar-chevron">{unitOpen ? "▾" : "▸"}</span>
                <span>{unit.title}</span>
              </button>

              {unitOpen ? (
                <ol className="sidebar-chapters">
                  {unit.chapters.map((chapter) => {
                    const chapterOpen = expandedChapters.has(chapter.id);
                    return (
                      <li key={chapter.id} className="sidebar-chapter">
                        <button
                          type="button"
                          className="sidebar-chapter__toggle"
                          onClick={() => toggleChapter(chapter.id)}
                          aria-expanded={chapterOpen}
                        >
                          <span className="sidebar-chevron">
                            {chapterOpen ? "▾" : "▸"}
                          </span>
                          <span>{chapter.title}</span>
                        </button>

                        {chapterOpen ? (
                          <ul className="sidebar-lessons">
                            {chapter.lessons.map((lesson) => {
                              const isActive = lesson.id === activeLessonId;
                              return (
                                <li key={lesson.id}>
                                  <Link
                                    href={`/learn/${courseSlug}/lessons/${lesson.id}`}
                                    className={`sidebar-lesson${
                                      isActive ? " sidebar-lesson--active" : ""
                                    }`}
                                    aria-current={isActive ? "page" : undefined}
                                  >
                                    <span className="sidebar-lesson__title">
                                      {lesson.title}
                                    </span>
                                    <LessonProgressBadge
                                      completionPercentage={
                                        lesson.completionPercentage
                                      }
                                      isCompleted={lesson.isCompleted}
                                    />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
