import type { ContentBlockType, LessonStatus, QuestionType } from "@prisma/client";

// ---------------------------------------------------------------------------
// Content block payloads (stored as JSON in lesson_content_blocks.content)
// ---------------------------------------------------------------------------

export interface HeadingBlockContent {
  text: string;
  level?: 1 | 2 | 3 | 4;
}

export interface ParagraphBlockContent {
  text: string;
}

export interface CalloutBlockContent {
  text: string;
  variant?: "info" | "warning" | "tip" | "note";
  title?: string;
}

export interface ImageBlockContent {
  url: string;
  alt: string;
  caption?: string;
}

export interface VideoBlockContent {
  url: string;
  caption?: string;
  provider?: "youtube" | "vimeo" | "direct";
}

export interface ChecklistBlockContent {
  items: string[];
  title?: string;
}

export interface QuoteBlockContent {
  text: string;
  attribution?: string;
}

export type ContentBlockPayload =
  | HeadingBlockContent
  | ParagraphBlockContent
  | CalloutBlockContent
  | ImageBlockContent
  | VideoBlockContent
  | ChecklistBlockContent
  | QuoteBlockContent;

export interface ContentBlockDTO {
  id: string;
  type: ContentBlockType;
  content: ContentBlockPayload;
  orderNumber: number;
}

// ---------------------------------------------------------------------------
// Course hierarchy DTOs
// ---------------------------------------------------------------------------

export interface LessonSummaryDTO {
  id: string;
  title: string;
  description: string;
  orderNumber: number;
  estimatedDuration: number;
  status: LessonStatus;
  isCompleted?: boolean;
  completionPercentage?: number;
}

export interface ChapterSummaryDTO {
  id: string;
  title: string;
  description: string;
  orderNumber: number;
  lessons: LessonSummaryDTO[];
}

export interface UnitSummaryDTO {
  id: string;
  title: string;
  description: string;
  orderNumber: number;
  chapters: ChapterSummaryDTO[];
}

export interface CourseSummaryDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  regionCode: string;
  thumbnail: string | null;
  isPublished: boolean;
}

export interface CourseNavigationDTO extends CourseSummaryDTO {
  units: UnitSummaryDTO[];
  progress?: CourseProgressDTO;
}

export interface LessonDetailDTO {
  id: string;
  title: string;
  description: string;
  orderNumber: number;
  estimatedDuration: number;
  status: LessonStatus;
  chapterId: string;
  chapterTitle: string;
  unitId: string;
  unitTitle: string;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  contentBlocks: ContentBlockDTO[];
  quiz?: QuizPlaceholderDTO;
  progress?: LessonProgressDTO;
}

// ---------------------------------------------------------------------------
// Progress DTOs
// ---------------------------------------------------------------------------

export interface LessonProgressDTO {
  lessonId: string;
  completionPercentage: number;
  completedAt: string | null;
}

export interface CourseProgressDTO {
  courseId: string;
  completionPercentage: number;
  completedLessons: number;
  totalLessons: number;
  completedAt: string | null;
  lastAccessedAt: string | null;
}

export interface UserProgressOverviewDTO {
  courses: CourseProgressDTO[];
  // Placeholder for future aggregation
  totalLessonsCompleted: number;
}

// ---------------------------------------------------------------------------
// Quiz placeholder DTOs
// ---------------------------------------------------------------------------

export interface QuizAnswerPlaceholderDTO {
  id: string;
  answerText: string;
  orderNumber: number;
}

export interface QuizQuestionPlaceholderDTO {
  id: string;
  question: string;
  explanation: string | null;
  questionType: QuestionType;
  orderNumber: number;
  answers: QuizAnswerPlaceholderDTO[];
}

export interface QuizPlaceholderDTO {
  id: string;
  lessonId: string;
  questions: QuizQuestionPlaceholderDTO[];
}
