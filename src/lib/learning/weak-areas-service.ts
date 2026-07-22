import { prisma } from "@/lib/prisma";
import { STUDY_TOPICS } from "./topics-config";
import { LessonStatus } from "@prisma/client";

export async function getWeakAreas(userId: string) {
  const answers = await prisma.quizAttemptAnswer.findMany({
    where: { attempt: { userId } },
    include: {
      attempt: {
        include: {
          quiz: {
            include: {
              lesson: {
                include: {
                  questions: { select: { id: true, category: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  const practiceAnswers = await prisma.practiceTestAttemptAnswer.findMany({
    where: { attempt: { userId } },
    include: {
      attempt: true,
    },
  });

  const categoryStats = new Map<
    string,
    { correct: number; total: number }
  >();

  for (const a of answers) {
    const question = a.attempt.quiz.lesson.questions.find(
      (q) => q.id === a.questionId
    );
    if (!question) continue;
    const cat = question.category;
    const stat = categoryStats.get(cat) ?? { correct: 0, total: 0 };
    stat.total += 1;
    if (a.isCorrect) stat.correct += 1;
    categoryStats.set(cat, stat);
  }

  const questionCategories = await prisma.quizQuestion.findMany({
    where: {
      id: {
        in: practiceAnswers.map((a) => a.questionId),
      },
    },
    select: { id: true, category: true },
  });
  const qCatMap = new Map(questionCategories.map((q) => [q.id, q.category]));

  for (const a of practiceAnswers) {
    const cat = qCatMap.get(a.questionId);
    if (!cat) continue;
    const stat = categoryStats.get(cat) ?? { correct: 0, total: 0 };
    stat.total += 1;
    if (a.isCorrect) stat.correct += 1;
    categoryStats.set(cat, stat);
  }

  const topicScores = STUDY_TOPICS.map((topic) => {
    let correct = 0;
    let total = 0;
    for (const cat of topic.categories) {
      const stat = categoryStats.get(cat);
      if (stat) {
        correct += stat.correct;
        total += stat.total;
      }
    }
    const score =
      total > 0 ? Math.round((correct / total) * 100) : null;
    return {
      slug: topic.slug,
      title: topic.title,
      icon: topic.icon,
      score,
      totalAnswered: total,
      isWeak: score !== null && score < 70,
      isStrong: score !== null && score >= 80,
    };
  }).sort((a, b) => {
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return a.score - b.score;
  });

  const recommendations = topicScores
    .filter((t) => t.isWeak || t.score === null)
    .slice(0, 3);

  const strongTopics = topicScores.filter(
    (t) => t.score !== null && t.score >= 80
  );
  const weakTopics = topicScores.filter((t) => t.isWeak);

  return { topics: topicScores, recommendations, strongTopics, weakTopics };
}

const CATEGORY_LABELS: Record<string, string> = {
  licensing: "Licensing & Permits",
  testing: "Testing Process",
  "driving-basics": "Driving Basics",
  navigating: "Navigating Roads",
  "traffic-signals": "Traffic Signals",
  "traffic-signs": "Road Signs",
  "right-of-way": "Right of Way",
  "sharing-road": "Sharing the Road",
  "speed-limits": "Speed Limits",
  "safe-driving": "Safe Driving",
  "alcohol-drugs": "Alcohol & Drugs",
  "insurance-collisions": "Insurance & Collisions",
  registration: "Vehicle Registration",
  "driver-safety": "Driver Safety",
  seniors: "Senior Driving",
};

export async function getPerformanceInsights(userId: string) {
  const answers = await prisma.quizAttemptAnswer.findMany({
    where: { attempt: { userId } },
    include: {
      attempt: {
        include: {
          quiz: {
            include: {
              lesson: {
                include: {
                  questions: { select: { id: true, category: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  const practiceAnswers = await prisma.practiceTestAttemptAnswer.findMany({
    where: { attempt: { userId } },
  });

  const categoryStats = new Map<string, { correct: number; total: number }>();

  for (const a of answers) {
    const question = a.attempt.quiz.lesson.questions.find(
      (q) => q.id === a.questionId
    );
    if (!question) continue;
    const stat = categoryStats.get(question.category) ?? {
      correct: 0,
      total: 0,
    };
    stat.total += 1;
    if (a.isCorrect) stat.correct += 1;
    categoryStats.set(question.category, stat);
  }

  const questionCategories = await prisma.quizQuestion.findMany({
    where: { id: { in: practiceAnswers.map((a) => a.questionId) } },
    select: { id: true, category: true },
  });
  const qCatMap = new Map(questionCategories.map((q) => [q.id, q.category]));

  for (const a of practiceAnswers) {
    const cat = qCatMap.get(a.questionId);
    if (!cat) continue;
    const stat = categoryStats.get(cat) ?? { correct: 0, total: 0 };
    stat.total += 1;
    if (a.isCorrect) stat.correct += 1;
    categoryStats.set(cat, stat);
  }

  const categories = Array.from(categoryStats.entries())
    .map(([slug, stat]) => ({
      slug,
      label: CATEGORY_LABELS[slug] ?? slug,
      score: Math.round((stat.correct / stat.total) * 100),
      totalAnswered: stat.total,
      correct: stat.correct,
      isStrong: stat.total > 0 && stat.correct / stat.total >= 0.8,
      isWeak: stat.total > 0 && stat.correct / stat.total < 0.7,
    }))
    .sort((a, b) => a.score - b.score);

  const topicData = await getWeakAreas(userId);

  return {
    strongTopics: topicData.strongTopics,
    weakTopics: topicData.weakTopics,
    allTopics: topicData.topics,
    categories,
    recommendations: topicData.recommendations,
  };
}

export async function getTopicLessons(slug: string) {
  const topic = STUDY_TOPICS.find((t) => t.slug === slug);
  if (!topic) return null;

  const lessons = await prisma.lesson.findMany({
    where: {
      status: LessonStatus.PUBLISHED,
      questions: {
        some: { category: { in: topic.categories } },
      },
      chapter: {
        unit: { course: { slug: "california-driver-education" } },
      },
    },
    orderBy: [
      { chapter: { unit: { orderNumber: "asc" } } },
      { orderNumber: "asc" },
    ],
    select: {
      id: true,
      title: true,
      description: true,
      chapter: {
        select: {
          unit: { select: { course: { select: { slug: true } } } },
        },
      },
      questions: {
        where: { category: { in: topic.categories } },
        take: 5,
        include: { answers: { orderBy: { orderNumber: "asc" } } },
      },
    },
  });

  return { topic, lessons };
}

export async function getRandomPracticeQuestions(
  userId: string,
  options: { topicSlug?: string; limit?: number } = {}
) {
  const limit = options.limit ?? 10;
  const where: Record<string, unknown> = {
    lesson: {
      status: LessonStatus.PUBLISHED,
      chapter: {
        unit: { course: { slug: "california-driver-education" } },
      },
    },
  };

  if (options.topicSlug) {
    const topic = STUDY_TOPICS.find((t) => t.slug === options.topicSlug);
    if (topic) {
      where.category = { in: topic.categories };
    }
  }

  const questions = await prisma.quizQuestion.findMany({
    where,
    include: {
      answers: { orderBy: { orderNumber: "asc" } },
    },
    take: limit * 3,
  });

  const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, limit);

  return shuffled.map((q) => ({
    id: q.id,
    question: q.question,
    explanation: q.explanation,
    category: q.category,
    imageUrl: q.imageUrl,
    answers: q.answers.map((a) => ({
      id: a.id,
      text: a.answerText,
      isCorrect: a.isCorrect,
    })),
  }));
}
