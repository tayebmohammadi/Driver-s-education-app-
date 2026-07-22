import type { ContentBlockType, QuestionType } from "@prisma/client";

export interface ContentBlockSeed {
  type: ContentBlockType;
  content: Record<string, unknown>;
  orderNumber: number;
}

export interface QuizAnswerSeed {
  answerText: string;
  isCorrect: boolean;
  orderNumber: number;
}

export interface QuizQuestionSeed {
  question: string;
  explanation: string;
  category: string;
  questionType: QuestionType;
  orderNumber: number;
  answers: QuizAnswerSeed[];
}

export interface LessonSeed {
  title: string;
  description: string;
  estimatedDuration: number;
  orderNumber: number;
  blocks: ContentBlockSeed[];
  questions: QuizQuestionSeed[];
}

export interface ChapterSeed {
  title: string;
  description: string;
  orderNumber: number;
  lessons: LessonSeed[];
}

export interface UnitSeed {
  title: string;
  description: string;
  orderNumber: number;
  chapters: ChapterSeed[];
}

export interface CourseSeed {
  slug: string;
  title: string;
  description: string;
  regionCode: string;
  units: UnitSeed[];
}
