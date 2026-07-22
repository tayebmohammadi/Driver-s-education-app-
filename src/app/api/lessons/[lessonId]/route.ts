import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getLessonById } from "@/lib/learning/course-service";
import {
  getLessonProgress,
  touchCourseAccess,
} from "@/lib/learning/progress-service";

type Params = { params: Promise<{ lessonId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { lessonId } = await params;
    const lesson = await getLessonById(lessonId);

    if (!lesson) {
      return jsonError("Lesson not found", 404);
    }

    const progress = await getLessonProgress(session!.userId, lessonId);
    await touchCourseAccess(session!.userId, lesson.courseId);

    return jsonSuccess({ lesson: { ...lesson, progress } });
  } catch (err) {
    console.error("[api/lessons/[lessonId]]", err);
    return jsonError("Internal server error", 500);
  }
}
