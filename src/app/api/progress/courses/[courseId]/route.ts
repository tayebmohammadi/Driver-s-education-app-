import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getCourseProgress } from "@/lib/learning/progress-service";
import { getCourseById } from "@/lib/learning/course-service";

type Params = { params: Promise<{ courseId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { courseId } = await params;
    const course = await getCourseById(courseId);

    if (!course) {
      return jsonError("Course not found", 404);
    }

    const progress = await getCourseProgress(session!.userId, courseId);
    return jsonSuccess({ progress });
  } catch (err) {
    console.error("[api/progress/courses/[courseId]]", err);
    return jsonError("Internal server error", 500);
  }
}
