import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getCourseById } from "@/lib/learning/course-service";

type Params = { params: Promise<{ courseId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { courseId } = await params;
    const course = await getCourseById(courseId);

    if (!course || !course.isPublished) {
      return jsonError("Course not found", 404);
    }

    return jsonSuccess({ course });
  } catch (err) {
    console.error("[api/courses/[courseId]]", err);
    return jsonError("Internal server error", 500);
  }
}
