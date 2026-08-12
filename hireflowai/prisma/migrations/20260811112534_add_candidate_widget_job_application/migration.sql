/*
  Warnings:

  - You are about to drop the column `candidateId` on the `AIEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `candidateStatus` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `resumePublicUrl` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `Candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[applicationId]` on the table `AIEvaluation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleSub]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationId` to the `AIEvaluation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AIEvaluation" DROP CONSTRAINT "AIEvaluation_candidateId_fkey";

-- DropIndex
DROP INDEX "AIEvaluation_candidateId_key";

-- AlterTable
ALTER TABLE "AIEvaluation" DROP COLUMN "candidateId",
ADD COLUMN     "applicationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "candidateStatus",
DROP COLUMN "resumePublicUrl",
DROP COLUMN "resumeUrl",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "googleSub" TEXT,
ADD COLUMN     "image" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "applicationId" TEXT;

-- CreateTable
CREATE TABLE "CandidateAccount" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,

    CONSTRAINT "CandidateAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateVerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "widgetId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "resumePublicUrl" TEXT,
    "candidateStatus" "CandidateStatusEnum" NOT NULL DEFAULT 'UNEVALUATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateAccount_provider_providerAccountId_key" ON "CandidateAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateSession_sessionToken_key" ON "CandidateSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateVerificationToken_token_key" ON "CandidateVerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateVerificationToken_identifier_token_key" ON "CandidateVerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "Application_companyId_idx" ON "Application"("companyId");

-- CreateIndex
CREATE INDEX "Application_candidateId_idx" ON "Application"("candidateId");

-- CreateIndex
CREATE INDEX "Application_widgetId_idx" ON "Application"("widgetId");

-- CreateIndex
CREATE INDEX "Application_jobId_idx" ON "Application"("jobId");

-- CreateIndex
CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "AIEvaluation_applicationId_key" ON "AIEvaluation"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_googleSub_key" ON "Candidate"("googleSub");

-- AddForeignKey
ALTER TABLE "CandidateAccount" ADD CONSTRAINT "CandidateAccount_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSession" ADD CONSTRAINT "CandidateSession_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIEvaluation" ADD CONSTRAINT "AIEvaluation_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
