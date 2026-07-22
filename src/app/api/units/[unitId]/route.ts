import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getUnitById } from "@/lib/learning/course-service";

type Params = { params: Promise<{ unitId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { unitId } = await params;
    const unit = await getUnitById(unitId);

    if (!unit) {
      return jsonError("Unit not found", 404);
    }

    return jsonSuccess({ unit });
  } catch (err) {
    console.error("[api/units/[unitId]]", err);
    return jsonError("Internal server error", 500);
  }
}
