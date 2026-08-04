/*
  Warnings:

  - The values [ACCEPTED,PROCESSING] on the enum `CandidateStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CandidateStatusEnum_new" AS ENUM ('REJECTED', 'RECOMMENDED', 'INTERVIEWING', 'OFFERED', 'ON_TRIAL', 'PLACED', 'WITHDRAW', 'UNEVALUATED');
ALTER TABLE "public"."Candidate" ALTER COLUMN "candidateStatus" DROP DEFAULT;
ALTER TABLE "Candidate" ALTER COLUMN "candidateStatus" TYPE "CandidateStatusEnum_new" USING ("candidateStatus"::text::"CandidateStatusEnum_new");
ALTER TYPE "CandidateStatusEnum" RENAME TO "CandidateStatusEnum_old";
ALTER TYPE "CandidateStatusEnum_new" RENAME TO "CandidateStatusEnum";
DROP TYPE "public"."CandidateStatusEnum_old";
ALTER TABLE "Candidate" ALTER COLUMN "candidateStatus" SET DEFAULT 'UNEVALUATED';
COMMIT;

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "candidateStatus" SET DEFAULT 'UNEVALUATED';
