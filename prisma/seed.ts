import { PrismaClient } from "@prisma/client";
import { CALIFORNIA_DRIVER_EDUCATION } from "./data/california";
import {
  countCurriculumStats,
  seedCourse,
} from "./seed-curriculum";
import { seedDemoUser, seedPlatformExtras } from "./seed-extras";
import { assertDestructiveSeedAllowed } from "./seed-guard";

assertDestructiveSeedAllowed();
const prisma = new PrismaClient();

async function clearLearningData() {
  await prisma.quizAttemptAnswer.deleteMany();
  await prisma.practiceTestAttemptAnswer.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.practiceTestAttempt.deleteMany();
  await prisma.practiceExamQuestion.deleteMany();
  await prisma.quizAnswer.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.practiceExam.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.lessonContentBlock.deleteMany();
  await prisma.studentProgress.deleteMany();
  await prisma.courseProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.course.deleteMany();
}

async function main() {
  console.log("Seeding California Driver Education curriculum...");
  console.log("Source: California Driver's Handbook (DL 600, Rev. 6/2025)\n");

  await clearLearningData();

  await seedCourse(prisma, CALIFORNIA_DRIVER_EDUCATION);
  await seedPlatformExtras(prisma);
  await seedDemoUser(prisma);

  const stats = countCurriculumStats(CALIFORNIA_DRIVER_EDUCATION);
  console.log("Seed complete:");
  console.log(`  Course: ${CALIFORNIA_DRIVER_EDUCATION.title}`);
  console.log(`  Units: ${stats.units}`);
  console.log(`  Chapters: ${stats.chapters}`);
  console.log(`  Lessons: ${stats.lessons}`);
  console.log(`  Content blocks: ${stats.blocks}`);
  console.log(`  Quiz questions: ${stats.questions}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
