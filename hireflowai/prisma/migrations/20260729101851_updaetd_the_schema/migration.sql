/*
  Warnings:

  - Added the required column `resumePublicId` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "resumePublicId" TEXT NOT NULL,
ADD COLUMN     "resumeText" TEXT;
