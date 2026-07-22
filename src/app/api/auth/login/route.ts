import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createAuthResponse } from "@/lib/auth/auth-response";
import {
  checkRateLimit,
  getClientIp,
  resetRateLimit,
} from "@/lib/auth/rate-limit";
import {
  handleValidationError,
  jsonError,
} from "@/lib/api-response";
import { loginSchema } from "@/lib/validations/auth";
import { toSafeUser } from "@/types/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return handleValidationError(parsed.error);
    }

    const { email, password } = parsed.data;
    const rateLimitKey = `login:${getClientIp(request)}:${email}`;
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      return jsonError(
        `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
        429
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return jsonError("Invalid email or password", 401);
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return jsonError("Invalid email or password", 401);
    }

    resetRateLimit(rateLimitKey);

    return createAuthResponse(toSafeUser(user), "Logged in successfully");
  } catch (error) {
    console.error("[auth/login]", error);
    return jsonError("Internal server error", 500);
  }
}
