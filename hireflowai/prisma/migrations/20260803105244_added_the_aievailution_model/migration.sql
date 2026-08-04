/*
  Warnings:

  - You are about to drop the column `aiScore` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `resumeText` on the `Candidate` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AIRecommendation" AS ENUM ('RECOMMEND', 'REVIEW', 'REJECT');

-- CreateEnum
CREATE TYPE "HrControls" AS ENUM ('ENABLE', 'DISABLE');

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "aiScore",
DROP COLUMN "resumeText";

-- CreateTable
CREATE TABLE "AIEvaluation" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "aiScore" INTEGER NOT NULL,
    "skillsMatch" INTEGER NOT NULL,
    "experienceMatch" INTEGER NOT NULL,
    "educationMatch" INTEGER NOT NULL,
    "projectMatch" INTEGER NOT NULL,
    "jobRelevance" INTEGER NOT NULL,
    "matchedSkills" TEXT[],
    "missingSkills" TEXT[],
    "reason" TEXT NOT NULL,
    "recommendation" "AIRecommendation" NOT NULL,

    CONSTRAINT "AIEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIEvaluation_candidateId_key" ON "AIEvaluation"("candidateId");

-- AddForeignKey
ALTER TABLE "AIEvaluation" ADD CONSTRAINT "AIEvaluation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
