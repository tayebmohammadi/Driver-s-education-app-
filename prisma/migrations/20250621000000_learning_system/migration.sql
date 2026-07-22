-- AlterTable: courses — add slug, is_published; widen region column
ALTER TABLE "courses" ADD COLUMN "slug" VARCHAR(120);
ALTER TABLE "courses" ADD COLUMN "is_published" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "courses" ALTER COLUMN "state" TYPE VARCHAR(10);

-- Backfill slug for existing rows
UPDATE "courses" SET "slug" = LOWER(REPLACE("title", ' ', '-')) || '-' || SUBSTRING("id"::text, 1, 8) WHERE "slug" IS NULL;
ALTER TABLE "courses" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");
CREATE INDEX "courses_is_published_idx" ON "courses"("is_published");
DROP INDEX IF EXISTS "courses_state_title_key";

-- CreateTable: course_progress
CREATE TABLE "course_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "completion_percentage" INTEGER NOT NULL DEFAULT 0,
    "completed_at" TIMESTAMPTZ(3),
    "last_accessed_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "course_progress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "course_progress_user_id_course_id_key" ON "course_progress"("user_id", "course_id");
CREATE INDEX "course_progress_user_id_idx" ON "course_progress"("user_id");
CREATE INDEX "course_progress_course_id_idx" ON "course_progress"("course_id");

ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
