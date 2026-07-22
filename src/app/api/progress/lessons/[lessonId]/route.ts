import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getLessonProgress, updateLessonProgress } from "@/lib/learning/progress-service";
import { getLessonById } from "@/lib/learning/course-service";

type Params = { params: Promise<{ lessonId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { lessonId } = await params;
    const lesson = await getLessonById(lessonId);
    if (!lesson) return jsonError("Lesson not found", 404);

    const progress = await getLessonProgress(session!.userId, lessonId);
    return jsonSuccess({ progress });
  } catch (err) {
    console.error("[api/progress/lessons/[lessonId]]", err);
    return jsonError("Internal server error", 500);
  }
}

export async function POST(request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { lessonId } = await params;
    const body = (await request.json()) as {
      completionPercentage?: number;
      complete?: boolean;
    };

    const percentage = body.complete
      ? 100
      : (body.completionPercentage ?? 100);

    const progress = await updateLessonProgress(
      session!.userId,
      lessonId,
      percentage
    );
    return jsonSuccess({ progress });
  } catch (err) {
    console.error("[api/progress/lessons POST]", err);
    return jsonError(
      err instanceof Error ? err.message : "Internal server error",
      500
    );
  }
}
