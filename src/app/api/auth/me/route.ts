import { cookies } from "next/headers";
import { getAuthenticatedUser } from "@/lib/auth/get-authenticated-user";
import { getSessionFromCookies } from "@/lib/auth/session";
import { COOKIE_NAME } from "@/lib/auth/jwt";
import { jsonError, jsonSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const session = await getSessionFromCookies();

    if (!session) {
      return jsonError("Unauthorized", 401);
    }

    const user = await getAuthenticatedUser();

    if (!user) {
      const cookieStore = await cookies();
      cookieStore.delete(COOKIE_NAME);
      return jsonError("Unauthorized", 401);
    }

    return jsonSuccess({ user });
  } catch (error) {
    console.error("[auth/me]", error);
    return jsonError("Internal server error", 500);
  }
}
