import { cookies } from "next/headers";
import type { JwtPayload } from "@/types/auth";
import { COOKIE_NAME, verifyToken } from "./jwt";

export async function getSessionFromCookies(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
