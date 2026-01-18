-- Migration: Change email to phone in User table
-- Run this migration manually if Prisma migrate fails

-- Step 1: Add phone column (nullable first)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- Step 2: Copy email data to phone (if you have existing data you want to preserve)
-- UPDATE "User" SET "phone" = "email" WHERE "phone" IS NULL;

-- Step 3: Make phone unique and required
-- First, ensure all users have a phone (or delete users without phone)
-- DELETE FROM "User" WHERE "phone" IS NULL OR "phone" = '';

-- Add unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone");

-- Step 4: Rename emailVerified to phoneVerified
ALTER TABLE "User" RENAME COLUMN "emailVerified" TO "phoneVerified";

-- Step 5: Remove email column (uncomment when ready)
-- ALTER TABLE "User" DROP COLUMN IF EXISTS "email";

-- Step 6: Update index
DROP INDEX IF EXISTS "User_email_idx";
CREATE INDEX IF NOT EXISTS "User_phone_idx" ON "User"("phone");
