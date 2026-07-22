import { prisma } from "@/lib/prisma";
import { LessonStatus } from "@prisma/client";
import { checkPracticeExamAchievements } from "./achievement-service";
import { createNotification } from "./notification-service";
import { markSeriesExamPassed } from "./series-service";
import { logStudyTime } from "./study-time-service";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function listPracticeExams(courseId?: string) {
  return prisma.practiceExam.findMany({
    where: courseId ? { courseId } : undefined,
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      passingScore: true,
      timeLimit: true,
      courseId: true,
    },
  });
}

export async function getPracticeExam(examId: string) {
  return prisma.practiceExam.findUnique({
    where: { id: examId },
    include: {
      course: { select: { id: true, slug: true, title: true } },
    },
  });
}

export async function startPracticeExamSession(
  examId: string,
  questionCount?: number
) {
  const exam = await prisma.practiceExam.findUnique({
    where: { id: examId },
    include: {
      questions: {
        include: {
          question: {
            include: {
              answers: {
                orderBy: { orderNumber: "asc" },
                select: { id: true, answerText: true, orderNumber: true },
              },
            },
          },
        },
      },
    },
  });

  if (!exam) throw new Error("Practice exam not found");

  let pool = exam.questions.map((pq) => pq.question);

  if (pool.length === 0 && exam.courseId) {
    const courseQuestions = await prisma.quizQuestion.findMany({
      where: {
        lesson: {
          status: LessonStatus.PUBLISHED,
          chapter: { unit: { courseId: exam.courseId } },
        },
      },
      include: {
        answers: {
          orderBy: { orderNumber: "asc" },
          select: { id: true, answerText: true, orderNumber: true },
        },
      },
    });
    pool = courseQuestions;
  }

  if (pool.length === 0) throw new Error("No questions available for this exam");

  const count = Math.min(questionCount ?? 20, pool.length);
  const selected = shuffle(pool).slice(0, count);

  return {
    examId: exam.id,
    title: exam.title,
    passingScore: exam.passingScore,
    timeLimitMinutes: exam.timeLimit,
    questionCount: selected.length,
    questions: selected.map((q, index) => ({
      id: q.id,
      question: q.question,
      questionType: q.questionType,
      imageUrl: q.imageUrl,
      orderNumber: index + 1,
      answers: shuffle(q.answers),
    })),
  };
}

export async function submitPracticeExam(
  userId: string,
  examId: string,
  timeSpentSeconds: number,
  submissions: { questionId: string; selectedAnswerId: string }[]
) {
  const exam = await prisma.practiceExam.findUnique({ where: { id: examId } });
  if (!exam) throw new Error("Practice exam not found");

  const questionIds = submissions.map((s) => s.questionId);
  const questions = await prisma.quizQuestion.findMany({
    where: { id: { in: questionIds } },
    include: { answers: true },
  });

  const questionMap = new Map(questions.map((q) => [q.id, q]));
  let correct = 0;

  const answerRecords = submissions.map((sub) => {
    const question = questionMap.get(sub.questionId);
    const selected = question?.answers.find(
      (a) => a.id === sub.selectedAnswerId
    );
    const isCorrect = selected?.isCorrect ?? false;
    if (isCorrect) correct += 1;
    return {
      questionId: sub.questionId,
      selectedAnswerId: sub.selectedAnswerId,
      isCorrect,
    };
  });

  const total = submissions.length || 1;
  const score = Math.round((correct / total) * 100);
  const passed = score >= exam.passingScore;

  const attempt = await prisma.practiceTestAttempt.create({
    data: {
      userId,
      practiceExamId: examId,
      score,
      passed,
      timeSpent: timeSpentSeconds,
      answers: {
        create: answerRecords,
      },
    },
  });

  await checkPracticeExamAchievements(userId);

  if (exam.seriesNumber) {
    await markSeriesExamPassed(userId, exam.seriesNumber, passed);
  }

  await logStudyTime(userId, timeSpentSeconds, "EXAM", examId);

  await createNotification({
    userId,
    title: passed ? "Practice exam passed" : "Practice exam completed",
    message: `You scored ${score}% on "${exam.title}" (${passed ? "Passed" : "Did not pass"}).`,
  });

  const results = submissions.map((sub) => {
    const question = questionMap.get(sub.questionId);
    const selected = question?.answers.find(
      (a) => a.id === sub.selectedAnswerId
    );
    const correctAnswer = question?.answers.find((a) => a.isCorrect);
    return {
      questionId: sub.questionId,
      question: question?.question,
      selectedAnswerId: sub.selectedAnswerId,
      selectedAnswerText: selected?.answerText,
      correctAnswerId: correctAnswer?.id,
      correctAnswerText: correctAnswer?.answerText,
      isCorrect: selected?.isCorrect ?? false,
      explanation: question?.explanation,
    };
  });

  return {
    attemptId: attempt.id,
    score,
    passed,
    passingScore: exam.passingScore,
    timeSpent: timeSpentSeconds,
    correctCount: correct,
    totalQuestions: total,
    results,
  };
}

export async function getPracticeAttemptReview(
  userId: string,
  attemptId: string
) {
  const attempt = await prisma.practiceTestAttempt.findFirst({
    where: { id: attemptId, userId },
    include: {
      answers: true,
      practiceExam: true,
    },
  });

  if (!attempt) return null;

  const questionIds = attempt.answers.map((a) => a.questionId);
  const questions = await prisma.quizQuestion.findMany({
    where: { id: { in: questionIds } },
    include: { answers: true },
  });
  const qMap = new Map(questions.map((q) => [q.id, q]));

  return {
    attemptId: attempt.id,
    examTitle: attempt.practiceExam.title,
    score: attempt.score,
    passed: attempt.passed,
    timeSpent: attempt.timeSpent,
    attemptedAt: attempt.attemptedAt.toISOString(),
    passingScore: attempt.practiceExam.passingScore,
    results: attempt.answers.map((a) => {
      const q = qMap.get(a.questionId);
      const correct = q?.answers.find((ans) => ans.isCorrect);
      const selected = q?.answers.find((ans) => ans.id === a.selectedAnswerId);
      return {
        questionId: a.questionId,
        question: q?.question,
        isCorrect: a.isCorrect,
        selectedAnswerText: selected?.answerText,
        correctAnswerText: correct?.answerText,
        explanation: q?.explanation,
      };
    }),
  };
}
