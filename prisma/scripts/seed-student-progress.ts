/**
 * Seeds realistic early-stage study progress (~3–4 hours).
 *
 * Usage:
 *   STUDENT_EMAIL=you@example.com npm run db:seed:progress
 *   npm run db:seed:progress -- you@example.com
 */

import { PrismaClient, StudyActivityType } from "@prisma/client";
import { assignLessonsToSeries } from "../../src/lib/learning/series-config";

const prisma = new PrismaClient();

const COMPLETED_SERIES = 2;
const LESSONS_DONE_SERIES = 2;
const TARGET_HOURS = 3.5;
const TARGET_SECONDS = Math.round(TARGET_HOURS * 3600);

const STRONG_CATEGORIES = new Set([
  "traffic-signs",
  "licensing",
  "testing",
]);
const WEAK_CATEGORIES = new Set([
  "alcohol-drugs",
  "right-of-way",
]);

function daysAgo(days: number, hour = 10): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, Math.floor(Math.random() * 50), 0, 0);
  return d;
}

function targetCorrect(category: string): boolean {
  if (STRONG_CATEGORIES.has(category)) return Math.random() < 0.85;
  if (WEAK_CATEGORIES.has(category)) return Math.random() < 0.55;
  return Math.random() < 0.72;
}

function pickAnswer<T extends { id: string; isCorrect: boolean }>(
  answers: T[],
  shouldBeCorrect: boolean
): T {
  const pool = answers.filter((a) => a.isCorrect === shouldBeCorrect);
  if (pool.length > 0) return pool[Math.floor(Math.random() * pool.length)];
  return answers[0];
}

async function resolveStudentEmail(): Promise<string> {
  const fromArg = process.argv[2]?.trim();
  const fromEnv = process.env.STUDENT_EMAIL?.trim();
  const email = fromArg || fromEnv;
  if (email) return email;

  const student = await prisma.user.findFirst({
    where: {
      role: "STUDENT",
      email: { not: "student@example.com" },
    },
    orderBy: { createdAt: "desc" },
    select: { email: true },
  });

  if (!student) {
    throw new Error(
      "No student found. Pass email: npm run db:seed:progress -- you@example.com"
    );
  }

  return student.email;
}

async function clearStudentProgress(userId: string) {
  await prisma.quizAttemptAnswer.deleteMany({
    where: { attempt: { userId } },
  });
  await prisma.practiceTestAttemptAnswer.deleteMany({
    where: { attempt: { userId } },
  });
  await prisma.quizAttempt.deleteMany({ where: { userId } });
  await prisma.practiceTestAttempt.deleteMany({ where: { userId } });
  await prisma.studyTimeLog.deleteMany({ where: { userId } });
  await prisma.studentProgress.deleteMany({ where: { userId } });
  await prisma.seriesProgress.deleteMany({ where: { userId } });
  await prisma.courseProgress.deleteMany({ where: { userId } });
}

async function logTime(
  userId: string,
  seconds: number,
  activityType: StudyActivityType,
  resourceId: string | null,
  loggedAt: Date,
  loggedSeconds: { total: number }
): Promise<number> {
  const remaining = TARGET_SECONDS - loggedSeconds.total;
  if (remaining <= 0) return 0;

  const chunk = Math.min(seconds, remaining);
  await prisma.studyTimeLog.create({
    data: {
      userId,
      activityType,
      resourceId,
      seconds: chunk,
      loggedAt,
    },
  });
  loggedSeconds.total += chunk;
  return chunk;
}

const TOPIC_SCORE_TARGETS = [
  { category: "alcohol-drugs", correctRate: 0.1, count: 10 },
  { category: "right-of-way", correctRate: 0.5, count: 10 },
  { category: "sharing-road", correctRate: 0.62, count: 8 },
  { category: "traffic-signs", correctRate: 0.75, count: 10 },
  { category: "licensing", correctRate: 0.88, count: 10 },
];

async function seedTopicScoreVariety(userId: string, courseId: string) {
  for (const target of TOPIC_SCORE_TARGETS) {
    const questions = await prisma.quizQuestion.findMany({
      where: {
        category: target.category,
        lesson: {
          status: "PUBLISHED",
          chapter: { unit: { courseId } },
          quiz: { isNot: null },
        },
      },
      include: {
        answers: true,
        lesson: { include: { quiz: true } },
      },
      take: target.count,
    });

    if (questions.length === 0) continue;

    const quizId = questions[0].lesson.quiz?.id;
    if (!quizId) continue;

    const correctNeeded = Math.round(questions.length * target.correctRate);
    const attemptedAt = daysAgo(3, 11);

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score: Math.round((correctNeeded / questions.length) * 100),
        attemptNumber: 2,
        attemptedAt,
      },
    });

    for (const [index, question] of questions.entries()) {
      const shouldBeCorrect = index < correctNeeded;
      const selected = pickAnswer(question.answers, shouldBeCorrect);
      await prisma.quizAttemptAnswer.create({
        data: {
          attemptId: attempt.id,
          questionId: question.id,
          selectedAnswerId: selected.id,
          isCorrect: shouldBeCorrect,
        },
      });
    }
  }
}

async function seedStudentProgress(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(`User not found: ${email}`);

  const course = await prisma.course.findFirst({
    where: { slug: "california-driver-education", isPublished: true },
  });
  if (!course) throw new Error("Course not found. Run npm run db:seed first.");

  console.log(`Seeding progress for ${email}…`);
  await clearStudentProgress(user.id);

  const lessons = await prisma.lesson.findMany({
    where: {
      status: "PUBLISHED",
      chapter: { unit: { courseId: course.id } },
    },
    orderBy: [
      { chapter: { unit: { orderNumber: "asc" } } },
      { chapter: { orderNumber: "asc" } },
      { orderNumber: "asc" },
    ],
    include: {
      quiz: true,
      questions: {
        include: { answers: true },
        orderBy: { orderNumber: "asc" },
      },
    },
  });

  const assignment = assignLessonsToSeries(lessons.map((l) => l.id));
  const lessonsToComplete = new Set<string>();

  for (let n = 1; n <= LESSONS_DONE_SERIES; n++) {
    for (const id of assignment.get(n) ?? []) lessonsToComplete.add(id);
  }

  const loggedSeconds = { total: 0 };
  let dayOffset = 10;

  for (const lesson of lessons) {
    if (!lessonsToComplete.has(lesson.id)) continue;
    if (loggedSeconds.total >= TARGET_SECONDS) break;

    const completedAt = daysAgo(dayOffset, 9 + (dayOffset % 4));
    dayOffset -= 1;

    await prisma.studentProgress.create({
      data: {
        userId: user.id,
        lessonId: lesson.id,
        completionPercentage: 100,
        completedAt,
      },
    });

    await logTime(
      user.id,
      1500 + Math.floor(Math.random() * 900),
      StudyActivityType.LESSON,
      lesson.id,
      completedAt,
      loggedSeconds
    );

    if (lesson.quiz && lesson.questions.length > 0 && loggedSeconds.total < TARGET_SECONDS) {
      const answers = lesson.questions.map((q) => {
        const correct = targetCorrect(q.category);
        const selected = pickAnswer(q.answers, correct);
        return {
          questionId: q.id,
          selectedAnswerId: selected.id,
          isCorrect: correct,
        };
      });
      const correctCount = answers.filter((a) => a.isCorrect).length;
      const score = Math.round((correctCount / answers.length) * 100);
      const attemptedAt = new Date(completedAt.getTime() + 8 * 60 * 1000);

      const attempt = await prisma.quizAttempt.create({
        data: {
          userId: user.id,
          quizId: lesson.quiz.id,
          score,
          attemptNumber: 1,
          attemptedAt,
        },
      });

      for (const a of answers) {
        await prisma.quizAttemptAnswer.create({
          data: { attemptId: attempt.id, ...a },
        });
      }

      await logTime(
        user.id,
        240 + Math.floor(Math.random() * 240),
        StudyActivityType.QUIZ,
        lesson.quiz.id,
        attemptedAt,
        loggedSeconds
      );
    }
  }

  for (let seriesNumber = 1; seriesNumber <= LESSONS_DONE_SERIES; seriesNumber++) {
    const exam = await prisma.practiceExam.findFirst({
      where: { seriesNumber },
      include: {
        questions: {
          include: {
            question: { include: { answers: true } },
          },
          orderBy: { orderNumber: "asc" },
        },
      },
    });

    const lessonIds = assignment.get(seriesNumber) ?? [];
    const lessonsDone =
      lessonIds.length > 0 &&
      lessonIds.every((id) => lessonsToComplete.has(id));

    const passed = seriesNumber <= COMPLETED_SERIES;
    const failedAttempt =
      !passed &&
      seriesNumber === COMPLETED_SERIES + 1 &&
      lessonsDone;

    if ((passed || failedAttempt) && exam) {
      const targetScore = passed
        ? 74 + Math.floor(Math.random() * 18)
        : 58 + Math.floor(Math.random() * 8);
      const attemptedAt = daysAgo(8 - seriesNumber, 14);
      const examQuestions = exam.questions.map((eq) => eq.question);
      const total = examQuestions.length || 1;
      const correctNeeded = Math.round((targetScore / 100) * total);

      const answerRows = examQuestions.map((q, index) => {
        const shouldBeCorrect = index < correctNeeded;
        const selected = pickAnswer(q.answers, shouldBeCorrect);
        return {
          questionId: q.id,
          selectedAnswerId: selected.id,
          isCorrect: shouldBeCorrect,
        };
      });

      const attempt = await prisma.practiceTestAttempt.create({
        data: {
          userId: user.id,
          practiceExamId: exam.id,
          score: targetScore,
          passed,
          timeSpent: 900 + Math.floor(Math.random() * 600),
          attemptedAt,
        },
      });

      for (const a of answerRows) {
        await prisma.practiceTestAttemptAnswer.create({
          data: { attemptId: attempt.id, ...a },
        });
      }

      await logTime(
        user.id,
        900 + Math.floor(Math.random() * 420),
        StudyActivityType.EXAM,
        exam.id,
        attemptedAt,
        loggedSeconds
      );
    }

    await prisma.seriesProgress.upsert({
      where: {
        userId_seriesNumber: { userId: user.id, seriesNumber },
      },
      create: {
        userId: user.id,
        seriesNumber,
        lessonsDone,
        examPassed: passed,
        completedAt: passed && lessonsDone ? daysAgo(7, 15) : null,
      },
      update: {
        lessonsDone,
        examPassed: passed,
        completedAt: passed && lessonsDone ? daysAgo(7, 15) : null,
      },
    });
  }

  await seedTopicScoreVariety(user.id, course.id);

  const completedLessons = await prisma.studentProgress.count({
    where: { userId: user.id, completionPercentage: 100 },
  });
  const seriesDone = await prisma.seriesProgress.count({
    where: { userId: user.id, lessonsDone: true, examPassed: true },
  });
  const totalSeconds = (
    await prisma.studyTimeLog.findMany({
      where: { userId: user.id },
      select: { seconds: true },
    })
  ).reduce((sum, l) => sum + l.seconds, 0);
  const hours = Math.round((totalSeconds / 3600) * 10) / 10;
  const questionsAnswered =
    (await prisma.quizAttemptAnswer.count({
      where: { attempt: { userId: user.id } },
    })) +
    (await prisma.practiceTestAttemptAnswer.count({
      where: { attempt: { userId: user.id } },
    }));

  await prisma.courseProgress.upsert({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    create: {
      userId: user.id,
      courseId: course.id,
      completionPercentage: Math.round((completedLessons / lessons.length) * 100),
      lastAccessedAt: new Date(),
    },
    update: {
      completionPercentage: Math.round((completedLessons / lessons.length) * 100),
      lastAccessedAt: new Date(),
    },
  });

  console.log("Done:");
  console.log(`  ${hours}h studied (${Math.round((hours / 30) * 100)}% of 30h goal)`);
  console.log(`  ${completedLessons} lessons completed`);
  console.log(`  ${seriesDone} series completed`);
  console.log(`  ${questionsAnswered} questions answered`);
}

async function main() {
  const email = await resolveStudentEmail();
  await seedStudentProgress(email);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
