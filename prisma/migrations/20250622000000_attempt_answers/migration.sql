-- CreateTable
CREATE TABLE "quiz_attempt_answers" (
    "id" UUID NOT NULL,
    "attempt_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "selected_answer_id" UUID,
    "is_correct" BOOLEAN NOT NULL,

    CONSTRAINT "quiz_attempt_answers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "practice_test_attempt_answers" (
    "id" UUID NOT NULL,
    "attempt_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "selected_answer_id" UUID,
    "is_correct" BOOLEAN NOT NULL,

    CONSTRAINT "practice_test_attempt_answers_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "quiz_attempt_answers_attempt_id_question_id_key" ON "quiz_attempt_answers"("attempt_id", "question_id");
CREATE INDEX "quiz_attempt_answers_attempt_id_idx" ON "quiz_attempt_answers"("attempt_id");

CREATE UNIQUE INDEX "practice_test_attempt_answers_attempt_id_question_id_key" ON "practice_test_attempt_answers"("attempt_id", "question_id");
CREATE INDEX "practice_test_attempt_answers_attempt_id_idx" ON "practice_test_attempt_answers"("attempt_id");

ALTER TABLE "quiz_attempt_answers" ADD CONSTRAINT "quiz_attempt_answers_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_test_attempt_answers" ADD CONSTRAINT "practice_test_attempt_answers_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "practice_test_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
