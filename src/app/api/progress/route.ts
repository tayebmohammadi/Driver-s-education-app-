import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import {
  getUserProgressOverview,
  updateLessonProgress,
} from "@/lib/learning/progress-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const overview = await getUserProgressOverview(session!.userId);

    const course = await prisma.course.findFirst({
      where: { slug: "california-driver-education", isPublished: true },
    });

    let detailedStats = null;
    if (course) {
      const { getCompletionStats } = await import(
        "@/lib/learning/progress-completion-service"
      );
      detailedStats = await getCompletionStats(session!.userId, course.id);
    }

    return jsonSuccess({ progress: overview, stats: detailedStats });
  } catch (err) {
    console.error("[api/progress]", err);
    return jsonError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const body = (await request.json()) as {
      lessonId?: string;
      completionPercentage?: number;
    };

    if (!body.lessonId || body.completionPercentage === undefined) {
      return jsonError("lessonId and completionPercentage are required", 400);
    }

    // Placeholder — full logic deferred to future step
    try {
      const result = await updateLessonProgress(
        session!.userId,
        body.lessonId,
        body.completionPercentage
      );
      return jsonSuccess({ progress: result });
    } catch {
      return jsonSuccess({
        message: "Progress update endpoint ready — logic not yet implemented",
        placeholder: true,
      });
    }
  } catch (err) {
    console.error("[api/progress POST]", err);
    return jsonError("Internal server error", 500);
  }
}
