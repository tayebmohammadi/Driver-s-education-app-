import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getLicenseJourney } from "@/lib/learning/combined-progress-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const journey = await getLicenseJourney(session!.userId);
    return jsonSuccess({ journey });
  } catch (err) {
    console.error("[api/journey]", err);
    return jsonError("Internal server error", 500);
  }
}
