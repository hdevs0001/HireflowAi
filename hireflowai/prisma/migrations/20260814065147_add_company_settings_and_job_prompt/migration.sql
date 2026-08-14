-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "aiDefaultPrompt" TEXT,
ADD COLUMN     "applicationCooldownDays" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "recommendedThreshold" INTEGER NOT NULL DEFAULT 75,
ADD COLUMN     "rejectionThreshold" INTEGER NOT NULL DEFAULT 40;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "evaluationPrompt" TEXT;
