import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getCourseById } from "@/lib/learning/course-service";
import { getCourseNavigationWithProgress } from "@/lib/learning/progress-service";

type Params = { params: Promise<{ courseId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { courseId } = await params;
    const course = await getCourseById(courseId);

    if (!course || !course.isPublished) {
      return jsonError("Course not found", 404);
    }

    const navigation = await getCourseNavigationWithProgress(
      course,
      session!.userId
    );

    return jsonSuccess({ navigation });
  } catch (err) {
    console.error("[api/courses/[courseId]/navigation]", err);
    return jsonError("Internal server error", 500);
  }
}
