import {
  LessonStatus,
  Prisma,
  PrismaClient,
} from "@prisma/client";
import type { CourseSeed } from "./data/types";

export async function seedCourse(
  prisma: PrismaClient,
  courseData: CourseSeed
): Promise<void> {
  const course = await prisma.course.create({
    data: {
      slug: courseData.slug,
      title: courseData.title,
      description: courseData.description,
      regionCode: courseData.regionCode,
      isPublished: true,
    },
  });

  for (const unitData of courseData.units) {
    const unit = await prisma.unit.create({
      data: {
        courseId: course.id,
        title: unitData.title,
        description: unitData.description,
        orderNumber: unitData.orderNumber,
      },
    });

    for (const chapterData of unitData.chapters) {
      const chapter = await prisma.chapter.create({
        data: {
          unitId: unit.id,
          title: chapterData.title,
          description: chapterData.description,
          orderNumber: chapterData.orderNumber,
        },
      });

      for (const lessonData of chapterData.lessons) {
        const lesson = await prisma.lesson.create({
          data: {
            chapterId: chapter.id,
            title: lessonData.title,
            description: lessonData.description,
            estimatedDuration: lessonData.estimatedDuration,
            orderNumber: lessonData.orderNumber,
            status: LessonStatus.PUBLISHED,
          },
        });

        if (lessonData.blocks.length > 0) {
          await prisma.lessonContentBlock.createMany({
            data: lessonData.blocks.map((block) => ({
              lessonId: lesson.id,
              type: block.type,
              content: block.content as Prisma.InputJsonValue,
              orderNumber: block.orderNumber,
            })),
          });
        }

        if (lessonData.questions.length > 0) {
          await prisma.quiz.create({ data: { lessonId: lesson.id } });

          for (const questionData of lessonData.questions) {
            const question = await prisma.quizQuestion.create({
              data: {
                lessonId: lesson.id,
                question: questionData.question,
                explanation: questionData.explanation,
                category: questionData.category,
                questionType: questionData.questionType,
                orderNumber: questionData.orderNumber,
              },
            });

            if (questionData.answers.length > 0) {
              await prisma.quizAnswer.createMany({
                data: questionData.answers.map((answer) => ({
                  questionId: question.id,
                  answerText: answer.answerText,
                  isCorrect: answer.isCorrect,
                  orderNumber: answer.orderNumber,
                })),
              });
            }
          }
        }
      }
    }
  }
}

export function countCurriculumStats(courseData: CourseSeed) {
  let units = 0;
  let chapters = 0;
  let lessons = 0;
  let blocks = 0;
  let questions = 0;

  for (const unit of courseData.units) {
    units += 1;
    for (const chapter of unit.chapters) {
      chapters += 1;
      for (const lesson of chapter.lessons) {
        lessons += 1;
        blocks += lesson.blocks.length;
        questions += lesson.questions.length;
      }
    }
  }

  return { units, chapters, lessons, blocks, questions };
}
