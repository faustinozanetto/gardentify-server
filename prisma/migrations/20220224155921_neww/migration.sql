/*
  Warnings:

  - Made the column `appearedOn` on table `DiseasesOnPlants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DiseasesOnPlants" ALTER COLUMN "appearedOn" SET NOT NULL;
