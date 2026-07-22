-- AlterTable
ALTER TABLE "users" ADD COLUMN "email_verified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN "email_verification_token" VARCHAR(255);
ALTER TABLE "users" ADD COLUMN "password_reset_token" VARCHAR(255);
ALTER TABLE "users" ADD COLUMN "password_reset_expiry" TIMESTAMPTZ(3);

-- CreateIndex
CREATE INDEX "users_email_verification_token_idx" ON "users"("email_verification_token");
CREATE INDEX "users_password_reset_token_idx" ON "users"("password_reset_token");
