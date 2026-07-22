import { SignJWT, jwtVerify } from "jose";
import type { JwtPayload } from "@/types/auth";

const COOKIE_NAME = "session";
const TOKEN_EXPIRY = "30d";
const TOKEN_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export { COOKIE_NAME, TOKEN_EXPIRY_MS };

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
    emailVerified: payload.emailVerified,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const userId = payload.userId;
    const role = payload.role;
    const emailVerified = payload.emailVerified;

    if (
      typeof userId !== "string" ||
      (role !== "STUDENT" && role !== "ADMIN") ||
      typeof emailVerified !== "boolean"
    ) {
      return null;
    }

    return { userId, role, emailVerified };
  } catch {
    return null;
  }
}

export function getSessionCookieOptions(maxAge = TOKEN_EXPIRY_MS) {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAge / 1000,
  };
}
