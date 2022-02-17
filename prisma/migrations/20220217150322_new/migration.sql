/*
  Warnings:

  - You are about to drop the column `plantUuid` on the `Disease` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_plantUuid_fkey";

-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "plantUuid";

-- CreateTable
CREATE TABLE "DiseasesOnPlants" (
    "plantUuid" TEXT NOT NULL,
    "diseaseUuid" TEXT NOT NULL,

    CONSTRAINT "DiseasesOnPlants_pkey" PRIMARY KEY ("plantUuid","diseaseUuid")
);

-- AddForeignKey
ALTER TABLE "DiseasesOnPlants" ADD CONSTRAINT "DiseasesOnPlants_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "Plant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseasesOnPlants" ADD CONSTRAINT "DiseasesOnPlants_diseaseUuid_fkey" FOREIGN KEY ("diseaseUuid") REFERENCES "Disease"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
