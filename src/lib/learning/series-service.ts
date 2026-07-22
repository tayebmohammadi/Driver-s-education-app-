import { prisma } from "@/lib/prisma";
import { LessonStatus } from "@prisma/client";
import {
  TOTAL_SERIES,
  assignLessonsToSeries,
  getSeriesTitle,
  SERIES_EXAM_QUESTIONS,
  SERIES_PASS_SCORE,
} from "./series-config";

const COURSE_SLUG = "california-driver-education";

async function getCourseLessons() {
  return prisma.lesson.findMany({
    where: {
      status: LessonStatus.PUBLISHED,
      chapter: { unit: { course: { slug: COURSE_SLUG } } },
    },
    orderBy: [
      { chapter: { unit: { orderNumber: "asc" } } },
      { chapter: { orderNumber: "asc" } },
      { orderNumber: "asc" },
    ],
    select: {
      id: true,
      title: true,
      description: true,
      estimatedDuration: true,
      chapter: {
        select: {
          unit: { select: { course: { select: { slug: true } } } },
        },
      },
    },
  });
}

export async function getSeriesList(userId: string) {
  const lessons = await getCourseLessons();
  const assignment = assignLessonsToSeries(lessons.map((l) => l.id));
  const completedLessons = await prisma.studentProgress.findMany({
    where: { userId, completionPercentage: 100 },
    select: { lessonId: true },
  });
  const completedSet = new Set(completedLessons.map((p) => p.lessonId));

  const seriesProgress = await prisma.seriesProgress.findMany({
    where: { userId },
  });
  const progressMap = new Map(
    seriesProgress.map((p) => [p.seriesNumber, p])
  );

  const series = [];
  for (let n = 1; n <= TOTAL_SERIES; n++) {
    const lessonIds = assignment.get(n) ?? [];
    const seriesLessons = lessons.filter((l) => lessonIds.includes(l.id));
    const lessonsDone =
      lessonIds.length > 0 &&
      lessonIds.every((id) => completedSet.has(id));
    const prog = progressMap.get(n);
    const examPassed = prog?.examPassed ?? false;
    const complete = lessonsDone && examPassed;

    series.push({
      number: n,
      title: getSeriesTitle(n),
      lessonCount: seriesLessons.length,
      lessonsDone,
      examPassed,
      complete,
      lessons: seriesLessons.map((l) => ({
        id: l.id,
        title: l.title,
        courseSlug: l.chapter.unit.course.slug,
        completed: completedSet.has(l.id),
      })),
    });
  }

  return series;
}

export async function getSeriesDetail(userId: string, seriesNumber: number) {
  const all = await getSeriesList(userId);
  return all.find((s) => s.number === seriesNumber) ?? null;
}

export async function getSeriesExamId(
  seriesNumber: number
): Promise<string | null> {
  const exam = await prisma.practiceExam.findFirst({
    where: { seriesNumber },
    select: { id: true },
  });
  return exam?.id ?? null;
}

export async function markSeriesExamPassed(
  userId: string,
  seriesNumber: number,
  passed: boolean
): Promise<void> {
  const detail = await getSeriesDetail(userId, seriesNumber);
  if (!detail) return;

  await prisma.seriesProgress.upsert({
    where: { userId_seriesNumber: { userId, seriesNumber } },
    create: {
      userId,
      seriesNumber,
      lessonsDone: detail.lessonsDone,
      examPassed: passed,
      completedAt:
        passed && detail.lessonsDone ? new Date() : null,
    },
    update: {
      lessonsDone: detail.lessonsDone,
      examPassed: passed,
      completedAt:
        passed && detail.lessonsDone ? new Date() : null,
    },
  });
}

export async function syncSeriesLessonProgress(userId: string): Promise<void> {
  const all = await getSeriesList(userId);
  for (const s of all) {
    const existing = await prisma.seriesProgress.findUnique({
      where: { userId_seriesNumber: { userId, seriesNumber: s.number } },
    });
    await prisma.seriesProgress.upsert({
      where: { userId_seriesNumber: { userId, seriesNumber: s.number } },
      create: {
        userId,
        seriesNumber: s.number,
        lessonsDone: s.lessonsDone,
        examPassed: existing?.examPassed ?? false,
        completedAt:
          s.lessonsDone && (existing?.examPassed ?? false)
            ? new Date()
            : null,
      },
      update: {
        lessonsDone: s.lessonsDone,
        completedAt:
          s.lessonsDone && (existing?.examPassed ?? false)
            ? new Date()
            : null,
      },
    });
  }
}

export {
  SERIES_EXAM_QUESTIONS,
  SERIES_PASS_SCORE,
  TOTAL_SERIES,
};
