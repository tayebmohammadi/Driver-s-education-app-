import { getSessionFromCookies } from "@/lib/auth/session";
import { jsonError } from "@/lib/api-response";

export async function requireAuth() {
  const session = await getSessionFromCookies();
  if (!session) {
    return { session: null, error: jsonError("Unauthorized", 401) };
  }
  return { session, error: null };
}

export async function requireAdmin() {
  const result = await requireAuth();
  if (result.error) return result;
  if (result.session!.role !== "ADMIN") {
    return { session: null, error: jsonError("Forbidden", 403) };
  }
  return result;
}
