import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getHomeHubData } from "@/lib/learning/home-hub-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const hub = await getHomeHubData(session!.userId);
    return jsonSuccess({ hub });
  } catch (err) {
    console.error("[api/home]", err);
    return jsonError("Internal server error", 500);
  }
}
