import { requireAdmin } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" },
    include: {
      _count: { select: { units: true, practiceExams: true } },
    },
  });

  return jsonSuccess({ courses });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = (await request.json()) as {
      slug?: string;
      title?: string;
      description?: string;
      regionCode?: string;
      isPublished?: boolean;
    };

    if (!body.slug || !body.title || !body.description || !body.regionCode) {
      return jsonError("slug, title, description, regionCode required", 400);
    }

    const course = await prisma.course.create({
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        regionCode: body.regionCode,
        isPublished: body.isPublished ?? false,
      },
    });

    return jsonSuccess({ course }, 201);
  } catch (err) {
    console.error("[admin/courses POST]", err);
    return jsonError("Failed to create course", 500);
  }
}
