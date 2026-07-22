import { prisma } from "@/lib/prisma";
import type { StudyActivityType } from "@prisma/client";
import { REQUIRED_STUDY_HOURS } from "./series-config";

export async function logStudyTime(
  userId: string,
  seconds: number,
  activityType: StudyActivityType,
  resourceId?: string
): Promise<void> {
  if (seconds < 5) return;

  await prisma.studyTimeLog.create({
    data: {
      userId,
      seconds: Math.min(seconds, 3600),
      activityType,
      resourceId: resourceId ?? null,
    },
  });
}

export async function getStudyTimeStats(userId: string) {
  const logs = await prisma.studyTimeLog.findMany({
    where: { userId },
    select: { seconds: true },
  });

  const totalSeconds = logs.reduce((sum, l) => sum + l.seconds, 0);
  const totalHours = Math.round((totalSeconds / 3600) * 10) / 10;
  const requiredSeconds = REQUIRED_STUDY_HOURS * 3600;
  const percentage = Math.min(
    100,
    Math.round((totalSeconds / requiredSeconds) * 100)
  );

  return {
    totalSeconds,
    totalHours,
    requiredHours: REQUIRED_STUDY_HOURS,
    hoursStudied: totalHours,
    hoursRemaining: Math.max(0, REQUIRED_STUDY_HOURS - totalHours),
    percentage,
    requirementMet: totalSeconds >= requiredSeconds,
  };
}

export async function getDetailedProgressStats(userId: string) {
  const course = await prisma.course.findFirst({
    where: { slug: "california-driver-education", isPublished: true },
  });

  const [
    studyTime,
    lessonsCompleted,
    seriesCompleted,
    examsCompleted,
    questionsAnswered,
  ] = await Promise.all([
    getStudyTimeStats(userId),
    prisma.studentProgress.count({
      where: { userId, completionPercentage: 100 },
    }),
    prisma.seriesProgress.count({
      where: { userId, lessonsDone: true, examPassed: true },
    }),
    prisma.practiceTestAttempt.count({ where: { userId } }),
    Promise.all([
      prisma.quizAttemptAnswer.count({ where: { attempt: { userId } } }),
      prisma.practiceTestAttemptAnswer.count({
        where: { attempt: { userId } },
      }),
    ]).then(([quiz, practice]) => quiz + practice),
  ]);

  const totalLessons = course
    ? await prisma.lesson.count({
        where: {
          status: "PUBLISHED",
          chapter: { unit: { courseId: course.id } },
        },
      })
    : 46;

  return {
    studyTime,
    lessonsCompleted,
    totalLessons,
    seriesCompleted,
    totalSeries: 30,
    examsCompleted,
    questionsAnswered,
  };
}
