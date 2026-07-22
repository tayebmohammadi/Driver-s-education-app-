import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getWeakAreas } from "@/lib/learning/weak-areas-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const data = await getWeakAreas(session!.userId);
    return jsonSuccess(data);
  } catch (err) {
    console.error("[api/weak-areas]", err);
    return jsonError("Internal server error", 500);
  }
}
