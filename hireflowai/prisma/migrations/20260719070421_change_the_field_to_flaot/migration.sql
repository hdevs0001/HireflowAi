/*
  Warnings:

  - The `aiScore` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "aiScore",
ADD COLUMN     "aiScore" DOUBLE PRECISION;
