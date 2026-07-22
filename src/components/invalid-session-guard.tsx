import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth/get-authenticated-user";
import { getSessionFromCookies } from "@/lib/auth/session";

export async function InvalidSessionGuard() {
  const session = await getSessionFromCookies();
  if (!session) return null;

  const user = await getAuthenticatedUser();
  if (user) return null;

  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "/home";
  redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
}
