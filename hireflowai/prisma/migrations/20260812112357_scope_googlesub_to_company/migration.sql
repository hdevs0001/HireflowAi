/*
  Warnings:

  - A unique constraint covering the columns `[companyId,googleSub]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Candidate_googleSub_key";

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_companyId_googleSub_key" ON "Candidate"("companyId", "googleSub");
