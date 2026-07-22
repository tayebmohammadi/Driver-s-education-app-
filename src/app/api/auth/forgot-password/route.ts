import { prisma } from "@/lib/prisma";
import {
  generateSecureToken,
  getTokenExpiry,
  hashToken,
} from "@/lib/auth/tokens";
import { sendPasswordResetEmail } from "@/lib/email";
import {
  handleValidationError,
  jsonSuccess,
} from "@/lib/api-response";
import { forgotPasswordSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return handleValidationError(parsed.error);
    }

    const { email } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (user) {
      const rawToken = generateSecureToken();
      const passwordResetToken = hashToken(rawToken);
      const passwordResetExpiry = getTokenExpiry(1);

      await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken, passwordResetExpiry },
      });

      await sendPasswordResetEmail(email, rawToken);
    }

    return jsonSuccess({
      message:
        "If an account exists with that email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("[auth/forgot-password]", error);
    return jsonSuccess({
      message:
        "If an account exists with that email, a password reset link has been sent.",
    });
  }
}
