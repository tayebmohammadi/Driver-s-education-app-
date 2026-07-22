import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getUserAchievements } from "@/lib/learning/achievement-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const achievements = await getUserAchievements(session!.userId);
    return jsonSuccess({ achievements });
  } catch (err) {
    console.error("[api/achievements]", err);
    return jsonError("Internal server error", 500);
  }
}
