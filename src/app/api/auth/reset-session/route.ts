import { NextRequest, NextResponse } from "next/server";
import { isDemoAutoLoginEnabled } from "@/lib/auth/demo-mode";
import { COOKIE_NAME, getSessionCookieOptions } from "@/lib/auth/jwt";

function loginRedirect(request: NextRequest, redirectParam?: string | null) {
  const loginUrl = new URL("/login", request.url);
  if (redirectParam?.startsWith("/") && !redirectParam.startsWith("//")) {
    loginUrl.searchParams.set("redirect", redirectParam);
  }
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: NextRequest) {
  const redirectParam = request.nextUrl.searchParams.get("redirect");

  const response = isDemoAutoLoginEnabled()
    ? (() => {
        const autoLoginUrl = new URL("/api/auth/auto-login", request.url);
        if (redirectParam?.startsWith("/") && !redirectParam.startsWith("//")) {
          autoLoginUrl.searchParams.set("redirect", redirectParam);
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
