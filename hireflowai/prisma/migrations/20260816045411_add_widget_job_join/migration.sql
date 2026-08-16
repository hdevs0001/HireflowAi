-- CreateTable
CREATE TABLE "WidgetJob" (
    "id" TEXT NOT NULL,
    "widgetId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WidgetJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WidgetJob_jobId_idx" ON "WidgetJob"("jobId");

-- CreateIndex
CREATE INDEX "WidgetJob_widgetId_idx" ON "WidgetJob"("widgetId");

-- CreateIndex
CREATE UNIQUE INDEX "WidgetJob_widgetId_jobId_key" ON "WidgetJob"("widgetId", "jobId");

-- AddForeignKey
ALTER TABLE "WidgetJob" ADD CONSTRAINT "WidgetJob_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetJob" ADD CONSTRAINT "WidgetJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
