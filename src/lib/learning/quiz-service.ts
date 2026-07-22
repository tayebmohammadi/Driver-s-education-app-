import { prisma } from "@/lib/prisma";
import {
  checkQuizAchievements,
  recalculateCourseProgress,
} from "./progress-completion-service";
import { createNotification } from "./notification-service";
import { logStudyTime } from "./study-time-service";

export async function getQuizForLesson(lessonId: string, userId: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { lessonId },
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          chapter: { select: { unit: { select: { courseId: true } } } },
        },
      },
      attempts: {
        where: { userId },
        orderBy: { attemptNumber: "desc" },
        take: 1,
        select: {
          id: true,
          score: true,
          attemptNumber: true,
          attemptedAt: true,
        },
      },
    },
  });

  if (!quiz) return null;

  const questions = await prisma.quizQuestion.findMany({
    where: { lessonId },
    orderBy: { orderNumber: "asc" },
    include: {
      answers: {
        orderBy: { orderNumber: "asc" },
        select: {
          id: true,
          answerText: true,
          orderNumber: true,
        },
      },
    },
  });

  return {
    quizId: quiz.id,
    lessonId: quiz.lessonId,
    lessonTitle: quiz.lesson.title,
    lastAttempt: quiz.attempts[0] ?? null,
    questions: questions.map((q) => ({
      id: q.id,
      question: q.question,
      questionType: q.questionType,
      imageUrl: q.imageUrl,
      orderNumber: q.orderNumber,
      answers: q.answers,
    })),
  };
}

export async function submitQuizAttempt(
  userId: string,
  lessonId: string,
  submissions: { questionId: string; selectedAnswerId: string }[]
) {
  const quiz = await prisma.quiz.findUnique({
    where: { lessonId },
    include: {
      lesson: {
        include: { chapter: { include: { unit: true } } },
      },
    },
  });

  if (!quiz) throw new Error("Quiz not found");

  const questions = await prisma.quizQuestion.findMany({
    where: { lessonId },
    include: { answers: true },
  });

  if (questions.length === 0) throw new Error("No questions in quiz");

  const questionMap = new Map(questions.map((q) => [q.id, q]));

  let correct = 0;
  const answerRecords: {
    questionId: string;
    selectedAnswerId: string | null;
    isCorrect: boolean;
  }[] = [];

  const results = submissions.map((sub) => {
    const question = questionMap.get(sub.questionId);
    if (!question) {
      return {
        questionId: sub.questionId,
        selectedAnswerId: sub.selectedAnswerId,
        isCorrect: false,
        correctAnswerId: null as string | null,
        explanation: null as string | null,
      };
    }

    const selected = question.answers.find(
      (a) => a.id === sub.selectedAnswerId
    );
    const correctAnswer = question.answers.find((a) => a.isCorrect);
    const isCorrect = selected?.isCorrect ?? false;
    if (isCorrect) correct += 1;

    answerRecords.push({
      questionId: sub.questionId,
      selectedAnswerId: sub.selectedAnswerId,
      isCorrect,
    });

    return {
      questionId: sub.questionId,
      selectedAnswerId: sub.selectedAnswerId,
      isCorrect,
      correctAnswerId: correctAnswer?.id ?? null,
      explanation: question.explanation,
    };
  });

  // Include unanswered questions as incorrect
  for (const q of questions) {
    if (!submissions.find((s) => s.questionId === q.id)) {
      const correctAnswer = q.answers.find((a) => a.isCorrect);
      answerRecords.push({
        questionId: q.id,
        selectedAnswerId: null,
        isCorrect: false,
      });
      results.push({
        questionId: q.id,
        selectedAnswerId: "",
        isCorrect: false,
        correctAnswerId: correctAnswer?.id ?? null,
        explanation: q.explanation,
      });
    }
  }

  const score = Math.round((correct / questions.length) * 100);

  const lastAttempt = await prisma.quizAttempt.findFirst({
    where: { userId, quizId: quiz.id },
    orderBy: { attemptNumber: "desc" },
  });
  const attemptNumber = (lastAttempt?.attemptNumber ?? 0) + 1;

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId,
      quizId: quiz.id,
      score,
      attemptNumber,
      answers: {
        create: answerRecords.map((a) => ({
          questionId: a.questionId,
          selectedAnswerId: a.selectedAnswerId,
          isCorrect: a.isCorrect,
        })),
      },
    },
  });

  const courseId = quiz.lesson.chapter.unit.courseId;

  if (score >= 70) {
    await prisma.studentProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        completionPercentage: 100,
        completedAt: new Date(),
      },
      update: {
        completionPercentage: 100,
        completedAt: new Date(),
      },
    });
    await recalculateCourseProgress(userId, courseId);
    const { syncSeriesLessonProgress } = await import("./series-service");
    await syncSeriesLessonProgress(userId);
  }

  await logStudyTime(userId, 60, "QUIZ", lessonId);

  await checkQuizAchievements(userId);

  await createNotification({
    userId,
    title: "Quiz completed",
    message: `You scored ${score}% on "${quiz.lesson.title}".`,
  });

  return {
    attemptId: attempt.id,
    score,
    attemptNumber,
    passed: score >= 70,
    totalQuestions: questions.length,
    correctCount: correct,
    results,
  };
}

export async function getQuizAttemptReview(userId: string, attemptId: string) {
  const attempt = await prisma.quizAttempt.findFirst({
    where: { id: attemptId, userId },
    include: {
      answers: true,
      quiz: {
        include: {
          lesson: {
            include: {
              questions: { include: { answers: true } },
            },
          },
        },
      },
    },
  });

  if (!attempt) return null;

  return {
    attemptId: attempt.id,
    score: attempt.score,
    attemptNumber: attempt.attemptNumber,
    attemptedAt: attempt.attemptedAt.toISOString(),
    lessonTitle: attempt.quiz.lesson.title,
    results: attempt.answers.map((a) => {
      const question = attempt.quiz.lesson.questions.find(
        (q) => q.id === a.questionId
      );
      const correctAnswer = question?.answers.find((ans) => ans.isCorrect);
      return {
        questionId: a.questionId,
        question: question?.question,
        selectedAnswerId: a.selectedAnswerId,
        correctAnswerId: correctAnswer?.id,
        isCorrect: a.isCorrect,
        explanation: question?.explanation,
      };
    }),
  };
}
