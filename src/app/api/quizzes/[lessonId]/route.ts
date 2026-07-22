import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import {
  getQuizForLesson,
  submitQuizAttempt,
} from "@/lib/learning/quiz-service";

type Params = { params: Promise<{ lessonId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { lessonId } = await params;
    const quiz = await getQuizForLesson(lessonId, session!.userId);
    if (!quiz) return jsonError("Quiz not found", 404);
    return jsonSuccess({ quiz });
  } catch (err) {
    console.error("[api/quizzes/lessonId]", err);
    return jsonError("Internal server error", 500);
  }
}

export async function POST(request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { lessonId } = await params;
    const body = (await request.json()) as {
      answers?: { questionId: string; selectedAnswerId: string }[];
    };

    if (!body.answers?.length) {
      return jsonError("answers array is required", 400);
    }

    const result = await submitQuizAttempt(
      session!.userId,
      lessonId,
      body.answers
    );
    return jsonSuccess({ result });
  } catch (err) {
    console.error("[api/quizzes/submit]", err);
    return jsonError(
      err instanceof Error ? err.message : "Internal server error",
      500
    );
  }
}
