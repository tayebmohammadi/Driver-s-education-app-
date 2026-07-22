import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import {
  getPracticeExam,
  startPracticeExamSession,
  submitPracticeExam,
} from "@/lib/learning/practice-exam-service";

type Params = { params: Promise<{ examId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { examId } = await params;
    const exam = await getPracticeExam(examId);
    if (!exam) return jsonError("Exam not found", 404);
    return jsonSuccess({ exam });
  } catch (err) {
    console.error("[api/practice-exams/examId]", err);
    return jsonError("Internal server error", 500);
  }
}

export async function POST(request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { examId } = await params;
    const body = (await request.json()) as {
      action?: string;
      questionCount?: number;
      timeSpent?: number;
      answers?: { questionId: string; selectedAnswerId: string }[];
    };

    if (body.action === "start") {
      const sessionData = await startPracticeExamSession(
        examId,
        body.questionCount
      );
      return jsonSuccess({ session: sessionData });
    }

    if (body.action === "submit") {
      if (!body.answers?.length) {
        return jsonError("answers required for submit", 400);
      }
      const result = await submitPracticeExam(
        session!.userId,
        examId,
        body.timeSpent ?? 0,
        body.answers
      );
      return jsonSuccess({ result });
    }

    return jsonError("Invalid action. Use start or submit.", 400);
  } catch (err) {
    console.error("[api/practice-exams/action]", err);
    return jsonError(
      err instanceof Error ? err.message : "Internal server error",
      500
    );
  }
}
