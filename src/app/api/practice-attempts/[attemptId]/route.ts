import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getPracticeAttemptReview } from "@/lib/learning/practice-exam-service";

type Params = { params: Promise<{ attemptId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { attemptId } = await params;
    const review = await getPracticeAttemptReview(session!.userId, attemptId);
    if (!review) return jsonError("Attempt not found", 404);
    return jsonSuccess({ review });
  } catch (err) {
    console.error("[api/practice-attempts]", err);
    return jsonError("Internal server error", 500);
  }
}
