-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "nextActionHint" TEXT,
ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Application_companyId_candidateStatus_idx" ON "Application"("companyId", "candidateStatus");

-- CreateIndex
CREATE INDEX "Application_widgetId_candidateStatus_idx" ON "Application"("widgetId", "candidateStatus");

-- CreateIndex
CREATE INDEX "Application_jobId_candidateStatus_idx" ON "Application"("jobId", "candidateStatus");

-- CreateIndex
CREATE INDEX "Application_candidateStatus_statusUpdatedAt_idx" ON "Application"("candidateStatus", "statusUpdatedAt");
