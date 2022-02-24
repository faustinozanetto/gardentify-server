/*
  Warnings:

  - You are about to drop the column `appearedOn` on the `Disease` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "appearedOn";

-- AlterTable
ALTER TABLE "DiseasesOnPlants" ADD COLUMN     "appearedOn" TIMESTAMP(3);
