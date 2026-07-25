import { NextRequest, NextResponse } from "next/server";
import { createSessionRedirect } from "@/lib/auth/auth-response";
import { isDemoAutoLoginEnabled } from "@/lib/auth/demo-mode";
import { getConfiguredDemoStudentEmail } from "@/lib/auth/demo-student";
import { prisma } from "@/lib/prisma";
import { toSafeUser } from "@/types/auth";
import { getSafeStudentRedirect } from "@/lib/auth/safe-redirect";

function getRedirectDestination(request: NextRequest) {
  const redirectParam = request.nextUrl.searchParams.get("redirect");
  return getSafeStudentRedirect(redirectParam);
}

export async function GET(request: NextRequest) {
  if (!isDemoAutoLoginEnabled()) {
    return new NextResponse(null, { status: 404 });
  }

  const demoStudentEmail = getConfiguredDemoStudentEmail();
  if (!demoStudentEmail) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: demoStudentEmail },
    });

    if (!user || user.role !== "STUDENT") {
      return new NextResponse(null, { status: 404 });
    }

    const destination = new URL(getRedirectDestination(request), request.url);
    return createSessionRedirect(toSafeUser(user), destination);
  } catch (error) {
    console.error("[auth/auto-login]", error);
    return new NextResponse(null, { status: 404 });
  }
}
