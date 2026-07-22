import { NextRequest, NextResponse } from "next/server";
import { createSessionRedirect } from "@/lib/auth/auth-response";
import { DEMO_STUDENT_EMAIL } from "@/lib/auth/demo-student";
import { prisma } from "@/lib/prisma";
import { toSafeUser } from "@/types/auth";

function getRedirectDestination(request: NextRequest) {
  const redirectParam = request.nextUrl.searchParams.get("redirect");
  const defaultRedirect = "/home";

  if (redirectParam?.startsWith("/") && !redirectParam.startsWith("//")) {
    return redirectParam;
  }

  return defaultRedirect;
}

export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: DEMO_STUDENT_EMAIL },
    });

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      if (redirectParam?.startsWith("/") && !redirectParam.startsWith("//")) {
        loginUrl.searchParams.set("redirect", redirectParam);
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
