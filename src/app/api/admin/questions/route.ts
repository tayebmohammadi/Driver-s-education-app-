import { requireAdmin } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { QuestionType } from "@prisma/client";

export async function GET(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get("lessonId");
  const search = searchParams.get("q");

  const questions = await prisma.quizQuestion.findMany({
    where: {
      ...(lessonId ? { lessonId } : {}),
      ...(search
        ? { question: { contains: search, mode: "insensitive" } }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      answers: true,
      lesson: { select: { title: true } },
    },
  });

  return jsonSuccess({ questions });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = (await request.json()) as {
      lessonId?: string;
      question?: string;
      explanation?: string;
      category?: string;
      questionType?: QuestionType;
      imageUrl?: string;
      answers?: { answerText: string; isCorrect: boolean }[];
      practiceExamId?: string;
    };

    if (!body.lessonId || !body.question || !body.answers?.length) {
      return jsonError("lessonId, question, and answers required", 400);
    }

    const maxOrder = await prisma.quizQuestion.aggregate({
      where: { lessonId: body.lessonId },
      _max: { orderNumber: true },
    });

    const question = await prisma.quizQuestion.create({
      data: {
        lessonId: body.lessonId,
        question: body.question,
        explanation: body.explanation,
        category: body.category ?? "general",
        questionType: body.questionType ?? QuestionType.MULTIPLE_CHOICE,
        imageUrl: body.imageUrl,
        orderNumber: (maxOrder._max.orderNumber ?? 0) + 1,
        answers: {
          create: body.answers.map((a, i) => ({
            answerText: a.answerText,
            isCorrect: a.isCorrect,
            orderNumber: i + 1,
          })),
        },
      },
      include: { answers: true },
    });

    if (body.practiceExamId) {
      const maxPe = await prisma.practiceExamQuestion.aggregate({
        where: { practiceExamId: body.practiceExamId },
        _max: { orderNumber: true },
      });
      await prisma.practiceExamQuestion.create({
        data: {
          practiceExamId: body.practiceExamId,
          questionId: question.id,
          orderNumber: (maxPe._max.orderNumber ?? 0) + 1,
        },
      });
    }

    return jsonSuccess({ question }, 201);
  } catch (err) {
    console.error("[admin/questions POST]", err);
    return jsonError("Failed to create question", 500);
  }
}
