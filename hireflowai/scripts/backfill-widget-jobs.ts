// scripts/backfill-widget-jobs.ts
import { prisma } from "@/prisma";

async function backfillWidgetJobs() {
  const distinctPairs = await prisma.application.findMany({
    select: { widgetId: true, jobId: true },
    distinct: ["widgetId", "jobId"],
  });

  console.log(
    `Found ${distinctPairs.length} distinct widget-job pairs to backfill`,
  );

  let created = 0;
  let skipped = 0;

  for (const pair of distinctPairs) {
    try {
      await prisma.widgetJob.create({
        data: { widgetId: pair.widgetId, jobId: pair.jobId },
      });
      created++;
    } catch (err) {
      // Already exists (e.g. you manually linked it via the Jobs form already) - skip
      skipped++;
    }
  }

  console.log(
    `Backfill complete: ${created} created, ${skipped} already existed`,
  );
}

backfillWidgetJobs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
