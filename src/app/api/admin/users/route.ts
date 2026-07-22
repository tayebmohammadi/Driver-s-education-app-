import { requireAdmin } from "@/lib/auth/require-auth";
import { jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { getCompletionStats } from "@/lib/learning/progress-completion-service";

export async function GET(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const userId = searchParams.get("userId");

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) return jsonSuccess({ user: null });

    const course = await prisma.course.findFirst({
      where: { slug: "california-driver-education" },
    });

    const stats = course
      ? await getCompletionStats(user.id, course.id)
      : null;

    const quizAttempts = await prisma.quizAttempt.count({
      where: { userId: user.id },
    });

    return jsonSuccess({ user, stats, quizAttempts });
  }

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { email: { contains: q, mode: "insensitive" } },
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    },
  });

  return jsonSuccess({ users });
}
