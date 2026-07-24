import { NextRequest, NextResponse } from "next/server";
import { createSessionRedirect } from "@/lib/auth/auth-response";
import { DEMO_STUDENT_EMAIL } from "@/lib/auth/demo-student";
import { prisma } from "@/lib/prisma";
import { toSafeUser } from "@/types/auth";
import { getSafeStudentRedirect } from "@/lib/auth/safe-redirect";

function getRedirectDestination(request: NextRequest) {
  const redirectParam = request.nextUrl.searchParams.get("redirect");
  return getSafeStudentRedirect(redirectParam);
}

export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: DEMO_STUDENT_EMAIL },
    });

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      const destination = getSafeStudentRedirect(redirectParam, "");
      if (destination) {
        loginUrl.searchParams.set("redirect", destination);
      }
      return NextResponse.redirect(loginUrl);
    }

    const destination = new URL(getRedirectDestination(request), request.url);
    return createSessionRedirect(toSafeUser(user), destination);
  } catch (error) {
    console.error("[auth/auto-login]", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
