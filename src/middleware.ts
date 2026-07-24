import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isDemoAutoLoginEnabled } from "@/lib/auth/demo-mode";
import { verifyToken, COOKIE_NAME } from "@/lib/auth/jwt";
import { getSafeStudentRedirect } from "@/lib/auth/safe-redirect";

const PROTECTED_ROUTES = [
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
  "/lessons",
  "/quizzes",
  "/learn",
  "/practice",
];
const ADMIN_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function loginRedirect(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyToken(token) : null;

  const isProtected = matchesRoute(pathname, PROTECTED_ROUTES);
  const isAdminRoute = matchesRoute(pathname, ADMIN_ROUTES);
  const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES);

  if ((isProtected || isAdminRoute) && !session) {
    if (isDemoAutoLoginEnabled() && !isAdminRoute) {
      const autoLoginUrl = new URL("/api/auth/auto-login", request.url);
      autoLoginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(autoLoginUrl);
    }

    return loginRedirect(request, pathname);
  }

  if (isAdminRoute && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (isAuthRoute && session) {
    const validateUrl = new URL("/api/auth/validate-session", request.url);
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const destination = getSafeStudentRedirect(redirectParam, "");
    if (destination) {
      validateUrl.searchParams.set("redirect", destination);
    }
    return NextResponse.redirect(validateUrl);
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: [
    "/home/:path*",
    "/journey/:path*",
    "/series/:path*",
    "/topics/:path*",
    "/qna/:path*",
    "/weak-areas/:path*",
    "/progress/:path*",
    "/profile",
    "/profile/:path*",
    "/drive",
    "/drive/:path*",
    "/learn/:path*",
    "/practice/:path*",
    "/dashboard/:path*",
    "/lessons/:path*",
    "/quizzes/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/",
  ],
};
