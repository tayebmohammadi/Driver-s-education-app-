import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { logStudyTime } from "@/lib/learning/study-time-service";
import type { StudyActivityType } from "@prisma/client";

export async function POST(request: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const body = (await request.json()) as {
      seconds?: number;
      activityType?: StudyActivityType;
      resourceId?: string;
    };

    if (!body.seconds || !body.activityType) {
      return jsonError("seconds and activityType required", 400);
    }

    await logStudyTime(
      session!.userId,
      body.seconds,
      body.activityType,
      body.resourceId
    );

    return jsonSuccess({ logged: true });
  } catch (err) {
    console.error("[api/study-time]", err);
    return jsonError("Internal server error", 500);
  }
}
