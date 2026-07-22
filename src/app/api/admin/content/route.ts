import { requireAdmin } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { LessonStatus } from "@prisma/client";

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = (await request.json()) as {
      type?: string;
      courseId?: string;
      unitId?: string;
      chapterId?: string;
      title?: string;
      description?: string;
      orderNumber?: number;
      estimatedDuration?: number;
      status?: string;
    };

    if (body.type === "unit" && body.courseId && body.title) {
      const maxOrder = await prisma.unit.aggregate({
        where: { courseId: body.courseId },
        _max: { orderNumber: true },
      });
      const unit = await prisma.unit.create({
        data: {
          courseId: body.courseId,
          title: body.title,
          description: body.description ?? "",
          orderNumber: body.orderNumber ?? (maxOrder._max.orderNumber ?? 0) + 1,
        },
      });
      return jsonSuccess({ unit }, 201);
    }

    if (body.type === "chapter" && body.unitId && body.title) {
      const maxOrder = await prisma.chapter.aggregate({
        where: { unitId: body.unitId },
        _max: { orderNumber: true },
      });
      const chapter = await prisma.chapter.create({
        data: {
          unitId: body.unitId,
          title: body.title,
          description: body.description ?? "",
          orderNumber: body.orderNumber ?? (maxOrder._max.orderNumber ?? 0) + 1,
        },
      });
      return jsonSuccess({ chapter }, 201);
    }

    if (body.type === "lesson" && body.chapterId && body.title) {
      const maxOrder = await prisma.lesson.aggregate({
        where: { chapterId: body.chapterId },
        _max: { orderNumber: true },
      });
      const lesson = await prisma.lesson.create({
        data: {
          chapterId: body.chapterId,
          title: body.title,
          description: body.description ?? "",
          estimatedDuration: body.estimatedDuration ?? 10,
          orderNumber: body.orderNumber ?? (maxOrder._max.orderNumber ?? 0) + 1,
          status: (body.status as LessonStatus) ?? LessonStatus.DRAFT,
        },
      });
      await prisma.quiz.create({ data: { lessonId: lesson.id } });
      return jsonSuccess({ lesson }, 201);
    }

    return jsonError("Invalid create payload", 400);
  } catch (err) {
    console.error("[admin/content POST]", err);
    return jsonError("Failed to create content", 500);
  }
}
