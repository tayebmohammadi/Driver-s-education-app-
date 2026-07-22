import { requireAdmin } from "@/lib/auth/require-auth";
import { jsonSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { QuestionType } from "@prisma/client";

type Params = { params: Promise<{ questionId: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { questionId } = await params;
  const body = (await request.json()) as {
    question?: string;
    explanation?: string;
    category?: string;
    questionType?: QuestionType;
    imageUrl?: string;
  };

  const question = await prisma.quizQuestion.update({
    where: { id: questionId },
    data: body,
  });

  return jsonSuccess({ question });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { questionId } = await params;
  await prisma.quizQuestion.delete({ where: { id: questionId } });
  return jsonSuccess({ message: "Question deleted" });
}
