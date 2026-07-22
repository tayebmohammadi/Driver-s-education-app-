import { prisma } from "@/lib/prisma";
import { LessonStatus } from "@prisma/client";
import { countPublishedLessonsInCourse } from "./course-service";
import {
  checkLessonAchievements,
  checkQuizAchievements,
} from "./achievement-service";
import { createNotification } from "./notification-service";
import { syncSeriesLessonProgress } from "./series-service";
import type { LessonProgressDTO } from "@/types/learning";

export async function completeLesson(
  userId: string,
  lessonId: string
): Promise<LessonProgressDTO> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId, status: LessonStatus.PUBLISHED },
    include: {
      chapter: { include: { unit: { include: { course: true } } } },
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const courseId = lesson.chapter.unit.courseId;
  const now = new Date();

  const progress = await prisma.studentProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: {
      userId,
      lessonId,
      completionPercentage: 100,
      completedAt: now,
    },
    update: {
      completionPercentage: 100,
      completedAt: now,
    },
  });

  await recalculateCourseProgress(userId, courseId);
  await checkLessonAchievements(userId);
  await syncSeriesLessonProgress(userId);

  await createNotification({
    userId,
    title: "Lesson completed",
    message: `You completed "${lesson.title}".`,
  });

  return {
    lessonId: progress.lessonId,
    completionPercentage: progress.completionPercentage,
    completedAt: progress.completedAt?.toISOString() ?? null,
  };
}

export async function recalculateCourseProgress(
  userId: string,
  courseId: string
): Promise<void> {
  const [totalLessons, completedLessons] = await Promise.all([
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

  const percentage =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  await prisma.courseProgress.upsert({
    where: { userId_courseId: { userId, courseId } },
    create: {
      userId,
      courseId,
      completionPercentage: percentage,
      completedAt: percentage === 100 ? new Date() : null,
      lastAccessedAt: new Date(),
    },
    update: {
      completionPercentage: percentage,
      completedAt: percentage === 100 ? new Date() : null,
      lastAccessedAt: new Date(),
    },
  });
}

export async function getCompletionStats(userId: string, courseId: string) {
  const units = await prisma.unit.findMany({
    where: { courseId },
    include: {
      chapters: {
        include: {
          lessons: { where: { status: LessonStatus.PUBLISHED } },
        },
      },
    },
  });

  const allLessonIds = units.flatMap((u) =>
    u.chapters.flatMap((c) => c.lessons.map((l) => l.id))
  );

  const completed = await prisma.studentProgress.findMany({
    where: {
      userId,
      lessonId: { in: allLessonIds },
      completionPercentage: 100,
    },
    select: { lessonId: true },
  });
  const completedSet = new Set(completed.map((p) => p.lessonId));

  let unitsCompleted = 0;
  let chaptersCompleted = 0;
  const lessonsCompleted = completedSet.size;

  for (const unit of units) {
    const unitLessonIds = unit.chapters.flatMap((c) =>
      c.lessons.map((l) => l.id)
    );
    if (
      unitLessonIds.length > 0 &&
      unitLessonIds.every((id) => completedSet.has(id))
    ) {
      unitsCompleted += 1;
    }

    for (const chapter of unit.chapters) {
      const chapterIds = chapter.lessons.map((l) => l.id);
      if (
        chapterIds.length > 0 &&
        chapterIds.every((id) => completedSet.has(id))
      ) {
        chaptersCompleted += 1;
      }
    }
  }

  const courseProgress = await prisma.courseProgress.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  const quizAttempts = await prisma.quizAttempt.count({
    where: {
      userId,
      quiz: {
        lesson: { chapter: { unit: { courseId } } },
      },
    },
  });

  const practiceAttempts = await prisma.practiceTestAttempt.count({
    where: { userId, practiceExam: { courseId } },
  });

  return {
    courseCompletionPercentage: courseProgress?.completionPercentage ?? 0,
    lessonsCompleted,
    totalLessons: allLessonIds.length,
    chaptersCompleted,
    totalChapters: units.reduce((n, u) => n + u.chapters.length, 0),
    unitsCompleted,
    totalUnits: units.length,
    quizzesCompleted: quizAttempts,
    practiceExamsCompleted: practiceAttempts,
  };
}

export { checkQuizAchievements };
