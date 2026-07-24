import { NextRequest, NextResponse } from "next/server";
import { isDemoAutoLoginEnabled } from "@/lib/auth/demo-mode";
import { COOKIE_NAME, getSessionCookieOptions } from "@/lib/auth/jwt";
import { getSafeStudentRedirect } from "@/lib/auth/safe-redirect";

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

  const response = isDemoAutoLoginEnabled()
    ? (() => {
        const autoLoginUrl = new URL("/api/auth/auto-login", request.url);
        const destination = getSafeStudentRedirect(redirectParam, "");
        if (destination) {
          autoLoginUrl.searchParams.set("redirect", destination);
        }
        return NextResponse.redirect(autoLoginUrl);
      })()
    : loginRedirect(request, redirectParam);

  const cookieOptions = getSessionCookieOptions(0);

  response.cookies.set({
    ...cookieOptions,
    name: COOKIE_NAME,
    value: "",
    maxAge: 0,
  });

  return response;
}
