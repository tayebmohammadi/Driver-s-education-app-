import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import {
  getRandomPracticeQuestions,
  getTopicLessons,
} from "@/lib/learning/weak-areas-service";
import { STUDY_TOPICS } from "@/lib/learning/topics-config";

export async function GET(request: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const topicSlug = searchParams.get("topic") ?? undefined;
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);

    const questions = await getRandomPracticeQuestions(session!.userId, {
      topicSlug,
      limit,
    });

    return jsonSuccess({ questions, topics: STUDY_TOPICS });
  } catch (err) {
    console.error("[api/qna]", err);
    return jsonError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const body = (await request.json()) as { slug?: string };
    if (!body.slug) return jsonError("slug required", 400);

    const data = await getTopicLessons(body.slug);
    if (!data) return jsonError("Topic not found", 404);

    return jsonSuccess(data);
  } catch (err) {
    console.error("[api/qna POST]", err);
    return jsonError("Internal server error", 500);
  }
}
