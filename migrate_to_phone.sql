-- Migration Script: Change email to phone
-- Run this SQL script directly in your database (pgAdmin, DBeaver, or psql)

-- Step 1: Add phone column (nullable first)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- Step 2: If you have existing users with email, copy email to phone
-- Uncomment and modify this if you want to preserve existing data:
-- UPDATE "User" SET "phone" = "email" WHERE "phone" IS NULL AND "email" IS NOT NULL;

-- Step 3: Add unique constraint on phone
-- First, ensure all users have a phone value (or delete users without phone)
-- For now, we'll make it nullable but unique where it exists
CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone") WHERE "phone" IS NOT NULL;

-- Step 4: Rename emailVerified to phoneVerified (if column exists)
-- Check if column exists first, then rename
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'User' 
        AND column_name = 'emailVerified'
    ) THEN
        ALTER TABLE "User" RENAME COLUMN "emailVerified" TO "phoneVerified";
    END IF;
END $$;

-- Step 5: Remove old email column and its index
DROP INDEX IF EXISTS "User_email_idx";

-- Drop email column if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'User' 
        AND column_name = 'email'
    ) THEN
        ALTER TABLE "User" DROP COLUMN "email";
    END IF;
END $$;

-- Step 6: Add new phone index
CREATE INDEX IF NOT EXISTS "User_phone_idx" ON "User"("phone");

-- Step 7: Make phone NOT NULL (only if you've ensured all users have phone)
-- ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;
