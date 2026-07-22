import { prisma } from "@/lib/prisma";
import { createNotification } from "./notification-service";

const ACHIEVEMENT_DEFS = [
  {
    title: "First Lesson Completed",
    description: "Complete your first lesson.",
    icon: "lesson-1",
    slug: "first-lesson",
  },
  {
    title: "First Quiz Completed",
    description: "Complete your first lesson quiz.",
    icon: "quiz-1",
    slug: "first-quiz",
  },
  {
    title: "10 Lessons Completed",
    description: "Complete 10 lessons.",
    icon: "lesson-10",
    slug: "ten-lessons",
  },
  {
    title: "Passed First Practice Exam",
    description: "Pass your first DMV practice exam.",
    icon: "exam-pass",
    slug: "first-practice-pass",
  },
] as const;

export async function seedAchievements(): Promise<void> {
  for (const def of ACHIEVEMENT_DEFS) {
    await prisma.achievement.upsert({
      where: { title: def.title },
      create: {
        title: def.title,
        description: def.description,
        icon: def.icon,
      },
      update: {},
    });
  }
}

export async function getUserAchievements(userId: string) {
  const earned = await prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { earnedAt: "desc" },
  });
  return earned.map((e) => ({
    id: e.achievement.id,
    title: e.achievement.title,
    description: e.achievement.description,
    icon: e.achievement.icon,
    earnedAt: e.earnedAt.toISOString(),
  }));
}

async function awardAchievement(
  userId: string,
  title: string
): Promise<boolean> {
  const achievement = await prisma.achievement.findUnique({ where: { title } });
  if (!achievement) return false;

  try {
    await prisma.userAchievement.create({
      data: { userId, achievementId: achievement.id },
    });
    await createNotification({
      userId,
      title: "Achievement unlocked",
      message: `You earned: ${achievement.title}`,
    });
    return true;
  } catch {
    return false;
  }
}

export async function checkLessonAchievements(userId: string): Promise<void> {
  const completed = await prisma.studentProgress.count({
    where: { userId, completionPercentage: 100 },
  });

  if (completed >= 1) {
    await awardAchievement(userId, "First Lesson Completed");
  }
  if (completed >= 10) {
    await awardAchievement(userId, "10 Lessons Completed");
  }
}

export async function checkQuizAchievements(userId: string): Promise<void> {
  const attempts = await prisma.quizAttempt.count({ where: { userId } });
  if (attempts >= 1) {
    await awardAchievement(userId, "First Quiz Completed");
  }
}

export async function checkPracticeExamAchievements(
  userId: string
): Promise<void> {
  const passed = await prisma.practiceTestAttempt.count({
    where: { userId, passed: true },
  });
  if (passed >= 1) {
    await awardAchievement(userId, "Passed First Practice Exam");
  }
}
