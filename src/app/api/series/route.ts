import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getSeriesList } from "@/lib/learning/series-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const series = await getSeriesList(session!.userId);
    return jsonSuccess({ series });
  } catch (err) {
    console.error("[api/series]", err);
    return jsonError("Internal server error", 500);
  }
}
