import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { listPracticeExams } from "@/lib/learning/practice-exam-service";

export async function GET(request: Request) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId") ?? undefined;
    const exams = await listPracticeExams(courseId);
    return jsonSuccess({ exams });
  } catch (err) {
    console.error("[api/practice-exams]", err);
    return jsonError("Internal server error", 500);
  }
}
