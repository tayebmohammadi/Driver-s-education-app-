import { NextRequest, NextResponse } from "next/server";
import { isDemoAutoLoginEnabled } from "@/lib/auth/demo-mode";
import { getSessionFromCookies } from "@/lib/auth/session";
import { getAuthenticatedUser } from "@/lib/auth/get-authenticated-user";

function loginRedirect(request: NextRequest, redirectParam?: string | null) {
  const loginUrl = new URL("/login", request.url);
  if (redirectParam?.startsWith("/") && !redirectParam.startsWith("//")) {
    loginUrl.searchParams.set("redirect", redirectParam);
  }
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: NextRequest) {
  const redirectParam = request.nextUrl.searchParams.get("redirect");
  const session = await getSessionFromCookies();

  if (!session) {
    if (isDemoAutoLoginEnabled()) {
      const autoLoginUrl = new URL("/api/auth/auto-login", request.url);
      if (redirectParam?.startsWith("/") && !redirectParam.startsWith("//")) {
        autoLoginUrl.searchParams.set("redirect", redirectParam);
      }
      return NextResponse.redirect(autoLoginUrl);
    }

    return loginRedirect(request, redirectParam);
  }

  const user = await getAuthenticatedUser();

  if (!user) {
    const resetUrl = new URL("/api/auth/reset-session", request.url);
    if (redirectParam?.startsWith("/") && !redirectParam.startsWith("//")) {
      resetUrl.searchParams.set("redirect", redirectParam);
    }
    return NextResponse.redirect(resetUrl);
  }

  const defaultRedirect = user.role === "ADMIN" ? "/admin" : "/home";
  const destination =
    redirectParam?.startsWith("/") && !redirectParam.startsWith("//")
      ? redirectParam
      : defaultRedirect;

  return NextResponse.redirect(new URL(destination, request.url));
}
