import { prisma } from "@/lib/prisma";
import type {
  ContentBlockDTO,
  CourseSummaryDTO,
  LessonDetailDTO,
  LessonSummaryDTO,
} from "@/types/learning";
import { LessonStatus } from "@prisma/client";

const publishedLessonFilter = { status: LessonStatus.PUBLISHED };

export async function listPublishedCourses(): Promise<CourseSummaryDTO[]> {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { title: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      regionCode: true,
      thumbnail: true,
      isPublished: true,
    },
  });

  return courses;
}

export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      regionCode: true,
      thumbnail: true,
      isPublished: true,
    },
  });
}

export async function getCourseById(courseId: string) {
  return prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      regionCode: true,
      thumbnail: true,
      isPublished: true,
    },
  });
}

export async function listUnitsByCourse(courseId: string) {
  return prisma.unit.findMany({
    where: { courseId },
    orderBy: { orderNumber: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      orderNumber: true,
    },
  });
}

export async function getUnitById(unitId: string) {
  return prisma.unit.findUnique({
    where: { id: unitId },
    select: {
      id: true,
      courseId: true,
      title: true,
      description: true,
      orderNumber: true,
    },
  });
}

export async function listChaptersByUnit(unitId: string) {
  return prisma.chapter.findMany({
    where: { unitId },
    orderBy: { orderNumber: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      orderNumber: true,
    },
  });
}

export async function getChapterById(chapterId: string) {
  return prisma.chapter.findUnique({
    where: { id: chapterId },
    select: {
      id: true,
      unitId: true,
      title: true,
      description: true,
      orderNumber: true,
    },
  });
}

export async function listLessonsByChapter(
  chapterId: string,
  includeDrafts = false
): Promise<LessonSummaryDTO[]> {
  const lessons = await prisma.lesson.findMany({
    where: {
      chapterId,
      ...(includeDrafts ? {} : publishedLessonFilter),
    },
    orderBy: { orderNumber: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      orderNumber: true,
      estimatedDuration: true,
      status: true,
    },
  });

  return lessons;
}

export async function getLessonById(
  lessonId: string,
  includeDrafts = false
): Promise<LessonDetailDTO | null> {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      ...(includeDrafts ? {} : publishedLessonFilter),
    },
    include: {
      contentBlocks: { orderBy: { orderNumber: "asc" } },
      questions: {
        orderBy: { orderNumber: "asc" },
        include: {
          answers: { orderBy: { orderNumber: "asc" } },
        },
      },
      chapter: {
        include: {
          unit: {
            include: { course: true },
          },
        },
      },
      quiz: true,
    },
  });

  if (!lesson) return null;

  const contentBlocks: ContentBlockDTO[] = lesson.contentBlocks.map((block) => ({
    id: block.id,
    type: block.type,
    content: block.content as unknown as ContentBlockDTO["content"],
    orderNumber: block.orderNumber,
  }));

  const quiz = lesson.quiz
    ? {
        id: lesson.quiz.id,
        lessonId: lesson.id,
        questions: lesson.questions.map((q) => ({
          id: q.id,
          question: q.question,
          explanation: q.explanation,
          questionType: q.questionType,
          orderNumber: q.orderNumber,
          answers: q.answers.map((a) => ({
            id: a.id,
            answerText: a.answerText,
            orderNumber: a.orderNumber,
          })),
        })),
      }
    : undefined;

  return {
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    orderNumber: lesson.orderNumber,
    estimatedDuration: lesson.estimatedDuration,
    status: lesson.status,
    chapterId: lesson.chapter.id,
    chapterTitle: lesson.chapter.title,
    unitId: lesson.chapter.unit.id,
    unitTitle: lesson.chapter.unit.title,
    courseId: lesson.chapter.unit.course.id,
    courseSlug: lesson.chapter.unit.course.slug,
    courseTitle: lesson.chapter.unit.course.title,
    contentBlocks,
    quiz,
  };
}

export async function getFirstLessonIdForCourse(
  courseId: string
): Promise<string | null> {
  const lesson = await prisma.lesson.findFirst({
    where: {
      status: LessonStatus.PUBLISHED,
      chapter: { unit: { courseId } },
    },
    orderBy: [
      { chapter: { unit: { orderNumber: "asc" } } },
      { chapter: { orderNumber: "asc" } },
      { orderNumber: "asc" },
    ],
    select: { id: true },
  });

  return lesson?.id ?? null;
}

export async function countPublishedLessonsInCourse(
  courseId: string
): Promise<number> {
  return prisma.lesson.count({
    where: {
      status: LessonStatus.PUBLISHED,
      chapter: { unit: { courseId } },
    },
  });
}
