import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import {
  getSeriesDetail,
  getSeriesExamId,
} from "@/lib/learning/series-service";

type Params = { params: Promise<{ num: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { num } = await params;
    const seriesNumber = parseInt(num, 10);
    if (isNaN(seriesNumber) || seriesNumber < 1 || seriesNumber > 30) {
      return jsonError("Invalid series number", 400);
    }

    const series = await getSeriesDetail(session!.userId, seriesNumber);
    if (!series) return jsonError("Series not found", 404);

    const examId = await getSeriesExamId(seriesNumber);
    return jsonSuccess({ series, examId });
  } catch (err) {
    console.error("[api/series/[num]]", err);
    return jsonError("Internal server error", 500);
  }
}
