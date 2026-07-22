import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/auth/tokens";
import { NextRequest, NextResponse } from "next/server";
import { verifyEmailSchema } from "@/lib/validations/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    const parsed = verifyEmailSchema.safeParse({ token: token ?? "" });

    if (!parsed.success) {
      return NextResponse.redirect(
        new URL("/login?error=invalid-verification-token", request.url)
      );
    }

    const hashedToken = hashToken(parsed.data.token);

    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: hashedToken },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL("/login?error=invalid-verification-token", request.url)
      );
    }

    if (user.emailVerified) {
      return NextResponse.redirect(
        new URL("/login?verified=already", request.url)
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    return NextResponse.redirect(new URL("/login?verified=success", request.url));
  } catch (error) {
    console.error("[auth/verify-email]", error);
    return NextResponse.redirect(
      new URL("/login?error=verification-failed", request.url)
    );
  }
}
