-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ADMIN');
CREATE TYPE "ContentBlockType" AS ENUM ('HEADING', 'PARAGRAPH', 'IMAGE', 'VIDEO', 'CALLOUT', 'CHECKLIST', 'QUOTE');
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'IMAGE_QUESTION');
CREATE TYPE "QuestionDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');
CREATE TYPE "LessonStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "profile_photo" VARCHAR(2048),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "thumbnail" VARCHAR(2048),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "order_number" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "order_number" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" UUID NOT NULL,
    "chapter_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "estimated_duration" INTEGER NOT NULL,
    "order_number" INTEGER NOT NULL,
    "status" "LessonStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_content_blocks" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "type" "ContentBlockType" NOT NULL,
    "content" JSONB NOT NULL,
    "order_number" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lesson_content_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "explanation" TEXT,
    "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'MEDIUM',
    "category" VARCHAR(100) NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "order_number" INTEGER NOT NULL DEFAULT 0,
    "image_url" VARCHAR(2048),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "answer_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "order_number" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_exams" (
    "id" UUID NOT NULL,
    "course_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "passing_score" INTEGER NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "practice_exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_exam_questions" (
    "id" UUID NOT NULL,
    "practice_exam_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "order_number" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_exam_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "completion_percentage" INTEGER NOT NULL DEFAULT 0,
    "completed_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "student_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "quiz_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "attempted_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_test_attempts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "practice_exam_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "pass_fail" BOOLEAN NOT NULL,
    "time_spent" INTEGER NOT NULL,
    "attempted_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_test_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "icon" VARCHAR(2048) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "achievement_id" UUID NOT NULL,
    "earned_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "read_status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_role_idx" ON "users"("role");
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

CREATE UNIQUE INDEX "courses_state_title_key" ON "courses"("state", "title");
CREATE INDEX "courses_state_idx" ON "courses"("state");

CREATE UNIQUE INDEX "units_course_id_order_number_key" ON "units"("course_id", "order_number");
CREATE INDEX "units_course_id_idx" ON "units"("course_id");

CREATE UNIQUE INDEX "chapters_unit_id_order_number_key" ON "chapters"("unit_id", "order_number");
CREATE INDEX "chapters_unit_id_idx" ON "chapters"("unit_id");

CREATE UNIQUE INDEX "lessons_chapter_id_order_number_key" ON "lessons"("chapter_id", "order_number");
CREATE INDEX "lessons_chapter_id_idx" ON "lessons"("chapter_id");
CREATE INDEX "lessons_status_idx" ON "lessons"("status");

CREATE UNIQUE INDEX "lesson_content_blocks_lesson_id_order_number_key" ON "lesson_content_blocks"("lesson_id", "order_number");
CREATE INDEX "lesson_content_blocks_lesson_id_idx" ON "lesson_content_blocks"("lesson_id");

CREATE UNIQUE INDEX "quizzes_lesson_id_key" ON "quizzes"("lesson_id");

CREATE INDEX "quiz_questions_lesson_id_idx" ON "quiz_questions"("lesson_id");
CREATE INDEX "quiz_questions_category_idx" ON "quiz_questions"("category");
CREATE INDEX "quiz_questions_difficulty_idx" ON "quiz_questions"("difficulty");

CREATE INDEX "quiz_answers_question_id_idx" ON "quiz_answers"("question_id");

CREATE INDEX "practice_exams_course_id_idx" ON "practice_exams"("course_id");

CREATE UNIQUE INDEX "practice_exam_questions_practice_exam_id_question_id_key" ON "practice_exam_questions"("practice_exam_id", "question_id");
CREATE UNIQUE INDEX "practice_exam_questions_practice_exam_id_order_number_key" ON "practice_exam_questions"("practice_exam_id", "order_number");
CREATE INDEX "practice_exam_questions_question_id_idx" ON "practice_exam_questions"("question_id");

CREATE UNIQUE INDEX "student_progress_user_id_lesson_id_key" ON "student_progress"("user_id", "lesson_id");
CREATE INDEX "student_progress_user_id_idx" ON "student_progress"("user_id");
CREATE INDEX "student_progress_lesson_id_idx" ON "student_progress"("lesson_id");
CREATE INDEX "student_progress_user_id_completed_at_idx" ON "student_progress"("user_id", "completed_at");

CREATE UNIQUE INDEX "quiz_attempts_user_id_quiz_id_attempt_number_key" ON "quiz_attempts"("user_id", "quiz_id", "attempt_number");
CREATE INDEX "quiz_attempts_user_id_idx" ON "quiz_attempts"("user_id");
CREATE INDEX "quiz_attempts_quiz_id_idx" ON "quiz_attempts"("quiz_id");
CREATE INDEX "quiz_attempts_user_id_attempted_at_idx" ON "quiz_attempts"("user_id", "attempted_at");

CREATE INDEX "practice_test_attempts_user_id_idx" ON "practice_test_attempts"("user_id");
CREATE INDEX "practice_test_attempts_practice_exam_id_idx" ON "practice_test_attempts"("practice_exam_id");
CREATE INDEX "practice_test_attempts_user_id_attempted_at_idx" ON "practice_test_attempts"("user_id", "attempted_at");

CREATE UNIQUE INDEX "achievements_title_key" ON "achievements"("title");

CREATE UNIQUE INDEX "user_achievements_user_id_achievement_id_key" ON "user_achievements"("user_id", "achievement_id");
CREATE INDEX "user_achievements_user_id_idx" ON "user_achievements"("user_id");
CREATE INDEX "user_achievements_achievement_id_idx" ON "user_achievements"("achievement_id");

CREATE INDEX "notifications_user_id_read_status_idx" ON "notifications"("user_id", "read_status");
CREATE INDEX "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "lesson_content_blocks" ADD CONSTRAINT "lesson_content_blocks_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_exams" ADD CONSTRAINT "practice_exams_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "practice_exam_questions" ADD CONSTRAINT "practice_exam_questions_practice_exam_id_fkey" FOREIGN KEY ("practice_exam_id") REFERENCES "practice_exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_exam_questions" ADD CONSTRAINT "practice_exam_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_test_attempts" ADD CONSTRAINT "practice_test_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_test_attempts" ADD CONSTRAINT "practice_test_attempts_practice_exam_id_fkey" FOREIGN KEY ("practice_exam_id") REFERENCES "practice_exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
