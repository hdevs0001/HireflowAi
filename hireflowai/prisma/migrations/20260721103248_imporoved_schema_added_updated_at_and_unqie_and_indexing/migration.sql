/*
  Warnings:

  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - The `interviewTime` column on the `Interview` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[companyId,email]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId,phone]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CompanyName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Candidate_email_key";

-- DropIndex
DROP INDEX "Candidate_phone_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "name",
ADD COLUMN     "CompanyName" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "interviewTime",
ADD COLUMN     "interviewTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Widget" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Candidate_companyId_idx" ON "Candidate"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_companyId_email_key" ON "Candidate"("companyId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_companyId_phone_key" ON "Candidate"("companyId", "phone");

-- CreateIndex
CREATE INDEX "Interview_companyId_idx" ON "Interview"("companyId");

-- CreateIndex
CREATE INDEX "Interview_candidateId_idx" ON "Interview"("candidateId");

-- CreateIndex
CREATE INDEX "Widget_companyId_idx" ON "Widget"("companyId");
