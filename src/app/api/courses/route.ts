import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { listPublishedCourses } from "@/lib/learning/course-service";

export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const courses = await listPublishedCourses();
    return jsonSuccess({ courses });
  } catch (err) {
    console.error("[api/courses]", err);
    return jsonError("Internal server error", 500);
  }
}
