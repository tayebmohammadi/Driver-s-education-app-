import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const DEMO_STUDENT = {
  email: "student@example.com",
  password: "password123",
  firstName: "Demo",
  lastName: "Student",
};

const ACHIEVEMENTS = [
  {
    title: "First Lesson Completed",
    description: "Complete your first lesson.",
    icon: "lesson-1",
  },
  {
    title: "First Quiz Completed",
    description: "Complete your first lesson quiz.",
    icon: "quiz-1",
  },
  {
    title: "10 Lessons Completed",
    description: "Complete 10 lessons.",
    icon: "lesson-10",
  },
  {
    title: "Passed First Practice Exam",
    description: "Pass your first DMV practice exam.",
    icon: "exam-pass",
  },
];

const SERIES_TITLES: Record<number, string> = {
  1: "Getting Your License",
  2: "Permits & Requirements",
  3: "The Testing Process",
  4: "License Changes & Renewal",
  5: "Introduction to Driving",
  6: "Vehicle Controls",
  7: "Starting & Stopping",
  8: "Turning & Lane Changes",
  9: "Intersections Basics",
  10: "Traffic Signals",
  11: "Traffic Signs",
  12: "Right of Way",
  13: "Sharing the Road",
  14: "Speed Limits",
  15: "Freeway Driving",
  16: "Parking Rules",
  17: "Night Driving",
  18: "Defensive Driving",
  19: "Weather Conditions",
  20: "Emergency Situations",
  21: "Alcohol & Drugs",
  22: "Distracted Driving",
  23: "Insurance & Collisions",
  24: "Hit & Run Laws",
  25: "Vehicle Registration",
  26: "Driver Safety",
  27: "Child Safety",
  28: "Senior Driving",
  29: "Environmental Driving",
  30: "Final Review & Permit Prep",
};

const TOTAL_SERIES = 30;

function assignLessonsToSeries(lessonIds: string[]): Map<number, string[]> {
  const map = new Map<number, string[]>();
  for (let s = 1; s <= TOTAL_SERIES; s++) map.set(s, []);
  lessonIds.forEach((id, index) => {
    const seriesNum = Math.min(
      TOTAL_SERIES,
      Math.floor((index * TOTAL_SERIES) / lessonIds.length) + 1
    );
    map.get(seriesNum)!.push(id);
  });
  return map;
}

export async function seedPlatformExtras(prisma: PrismaClient) {
  for (const def of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { title: def.title },
      create: def,
      update: {},
    });
  }

  const course = await prisma.course.findUnique({
    where: { slug: "california-driver-education" },
  });

  if (!course) return;

  const existingPermit = await prisma.practiceExam.findFirst({
    where: {
      courseId: course.id,
      title: "California DMV Permit Practice Test",
    },
  });

  if (!existingPermit) {
    const exam = await prisma.practiceExam.create({
      data: {
        courseId: course.id,
        title: "California DMV Permit Practice Test",
        description:
          "Full-length randomized practice test using questions from the California Driver Education course.",
        passingScore: 83,
        timeLimit: 45,
      },
    });

    const questions = await prisma.quizQuestion.findMany({
      where: {
        lesson: { chapter: { unit: { courseId: course.id } } },
      },
      take: 50,
    });

    for (let i = 0; i < questions.length; i++) {
      await prisma.practiceExamQuestion.create({
        data: {
          practiceExamId: exam.id,
          questionId: questions[i].id,
          orderNumber: i + 1,
        },
      });
    }

    console.log(
      `  Permit practice exam created with ${questions.length} questions`
    );
  }

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
    select: { id: true },
  });

  const assignment = assignLessonsToSeries(lessons.map((l) => l.id));
  let seriesCreated = 0;

  for (let n = 1; n <= TOTAL_SERIES; n++) {
    const existing = await prisma.practiceExam.findFirst({
      where: { seriesNumber: n },
    });
    if (existing) continue;

    const lessonIds = assignment.get(n) ?? [];
    const seriesQuestions = await prisma.quizQuestion.findMany({
      where: { lessonId: { in: lessonIds.length ? lessonIds : undefined } },
      take: 30,
    });

    let questionPool = seriesQuestions;
    if (questionPool.length < 30) {
      const extra = await prisma.quizQuestion.findMany({
        where: { lesson: { chapter: { unit: { courseId: course.id } } } },
        take: 30,
      });
      questionPool = extra;
    }

    const title = SERIES_TITLES[n] ?? `Series ${n}`;
    const exam = await prisma.practiceExam.create({
      data: {
        courseId: course.id,
        seriesNumber: n,
        title: `Series ${n}: ${title} — Final Exam`,
        description: `30-question final exam for Series ${n}. Pass with 70% or higher.`,
        passingScore: 70,
        timeLimit: 45,
      },
    });

    const selected = questionPool.slice(0, 30);
    for (let i = 0; i < selected.length; i++) {
      await prisma.practiceExamQuestion.create({
        data: {
          practiceExamId: exam.id,
          questionId: selected[i].id,
          orderNumber: i + 1,
        },
      });
    }
    seriesCreated += 1;
  }

  console.log(`  ${seriesCreated} series exams seeded`);
  console.log("  Achievements seeded");
}

export async function seedDemoUser(prisma: PrismaClient) {
  const passwordHash = await bcrypt.hash(DEMO_STUDENT.password, 12);

  await prisma.user.upsert({
    where: { email: DEMO_STUDENT.email },
    create: {
      email: DEMO_STUDENT.email,
      passwordHash,
      firstName: DEMO_STUDENT.firstName,
      lastName: DEMO_STUDENT.lastName,
      emailVerified: true,
    },
    update: {
      passwordHash,
      emailVerified: true,
    },
  });

  console.log(`  Demo student: ${DEMO_STUDENT.email} / ${DEMO_STUDENT.password}`);
}
