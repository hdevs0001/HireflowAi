-- CreateEnum
CREATE TYPE "InterviewRound" AS ENUM ('PHONE_SCREEN', 'TECHNICAL', 'HR_ROUND', 'FINAL', 'OTHER');

-- CreateEnum
CREATE TYPE "InterviewOutcome" AS ENUM ('PASS', 'FAIL', 'PENDING');

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "feedbackScore" INTEGER,
ADD COLUMN     "interviewerName" TEXT,
ADD COLUMN     "outcome" "InterviewOutcome",
ADD COLUMN     "round" "InterviewRound" NOT NULL DEFAULT 'OTHER';

-- CreateIndex
CREATE INDEX "Interview_applicationId_idx" ON "Interview"("applicationId");

-- CreateIndex
CREATE INDEX "Interview_interviewTime_idx" ON "Interview"("interviewTime");
