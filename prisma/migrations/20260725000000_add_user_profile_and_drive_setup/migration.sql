-- Add optional profile fields without backfilling legacy users.
ALTER TABLE "users"
ADD COLUMN "city" VARCHAR(100),
ADD COLUMN "phone" VARCHAR(20),
ADD COLUMN "state" VARCHAR(2);

-- Apply the California default only to future inserts; legacy rows stay unknown.
ALTER TABLE "users"
ALTER COLUMN "state" SET DEFAULT 'CA';

-- Store one driving setup per student account.
CREATE TABLE "student_drive_setups" (
    "user_id" UUID NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "instructor_id" VARCHAR(100) NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "student_drive_setups_pkey" PRIMARY KEY ("user_id")
);

ALTER TABLE "student_drive_setups"
ADD CONSTRAINT "student_drive_setups_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
