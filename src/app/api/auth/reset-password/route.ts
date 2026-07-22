import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { hashToken, isTokenExpired } from "@/lib/auth/tokens";
import {
  handleValidationError,
  jsonError,
  jsonSuccess,
} from "@/lib/api-response";
import { resetPasswordSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return handleValidationError(parsed.error);
    }

    const { token, password } = parsed.data;
    const hashedToken = hashToken(token);

    const user = await prisma.user.findFirst({
      where: { passwordResetToken: hashedToken },
    });

    if (!user || isTokenExpired(user.passwordResetExpiry)) {
      return jsonError("Invalid or expired reset token", 400);
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    return jsonSuccess({ message: "Password reset successfully" });
  } catch (error) {
    console.error("[auth/reset-password]", error);
    return jsonError("Internal server error", 500);
  }
}
