import { requireAdmin } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ courseId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        orderBy: { orderNumber: "asc" },
        include: {
          chapters: {
            orderBy: { orderNumber: "asc" },
            include: {
              lessons: { orderBy: { orderNumber: "asc" } },
            },
          },
        },
      },
    },
  });

  if (!course) return jsonError("Course not found", 404);
  return jsonSuccess({ course });
}

export async function PATCH(request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { courseId } = await params;
  const body = (await request.json()) as Record<string, unknown>;

  const course = await prisma.course.update({
    where: { id: courseId },
    data: {
      ...(body.title ? { title: String(body.title) } : {}),
      ...(body.description ? { description: String(body.description) } : {}),
      ...(body.isPublished !== undefined
        ? { isPublished: Boolean(body.isPublished) }
        : {}),
    },
  });

  return jsonSuccess({ course });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { courseId } = await params;
  await prisma.course.delete({ where: { id: courseId } });
  return jsonSuccess({ message: "Course deleted" });
}
