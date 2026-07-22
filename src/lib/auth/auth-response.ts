import { NextResponse } from "next/server";
import type { SafeUser } from "@/types/auth";
import {
  COOKIE_NAME,
  getSessionCookieOptions,
  signToken,
} from "@/lib/auth/jwt";

async function attachSessionCookie(response: NextResponse, user: SafeUser) {
  const token = await signToken({
    userId: user.id,
    role: user.role,
    emailVerified: user.emailVerified,
  });
  const cookieOptions = getSessionCookieOptions();

  response.cookies.set({
    ...cookieOptions,
    name: COOKIE_NAME,
    value: token,
  });

  return response;
}

export async function createAuthResponse(
  user: SafeUser,
  message: string,
  status = 200
) {
  const response = NextResponse.json({ message, user }, { status });
  return attachSessionCookie(response, user);
}

export async function createSessionRedirect(
  user: SafeUser,
  destination: string | URL
) {
  const response = NextResponse.redirect(destination);
  return attachSessionCookie(response, user);
}

export function createLogoutResponse() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
