import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import {
  generateSecureToken,
  hashToken,
} from "@/lib/auth/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { createAuthResponse } from "@/lib/auth/auth-response";
import { checkRateLimit, getClientIp } from "@/lib/auth/rate-limit";
import {
  handleValidationError,
  jsonError,
} from "@/lib/api-response";
import { registerSchema } from "@/lib/validations/auth";
import { toSafeUser } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`register:${ip}`);

    if (!rateLimit.allowed) {
      return jsonError(
        `Too many sign-up attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
        429
      );
    }

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return handleValidationError(parsed.error);
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      password,
    } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return jsonError("An account with this email already exists", 409);
    }

    const passwordHash = await hashPassword(password);
    const rawVerificationToken = generateSecureToken();
    const emailVerificationToken = hashToken(rawVerificationToken);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        city,
        state,
        passwordHash,
        emailVerificationToken,
      },
    });

    await sendVerificationEmail(email, rawVerificationToken);

    return createAuthResponse(
      toSafeUser(user),
      "Account created! Check your email to verify your address, then start learning."
    );
  } catch (error) {
    console.error("[auth/register]", error);
    return jsonError("Internal server error", 500);
  }
}
