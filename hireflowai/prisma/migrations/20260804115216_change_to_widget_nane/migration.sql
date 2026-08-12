/*
  Warnings:

  - You are about to drop the column `WidgetName` on the `Widget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "WidgetName",
ADD COLUMN     "widgetName" TEXT;
