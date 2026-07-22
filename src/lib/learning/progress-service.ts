import { prisma } from "@/lib/prisma";
import { countPublishedLessonsInCourse } from "@/lib/learning/course-service";
import type {
  CourseNavigationDTO,
  CourseProgressDTO,
  LessonProgressDTO,
  UserProgressOverviewDTO,
} from "@/types/learning";
import { LessonStatus } from "@prisma/client";

import { completeLesson as markLessonComplete } from "./progress-completion-service";

export async function getLessonProgress(
  userId: string,
  lessonId: string
): Promise<LessonProgressDTO | null> {
  const progress = await prisma.studentProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });

  if (!progress) {
    return {
      lessonId,
      completionPercentage: 0,
      completedAt: null,
    };
  }

  return {
    lessonId: progress.lessonId,
    completionPercentage: progress.completionPercentage,
    completedAt: progress.completedAt?.toISOString() ?? null,
  };
}

export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgressDTO> {
  const [record, totalLessons, completedLessons] = await Promise.all([
    prisma.courseProgress.findUnique({
      where: { userId_courseId: { userId, courseId } },
    }),
    countPublishedLessonsInCourse(courseId),
    prisma.studentProgress.count({
      where: {
        userId,
        completionPercentage: 100,
        lesson: {
          status: LessonStatus.PUBLISHED,
          chapter: { unit: { courseId } },
        },
      },
    }),
  ]);

  // Placeholder: derive percentage from completed lessons when no record exists
  const derivedPercentage =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  return {
    courseId,
    completionPercentage:
      record?.completionPercentage ?? derivedPercentage,
    completedLessons,
    totalLessons,
    completedAt: record?.completedAt?.toISOString() ?? null,
    lastAccessedAt: record?.lastAccessedAt?.toISOString() ?? null,
  };
}

export async function getUserProgressOverview(
  userId: string
): Promise<UserProgressOverviewDTO> {
  const enrollments = await prisma.courseProgress.findMany({
    where: { userId },
    include: { course: true },
  });

  const courses: CourseProgressDTO[] = await Promise.all(
    enrollments.map((e) => getCourseProgress(userId, e.courseId))
  );

  const totalLessonsCompleted = await prisma.studentProgress.count({
    where: { userId, completionPercentage: 100 },
  });

  return { courses, totalLessonsCompleted };
}

export async function getCourseNavigationWithProgress(
  course: {
    id: string;
    slug: string;
    title: string;
    description: string;
    regionCode: string;
    thumbnail: string | null;
    isPublished: boolean;
  },
  userId?: string
): Promise<CourseNavigationDTO> {
  const units = await prisma.unit.findMany({
    where: { courseId: course.id },
    orderBy: { orderNumber: "asc" },
    include: {
      chapters: {
        orderBy: { orderNumber: "asc" },
        include: {
          lessons: {
            where: { status: LessonStatus.PUBLISHED },
            orderBy: { orderNumber: "asc" },
            select: {
              id: true,
              title: true,
              description: true,
              orderNumber: true,
              estimatedDuration: true,
              status: true,
            },
          },
        },
      },
    },
  });

  let lessonProgressMap = new Map<string, LessonProgressDTO>();

  if (userId) {
    const lessonIds = units.flatMap((u) =>
      u.chapters.flatMap((c) => c.lessons.map((l) => l.id))
    );

    if (lessonIds.length > 0) {
      const progressRows = await prisma.studentProgress.findMany({
        where: { userId, lessonId: { in: lessonIds } },
      });

      lessonProgressMap = new Map(
        progressRows.map((p) => [
          p.lessonId,
          {
            lessonId: p.lessonId,
            completionPercentage: p.completionPercentage,
            completedAt: p.completedAt?.toISOString() ?? null,
          },
        ])
      );
    }
  }

  const progress = userId
    ? await getCourseProgress(userId, course.id)
    : undefined;

  return {
    ...course,
    progress,
    units: units.map((unit) => ({
      id: unit.id,
      title: unit.title,
      description: unit.description,
      orderNumber: unit.orderNumber,
      chapters: unit.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        orderNumber: chapter.orderNumber,
        lessons: chapter.lessons.map((lesson) => {
          const lp = lessonProgressMap.get(lesson.id);
          return {
            ...lesson,
            isCompleted: lp?.completionPercentage === 100,
            completionPercentage: lp?.completionPercentage ?? 0,
          };
        }),
      })),
    })),
  };
}

export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  completionPercentage: number
): Promise<LessonProgressDTO> {
  if (completionPercentage >= 100) {
    return markLessonComplete(userId, lessonId);
  }

  const progress = await prisma.studentProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: { userId, lessonId, completionPercentage },
    update: { completionPercentage },
  });

  return {
    lessonId: progress.lessonId,
    completionPercentage: progress.completionPercentage,
    completedAt: progress.completedAt?.toISOString() ?? null,
  };
}

/**
 * Touch course last accessed timestamp.
 */
export async function touchCourseAccess(
  userId: string,
  courseId: string
): Promise<void> {
  await prisma.courseProgress.upsert({
    where: { userId_courseId: { userId, courseId } },
    create: {
      userId,
      courseId,
      lastAccessedAt: new Date(),
    },
    update: {
      lastAccessedAt: new Date(),
    },
  });
}
