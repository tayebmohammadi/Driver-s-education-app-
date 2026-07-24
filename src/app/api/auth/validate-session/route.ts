import { NextRequest, NextResponse } from "next/server";
import { isDemoAutoLoginEnabled } from "@/lib/auth/demo-mode";
import { getSessionFromCookies } from "@/lib/auth/session";
import { getAuthenticatedUser } from "@/lib/auth/get-authenticated-user";
import {
  getSafeRoleRedirect,
  getSafeStudentRedirect,
} from "@/lib/auth/safe-redirect";

function loginRedirect(request: NextRequest, redirectParam?: string | null) {
  const loginUrl = new URL("/login", request.url);
  const destination = getSafeStudentRedirect(redirectParam, "");
  if (destination) {
    loginUrl.searchParams.set("redirect", destination);
  }
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: NextRequest) {
  const redirectParam = request.nextUrl.searchParams.get("redirect");
  const session = await getSessionFromCookies();

  if (!session) {
    if (isDemoAutoLoginEnabled()) {
      const autoLoginUrl = new URL("/api/auth/auto-login", request.url);
      const destination = getSafeStudentRedirect(redirectParam, "");
      if (destination) {
        autoLoginUrl.searchParams.set("redirect", destination);
      }
      return NextResponse.redirect(autoLoginUrl);
    }

    return loginRedirect(request, redirectParam);
  }

  const user = await getAuthenticatedUser();

  if (!user) {
    const resetUrl = new URL("/api/auth/reset-session", request.url);
    const destination = getSafeStudentRedirect(redirectParam, "");
    if (destination) {
      resetUrl.searchParams.set("redirect", destination);
    }
    return NextResponse.redirect(resetUrl);
  }

  const destination = getSafeRoleRedirect(redirectParam, user.role);

  return NextResponse.redirect(new URL(destination, request.url));
}
