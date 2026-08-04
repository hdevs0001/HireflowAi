/*
  Warnings:

  - You are about to drop the column `Permission` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `AIEvaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HrStatus" AS ENUM ('ENABLE', 'DISABLE');

-- AlterTable
ALTER TABLE "AIEvaluation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "Permission",
ADD COLUMN     "hrStatus" "HrStatus" NOT NULL DEFAULT 'ENABLE';

-- DropEnum
DROP TYPE "HrControls";

-- CreateIndex
CREATE INDEX "users_companyId_role_hrStatus_idx" ON "users"("companyId", "role", "hrStatus");
