import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getCombinedProgress } from "@/lib/learning/combined-progress-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const data = await getCombinedProgress(session!.userId);
    return jsonSuccess(data);
  } catch (err) {
    console.error("[api/progress/detailed]", err);
    return jsonError("Internal server error", 500);
  }
}
