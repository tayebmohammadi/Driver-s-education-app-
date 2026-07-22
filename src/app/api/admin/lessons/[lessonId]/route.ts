import { requireAdmin } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { LessonStatus } from "@prisma/client";

type Params = { params: Promise<{ lessonId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      contentBlocks: { orderBy: { orderNumber: "asc" } },
      questions: {
        orderBy: { orderNumber: "asc" },
        include: { answers: { orderBy: { orderNumber: "asc" } } },
      },
    },
  });

  if (!lesson) return jsonError("Lesson not found", 404);
  return jsonSuccess({ lesson });
}

export async function PATCH(request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { lessonId } = await params;
  const body = (await request.json()) as {
    title?: string;
    description?: string;
    estimatedDuration?: number;
    status?: LessonStatus;
  };

  const lesson = await prisma.lesson.update({
    where: { id: lessonId },
    data: body,
  });

  return jsonSuccess({ lesson });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { lessonId } = await params;
  await prisma.lesson.delete({ where: { id: lessonId } });
  return jsonSuccess({ message: "Lesson deleted" });
}
