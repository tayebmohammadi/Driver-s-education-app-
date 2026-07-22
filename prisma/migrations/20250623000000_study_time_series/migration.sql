-- Study time tracking and series progress for 30-hour certificate MVP

CREATE TYPE "StudyActivityType" AS ENUM ('LESSON', 'EXAM', 'QUIZ', 'PRACTICE');

ALTER TABLE "practice_exams" ADD COLUMN "series_number" INTEGER;

CREATE INDEX "practice_exams_series_number_idx" ON "practice_exams"("series_number");

CREATE TABLE "study_time_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "activity_type" "StudyActivityType" NOT NULL,
    "resource_id" UUID,
    "seconds" INTEGER NOT NULL,
    "logged_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_time_logs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "series_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "series_number" INTEGER NOT NULL,
    "lessons_done" BOOLEAN NOT NULL DEFAULT false,
    "exam_passed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "series_progress_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "study_time_logs_user_id_idx" ON "study_time_logs"("user_id");
CREATE INDEX "study_time_logs_user_id_logged_at_idx" ON "study_time_logs"("user_id", "logged_at");
CREATE INDEX "series_progress_user_id_idx" ON "series_progress"("user_id");
CREATE UNIQUE INDEX "series_progress_user_id_series_number_key" ON "series_progress"("user_id", "series_number");

ALTER TABLE "study_time_logs" ADD CONSTRAINT "study_time_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "series_progress" ADD CONSTRAINT "series_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
