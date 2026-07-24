import type { UserRole } from "@prisma/client";

const INTERNAL_ORIGIN = "http://internal.local";

const STUDENT_DESTINATIONS = [
  "/dashboard",
  "/home",
  "/journey",
  "/series",
  "/topics",
  "/qna",
  "/weak-areas",
  "/progress",
  "/profile",
  "/drive",
  "/learn",
  "/practice",
] as const;

function matchesDestination(pathname: string, destination: string) {
  return pathname === destination || pathname.startsWith(`${destination}/`);
}

export function getSafeStudentRedirect(
  value: string | null | undefined,
  fallback = "/home"
): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return fallback;
  }

  try {
    const parsed = new URL(value, INTERNAL_ORIGIN);
    const isAllowed = STUDENT_DESTINATIONS.some((destination) =>
      matchesDestination(parsed.pathname, destination)
    );

    if (
      parsed.origin !== INTERNAL_ORIGIN ||
      parsed.username ||
      parsed.password ||
      !isAllowed
    ) {
      return fallback;
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export function getSafeRoleRedirect(
  value: string | null | undefined,
  role: UserRole,
  studentFallback = "/home"
): string {
  if (role === "ADMIN") return "/admin";
  return getSafeStudentRedirect(value, studentFallback);
}

