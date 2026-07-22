import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/require-auth";
import { prisma } from "@/lib/prisma";
import { handleValidationError, jsonError, jsonSuccess } from "@/lib/api-response";

const driveSetupSchema = z.object({
  address: z.string().trim().min(3).max(500),
  instructorId: z.string().trim().min(1).max(100),
});

export async function GET() {
  try {
    const { session, error } = await requireAuth();
    if (error) return error;

    const setup = await prisma.studentDriveSetup.findUnique({
      where: { userId: session!.userId },
    });

    if (!setup) {
      return jsonSuccess({ setup: null });
    }

    return jsonSuccess({
      setup: {
        address: setup.address,
        instructorId: setup.instructorId,
      },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("[drive/setup GET]", error);
    return jsonError("Internal server error", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { session, error } = await requireAuth();
    if (error) return error;

    const body = await request.json();
    const parsed = driveSetupSchema.safeParse(body);

    if (!parsed.success) {
      return handleValidationError(parsed.error);
    }

    const setup = await prisma.studentDriveSetup.upsert({
      where: { userId: session!.userId },
      create: {
        userId: session!.userId,
        address: parsed.data.address,
        instructorId: parsed.data.instructorId,
      },
      update: {
        address: parsed.data.address,
        instructorId: parsed.data.instructorId,
      },
    });

    return jsonSuccess({
      setup: {
        address: setup.address,
        instructorId: setup.instructorId,
      },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("[drive/setup PUT]", error);
    return jsonError("Internal server error", 500);
  }
}
