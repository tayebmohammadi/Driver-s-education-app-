import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getChapterById } from "@/lib/learning/course-service";

type Params = { params: Promise<{ chapterId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { chapterId } = await params;
    const chapter = await getChapterById(chapterId);

    if (!chapter) {
      return jsonError("Chapter not found", 404);
    }

    return jsonSuccess({ chapter });
  } catch (err) {
    console.error("[api/chapters/[chapterId]]", err);
    return jsonError("Internal server error", 500);
  }
}
