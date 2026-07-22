import { prisma } from "@/lib/prisma";
import { toSafeUser, type SafeUser } from "@/types/auth";
import { getSessionFromCookies } from "./session";

export async function getAuthenticatedUser(): Promise<SafeUser | null> {
  const session = await getSessionFromCookies();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) return null;

  return toSafeUser(user);
}
